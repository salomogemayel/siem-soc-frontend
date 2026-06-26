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

    const fetchOverview = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getAlerts({
                page: 1,
                size: 100,
                timeRange: "24h",
                alertView: "incident",
            });

            if (response.data.success) {
                setAlerts(response.data.data || []);
                setSummary(response.data.summary || DEFAULT_SUMMARY);
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
    }, []);

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
        return alerts.filter((alert) => Number(alert.level) >= 10).slice(0, 5);
    }, [alerts]);

    if (loading) return <LoadingState message="Loading alert overview..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="Security Alerts"
                description="Monitor detected security alerts from Wazuh Indexer."
            />

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