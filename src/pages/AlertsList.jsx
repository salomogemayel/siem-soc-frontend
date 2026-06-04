import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { getAlerts } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import AlertsFilterBar from "../components/alerts/AlertsFilterBar";
import AlertsTable from "../components/alerts/AlertsTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20;

export default function AlertsList() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Grab the severity from the URL if it exists (e.g., ?severity=high)
    const initialSeverity = searchParams.get("severity") || "";

    const [alerts, setAlerts] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [level, setLevel] = useState(initialSeverity);
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

    if (loading) return <LoadingState message="Loading alerts list..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <PageHeader
                    title="Alerts List"
                    description="Detailed view of security events"
                />
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary" // Use your existing button classes
                    style={{ marginBottom: "1.5rem" }}
                >
                    &larr; Back to Dashboard
                </button>
            </div>

            <AlertsFilterBar
                search={search}
                setSearch={setSearch}
                level={level}
                setLevel={setLevel}
                setPage={setPage}
                onApply={applySearch}
                onReset={resetFilters}
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