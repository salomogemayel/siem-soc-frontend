import { useEffect, useMemo, useState } from "react";

import { getAlerts } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import AlertsFilterBar from "../components/alerts/AlertsFilterBar";
import AlertsSummary from "../components/alerts/AlertsSummary";
import AlertsCharts from "../components/alerts/AlertsCharts";
import AlertsTable from "../components/alerts/AlertsTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20;

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [level, setLevel] = useState("");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const fetchAlerts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getAlerts({
                page,
                size: PAGE_SIZE,
                level,
                search,
            });

            if (response.data.success) {
                setAlerts(response.data.data || []);
                setTotal(response.data.total || 0);
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
        fetchAlerts();
    }, [page, level]);

    const applySearch = () => {
        setPage(1);
        fetchAlerts();
    };

    const resetFilters = () => {
        setLevel("");
        setSearch("");
        setPage(1);
    };

    const summary = useMemo(() => {
        const critical = alerts.filter((a) => Number(a.level) >= 12).length;

        const authFailed = alerts.filter((a) =>
            String(a.description).toLowerCase().includes("failed")
        ).length;

        const authSuccess = alerts.filter((a) =>
            String(a.description).toLowerCase().includes("successful")
        ).length;

        return {
            total,
            critical,
            authFailed,
            authSuccess,
        };
    }, [alerts, total]);

    const levelChartData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            const time = new Date(alert.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            if (!grouped[time]) {
                grouped[time] = { time, low: 0, medium: 0, high: 0 };
            }

            const lvl = Number(alert.level);

            if (lvl >= 10) grouped[time].high += 1;
            else if (lvl >= 5) grouped[time].medium += 1;
            else grouped[time].low += 1;
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

        for (let i = start; i <= end; i++) pages.push(i);

        return pages;
    }, [page, totalPages]);

    if (loading) return <LoadingState message="Loading alerts..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <PageHeader
                title="Security Alerts"
                description=""
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