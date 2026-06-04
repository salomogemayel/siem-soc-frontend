import { Activity, Database, FileText, ShieldCheck } from "lucide-react";

function getStatusClass(status) {
    if (status === "online" || status === "connected" || status === "receiving") {
        return "success";
    }

    if (status === "idle") {
        return "warning";
    }

    return "danger";
}

export default function ManagerHealthOverview({ health, latest }) {
    const cards = [
        {
            title: "Manager API",
            value: health.manager_api || "unknown",
            description: "Wazuh API availability",
            icon: <Activity size={22} />,
        },
        {
            title: "Indexer",
            value: health.indexer || "unknown",
            description: "OpenSearch connection",
            icon: <Database size={22} />,
        },
        {
            title: "Alert Pipeline",
            value: health.alerts_pipeline || "unknown",
            description: latest.latest_alert_at || "No recent alert",
            icon: <ShieldCheck size={22} />,
        },
        {
            title: "Log Archive",
            value: health.logs_pipeline || "unknown",
            description: latest.latest_log_at || "No recent log",
            icon: <FileText size={22} />,
        },
    ];

    return (
        <div className="manager-health-grid">
            {cards.map((card) => (
                <div className="manager-health-card-v2" key={card.title}>
                    <div className={`manager-health-icon-v2 ${getStatusClass(card.value)}`}>
                        {card.icon}
                    </div>

                    <div>
                        <span>{card.title}</span>
                        <strong className={getStatusClass(card.value)}>
                            {card.value}
                        </strong>
                        <p>{card.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}