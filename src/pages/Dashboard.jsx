import { useEffect, useMemo, useState } from "react";

import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { getAlertSeverity } from "../utils/alertUtils";
import { getAlerts, getAgents, getManager, getRules } from "../api/wazuhApi";

import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import RecentAlertsTable from "../components/dashboard/RecentAlertsTable";
import ManagerHealthMini from "../components/dashboard/ManagerHealthMini";
import AlertSeverityDonut from "../components/dashboard/AlertSeverityDonut";
import AlertEvolutionChart from "../components/dashboard/AlertEvolutionChart";
import TopMitreTactics from "../components/dashboard/TopMitreTactics";
import TopAgentsChart from "../components/dashboard/TopAgentsChart";

export default function Dashboard() {
    const [alerts, setAlerts] = useState([]);
    const [totalAlerts, setTotalAlerts] = useState(0);

    const [agents, setAgents] = useState([]);
    const [totalAgents, setTotalAgents] = useState(0);

    const [totalRules, setTotalRules] = useState(0);
    const [manager, setManager] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboardData = async () => {
        setLoading(true);
        setError("");

        try {
            const [alertsRes, agentsRes, rulesRes, managerRes] = await Promise.all([
                getAlerts({ page: 1, size: 10 }),
                getAgents({ page: 1, size: 10 }),
                getRules({ page: 1, size: 10 }),
                getManager(),
            ]);

            if (alertsRes.data.success) {
                setAlerts(alertsRes.data.data || []);
                setTotalAlerts(alertsRes.data.total || 0);
            }

            if (agentsRes.data.success) {
                setAgents(agentsRes.data.data.affected_items || []);
                setTotalAgents(agentsRes.data.data.total_affected_items || 0);
            }

            if (rulesRes.data.success) {
                setTotalRules(rulesRes.data.data.total_affected_items || 0);
            }

            if (managerRes.data.success) {
                setManager(managerRes.data.data);
            }
        } catch (err) {
            setError("Cannot load dashboard data from Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const activeAgents = useMemo(() => {
        return agents.filter((agent) => agent.status === "active").length;
    }, [agents]);

    // PASTE THIS IN ITS PLACE:
    const highAlerts = useMemo(() => {
        return alerts.filter((alert) => getAlertSeverity(alert.level) === "high").length;
    }, [alerts]);

    const mediumAlerts = useMemo(() => {
        return alerts.filter((alert) => getAlertSeverity(alert.level) === "medium").length;
    }, [alerts]);

    const lowAlerts = useMemo(() => {
        return alerts.filter((alert) => getAlertSeverity(alert.level) === "low").length;
    }, [alerts]);

    const alertEvolutionData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            const time = new Date(alert.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            if (!grouped[time]) {
                grouped[time] = { time, low: 0, medium: 0, high: 0 };
            }

            const level = Number(alert.level);

            if (level >= 10) grouped[time].high += 1;
            else if (level >= 5) grouped[time].medium += 1;
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

        return Object.entries(grouped).map(([name, count]) => ({
            name,
            alerts: count,
        }));
    }, [alerts]);

    // Add this to Dashboard.jsx
    const topMitreData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            // Some alerts might not have MITRE data, so we check first
            if (alert.tactic && alert.tactic.length > 0) {
                alert.tactic.forEach((tacticName) => {
                    grouped[tacticName] = (grouped[tacticName] || 0) + 1;
                });
            }
        });

        // Convert to array, sort by highest count, and take the top 5
        return Object.entries(grouped)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [alerts]);

    if (loading) return <LoadingState message="Loading dashboard data..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <PageHeader title="Dashboard Overview" description="" />

            {/* Note: I assume DashboardStats already has your new High/Med/Low summary passed to it! */}
            <DashboardStats
                totalAlerts={totalAlerts}
                highAlerts={highAlerts}
                mediumAlerts={mediumAlerts}
                lowAlerts={lowAlerts}
                totalAgents={totalAgents}
            />

            {/* ROW 2: Evolution (2/3 width) and Donut (1/3 width) */}
            <div className="dashboard-grid">
                <AlertEvolutionChart data={alertEvolutionData} />
                <AlertSeverityDonut high={highAlerts} medium={mediumAlerts} low={lowAlerts} />
            </div>

            {/* ROW 3: Top Agents and Top MITRE (Both Normal, sitting side-by-side) */}
            <div className="dashboard-grid">
                <TopAgentsChart data={topAgentsData} />
                <TopMitreTactics data={topMitreData} />
            </div>

            {/* ROW 4: Details */}
            <div className="dashboard-grid">
                <RecentAlertsTable alerts={alerts} />
                <ManagerHealthMini manager={manager} onRefresh={fetchDashboardData} />
            </div>
        </>
    );
}