import { useEffect, useMemo, useState } from "react";

import { getAgents } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import AgentsSummary from "../components/agents/AgentsSummary";
import AgentsInsightSummary from "../components/agents/AgentsInsightSummary";
import AgentsToolbar from "../components/agents/AgentsToolbar";
import AgentCardGrid from "../components/agents/AgentCardGrid";
import AgentDetailDrawer from "../components/agents/AgentDetailDrawer";

const PAGE_SIZE = 100;

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const [page] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAgents = async (overrides = {}) => {
        setLoading(true);
        setError("");

        try {
            const response = await getAgents({
                page,
                size: PAGE_SIZE,
                search,
                status,
                ...overrides,
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
        void fetchAgents();
    }, []);

    const applySearch = () => {
        fetchAgents({
            search,
            status,
        });
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("");

        fetchAgents({
            search: "",
            status: "",
        });
    };

    const summary = useMemo(() => {
        const active = agents.filter((agent) => agent.status === "active").length;

        const disconnected = agents.filter(
            (agent) => agent.status === "disconnected"
        ).length;

        const atRisk = agents.filter((agent) => {
            const risk = agent.insights?.risk_level || "Low";
            return risk !== "Low" || agent.status !== "active";
        }).length;

        const alerts24h = agents.reduce((total, agent) => {
            return total + Number(agent.insights?.alerts_24h || 0);
        }, 0);

        const latestData = agents
            .map((agent) => agent.insights?.latest_data_at)
            .filter(Boolean)
            .sort((a, b) => new Date(b) - new Date(a))[0];

        return {
            total,
            active,
            disconnected,
            atRisk,
            alerts24h,
            latestData: latestData
                ? new Date(latestData).toLocaleString()
                : "-",
        };
    }, [agents, total]);

    if (loading) return <LoadingState message="Loading agents..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="Agents"
                description="Monitor endpoint health, status, and security activity."
            />

            <AgentsSummary
                total={summary.total}
                active={summary.active}
                disconnected={summary.disconnected}
            />

            <AgentsInsightSummary
                active={summary.active}
                atRisk={summary.atRisk}
                alerts24h={summary.alerts24h}
                latestData={summary.latestData}
            />

            <AgentsToolbar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                setPage={() => {}}
                onApply={applySearch}
                onReset={resetFilters}
            />

            <AgentCardGrid
                agents={agents}
                onSelectAgent={setSelectedAgent}
            />

            <AgentDetailDrawer
                agent={selectedAgent}
                onClose={() => setSelectedAgent(null)}
            />
        </section>
    );
}