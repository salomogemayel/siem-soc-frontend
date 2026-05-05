import { useEffect, useMemo, useState } from "react";

import { getAgents } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import AgentsSummary from "../components/agents/AgentsSummary";
import AgentsToolbar from "../components/agents/AgentsToolbar";
import AgentsTable from "../components/agents/AgentsTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20;

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const fetchAgents = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getAgents({
                page,
                size: PAGE_SIZE,
                search,
                status,
            });

            if (response.data.success) {
                setAgents(response.data.data.affected_items || []);
                setTotal(response.data.data.total_affected_items || 0);
            } else {
                setError(response.data.error || "Failed to load agents");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, [page, status]);

    const applySearch = () => {
        setPage(1);
        fetchAgents();
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("");
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

    const summary = useMemo(() => {
        const active = agents.filter((agent) => agent.status === "active").length;
        const disconnected = agents.filter(
            (agent) => agent.status === "disconnected"
        ).length;

        return {
            total,
            active,
            disconnected,
        };
    }, [agents, total]);

    if (loading) return <LoadingState message="Loading agents..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <PageHeader
                title="Agents"
                description=""
            />

            <AgentsSummary
                total={summary.total}
                active={summary.active}
                disconnected={summary.disconnected}
            />

            <AgentsToolbar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                setPage={setPage}
                onApply={applySearch}
                onReset={resetFilters}
            />

            <div className="card">
                <AgentsTable agents={agents} />

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