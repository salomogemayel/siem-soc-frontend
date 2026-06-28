import { useEffect, useMemo, useState } from "react";

import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { getAlerts, getAgents, getManager} from "../api/wazuhApi";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentAlertsTable from "../components/dashboard/RecentAlertsTable";
import ManagerHealthMini from "../components/dashboard/ManagerHealthMini";
import AlertSeverityDonut from "../components/dashboard/AlertSeverityDonut";
import AlertEvolutionChart from "../components/dashboard/AlertEvolutionChart";
import TopMitreTactics from "../components/dashboard/TopMitreTactics";
import AttackTypeChart from "../components/dashboard/AttackTypeChart.jsx";
import { getAttackType } from "../utils/attackTypeUtils.js";

export default function Dashboard() {
    const [alerts, setAlerts] = useState([]);
    const [totalAlerts, setTotalAlerts] = useState(0);

    const [agents, setAgents] = useState([]);
    const [totalAgents, setTotalAgents] = useState(0);

    const [manager, setManager] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [timeframe, setTimeframe] = useState("24h");

    const [topMitreData, setTopMitreData] = useState([]);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError("");

        try {
            const [alertsRes, agentsRes, managerRes] = await Promise.all([
                getAlerts({ page: 1, size: 100, timeRange: timeframe }),
                getAgents({ page: 1, size: 10 }),
                getManager(),
            ]);

            if (alertsRes.data.success) {
                setAlerts(alertsRes.data.data || []);

                // PERBAIKAN: Gunakan raw_total dari backend agar angka tidak mentok di 1000
                setTotalAlerts(alertsRes.data.raw_total || alertsRes.data.total || 0);

                setTopMitreData(alertsRes.data.statistics?.top_mitre || []);
            }

            if (agentsRes.data.success) {
                setAgents(agentsRes.data.data.affected_items || []);
                setTotalAgents(agentsRes.data.data.total_affected_items || 0);
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
    }, [timeframe]);

    const activeAgents = useMemo(() => {
        return agents.filter((agent) => agent.status === "active").length;
    }, [agents]);

    const highAlerts = useMemo(() => {
        return alerts.filter((alert) => alert.severity === "high").length;
    }, [alerts]);

    const mediumAlerts = useMemo(() => {
        return alerts.filter((alert) => alert.severity === "medium").length;
    }, [alerts]);

    const lowAlerts = useMemo(() => {
        return alerts.filter((alert) => alert.severity === "low").length;
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

    const attackTypeData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            const attackType = getAttackType(alert);
            grouped[attackType] = (grouped[attackType] || 0) + 1;
        });

        return Object.entries(grouped)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [alerts]);

    if (loading) return <LoadingState message="Loading dashboard data..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <PageHeader title="Dashboard Overview" description="" />

                <div className="flex items-center gap-2">
                    <label htmlFor="timeframe" className="text-sm font-medium text-slate-600">
                        Timeframe:
                    </label>
                    <select
                        id="timeframe"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        {/* PERBAIKAN: Menambahkan opsi timeframe baru */}
                        <option value="15m">Last 15 Minutes</option>
                        <option value="30m">Last 30 Minutes</option>
                        <option value="1h">Last 1 Hour</option>
                        <option value="12h">Last 12 Hours</option>
                        <option value="24h">Last 24 Hours</option>
                        <option value="today">Today</option>
                    </select>
                </div>
            </div>

            <DashboardStats
                totalAlerts={totalAlerts}
                highAlerts={highAlerts}
                attackTypeCount={attackTypeData.length}
                totalAgents={totalAgents}
                activeAgents={activeAgents}
            />

            <div className="mb-[18px] grid grid-cols-1 gap-[18px] xl:grid-cols-12">
                <div className="rounded-[14px] border border-slate-100 bg-white p-4 xl:col-span-7">
                    <AttackTypeChart data={attackTypeData} />
                </div>

                <div className="rounded-[14px] border border-slate-100 bg-white p-4 xl:col-span-5">
                    <AlertSeverityDonut
                        high={highAlerts}
                        medium={mediumAlerts}
                        low={lowAlerts}
                    />
                </div>
            </div>

            <div className="mb-[18px] grid grid-cols-1 gap-[18px] xl:grid-cols-12">
                <div className="xl:col-span-8">
                    <RecentAlertsTable alerts={alerts} />
                </div>

                <div className="xl:col-span-4">
                    <ManagerHealthMini manager={manager} onRefresh={fetchDashboardData} />
                </div>
            </div>

            <div className="mb-[18px] grid grid-cols-1 gap-[18px] xl:grid-cols-12">
                <div className="rounded-[14px] border border-slate-100 bg-white p-4 xl:col-span-7">
                    <AlertEvolutionChart data={alertEvolutionData} />
                </div>

                <div className="rounded-[14px] border border-slate-100 bg-white p-4 xl:col-span-5">
                    <TopMitreTactics data={topMitreData} />
                </div>
            </div>
        </>
    );
}