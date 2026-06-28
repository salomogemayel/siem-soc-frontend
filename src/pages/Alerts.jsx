import { useEffect, useMemo, useState } from "react";

import { getAlerts } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import AlertsSummary from "../components/alerts/AlertsSummary";
import AlertsCharts from "../components/alerts/AlertsCharts";
import AlertsTabs from "../components/alerts/AlertsTabs";
import { getAlertSeverity } from "../utils/alertUtils";

const DEFAULT_SUMMARY = {
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
};

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [summary, setSummary] = useState(DEFAULT_SUMMARY);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 1. Tambahkan state timeframe (default 24h)
    const [timeframe, setTimeframe] = useState("24h");

    const fetchOverview = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getAlerts({
                page: 1,
                size: 10000,
                timeRange: timeframe,
                alertView: "raw",
            });

            if (response.data.success) {
                setAlerts(response.data.data || []);

                const backendSummary = response.data.summary || DEFAULT_SUMMARY;
                if (response.data.raw_total !== undefined) {
                    backendSummary.total = response.data.raw_total;
                }

                setSummary(backendSummary);
            } else {
                setError(response.data.error || "Failed to load alert overview");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchOverview();
    }, [timeframe]);

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

        return Object.entries(grouped)
            .map(([name, value]) => ({
                name,
                value,
            }))
            .sort((a, b) => b.value - a.value);
    }, [alerts]);

    const categoryData = useMemo(() => {
        const grouped = {
            Authentication: 0,
            "Privilege Activity": 0,
            "Web Activity": 0,
            "Database Activity": 0,
            "File Integrity": 0,
            System: 0,
            Other: 0,
        };

        alerts.forEach((alert) => {
            const groups = Array.isArray(alert.groups) ? alert.groups : [];
            const groupText = groups.join(" ").toLowerCase();

            if (groupText.includes("authentication") || groupText.includes("pam")) {
                grouped.Authentication += 1;
            } else if (groupText.includes("sudo")) {
                grouped["Privilege Activity"] += 1;
            } else if (
                groupText.includes("web") ||
                groupText.includes("apache") ||
                groupText.includes("accesslog")
            ) {
                grouped["Web Activity"] += 1;
            } else if (groupText.includes("mysql")) {
                grouped["Database Activity"] += 1;
            } else if (groupText.includes("syscheck")) {
                grouped["File Integrity"] += 1;
            } else if (groupText.includes("syslog") || groupText.includes("system")) {
                grouped.System += 1;
            } else {
                grouped.Other += 1;
            }
        });

        return Object.entries(grouped)
            .map(([name, value]) => ({
                name,
                value,
            }))
            .filter((item) => item.value > 0)
            .sort((a, b) => b.value - a.value);
    }, [alerts]);

    const topRulesData = useMemo(() => {
        const grouped = {};

        alerts.forEach((alert) => {
            const id = alert.rule_id || "-";

            if (!grouped[id]) {
                grouped[id] = {
                    rule_id: id,
                    description: alert.description || "-",
                    level: alert.level || 0,
                    count: 0,
                };
            }

            grouped[id].count += 1;
        });

        return Object.values(grouped)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [alerts]);

    const recentHighAlerts = useMemo(() => {
        return alerts.filter((alert) => alert.severity === "high").slice(0, 5);
    }, [alerts]);

    if (loading) return <LoadingState message="Loading alert overview..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <section className="space-y-[18px]">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Security Alerts"
                />

                <div className="flex items-center gap-3">
                    <label htmlFor="timeframe" className="text-sm font-medium text-slate-600">
                        Timeframe:
                    </label>
                    <select
                        id="timeframe"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="15m">Last 15 Minutes</option>
                        <option value="30m">Last 30 Minutes</option>
                        <option value="1h">Last 1 Hour</option>
                        <option value="12h">Last 12 Hours</option>
                        <option value="24h">Last 24 Hours</option>
                        <option value="today">Today</option>
                    </select>
                </div>
            </div>

            <AlertsTabs />

            <AlertsSummary summary={summary} />

            <AlertsCharts
                levelChartData={levelChartData}
                topAgentsData={topAgentsData}
                categoryData={categoryData}
                topRulesData={topRulesData}
                recentHighAlerts={recentHighAlerts}
            />
        </section>
    );
}