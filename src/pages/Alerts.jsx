import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getAlerts } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { getAlertSeverity } from "../utils/alertUtils";

import AlertsFilterBar from "../components/alerts/AlertsFilterBar";
import AlertsSummary from "../components/alerts/AlertsSummary";
import AlertsCharts from "../components/alerts/AlertsCharts";
import AlertsTable from "../components/alerts/AlertsTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20;
const MAX_RESULT_WINDOW = 100000;

const DEFAULT_SUMMARY = {
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
};

export default function Alerts() {
    const [searchParams] = useSearchParams();

    const [alerts, setAlerts] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [level, setLevel] = useState(
        searchParams.get("level") || searchParams.get("severity") || ""
    );

    const [search, setSearch] = useState(searchParams.get("search") || "");

    const [summary, setSummary] = useState(DEFAULT_SUMMARY);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const maxAccessiblePages = Math.floor(MAX_RESULT_WINDOW / PAGE_SIZE);

    const totalPages = Math.min(
        Math.ceil(total / PAGE_SIZE),
        maxAccessiblePages
    );

    const fetchAlerts = async (overrides = {}) => {
        setLoading(true);
        setError("");

        const params = {
            page,
            size: PAGE_SIZE,
            level,
            search,
            ...overrides,
        };

        try {
            const response = await getAlerts(params);

            if (response.data.success) {
                setAlerts(response.data.data || []);
                setTotal(response.data.total || 0);
                setSummary(response.data.summary || DEFAULT_SUMMARY);
            } else {
                setError(response.data.error || "Failed to load alerts");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        const urlLevel =
            searchParams.get("level") || searchParams.get("severity") || "";

        setSearch(urlSearch);
        setLevel(urlLevel);
        setPage(1);

        void fetchAlerts({
            page: 1,
            search: urlSearch,
            level: urlLevel,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    useEffect(() => {
        void fetchAlerts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, level]);

    const applySearch = () => {
        setPage(1);

        void fetchAlerts({
            page: 1,
            search,
            level,
        });
    };

    const resetFilters = () => {
        setLevel("");
        setSearch("");
        setPage(1);

        void fetchAlerts({
            page: 1,
            level: "",
            search: "",
        });
    };

    const levelChartData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            if (!alert.timestamp) return;

            const time = new Date(alert.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            if (!grouped[time]) {
                grouped[time] = {
                    time,
                    low: 0,
                    medium: 0,
                    high: 0,
                };
            }

            const severity = getAlertSeverity(alert.level);

            if (grouped[time][severity] !== undefined) {
                grouped[time][severity] += 1;
            }
        });

        return Object.values(grouped).reverse();
    }, [alerts]);

    const topAgentsData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            const name = alert.agent_name || "Unknown";
            grouped[name] = (grouped[name] || 0) + 1;
        });

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
        }));
    }, [alerts]);

    const mitreData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            if (alert.technique?.length) {
                alert.technique.forEach((technique) => {
                    grouped[technique] = (grouped[technique] || 0) + 1;
                });
            }
        });

        const data = Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
        }));

        return data.length ? data : [{ name: "No MITRE Data", value: 1 }];
    }, [alerts]);

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }, [page, totalPages]);

    if (loading) return <LoadingState message="Loading alerts..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <PageHeader
                title="Security Alerts"
                description="Monitor detected security alerts from Wazuh Indexer."
            />

            <AlertsFilterBar
                search={search}
                setSearch={setSearch}
                level={level}
                setLevel={setLevel}
                setPage={setPage}
                onApply={applySearch}
                onReset={resetFilters}
            />

            <AlertsSummary summary={summary} />

            <AlertsCharts
                levelChartData={levelChartData}
                topAgentsData={topAgentsData}
                mitreData={mitreData}
            />

            <div className="card">
                <AlertsTable
                    alerts={alerts}
                    expanded={expanded}
                    setExpanded={setExpanded}
                />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={pageNumbers}
                    setPage={setPage}
                />
            </div>
        </>
    );
}