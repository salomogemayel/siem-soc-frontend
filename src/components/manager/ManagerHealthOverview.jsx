import { Activity, Database, FileText, ShieldCheck } from "lucide-react";

function getStatusClass(status) {
    if (status === "online" || status === "connected" || status === "receiving") {
        return {
            icon: "bg-emerald-50 text-emerald-600",
            text: "text-emerald-700",
        };
    }

    if (status === "idle") {
        return {
            icon: "bg-amber-50 text-amber-600",
            text: "text-amber-700",
        };
    }

    return {
        icon: "bg-red-50 text-red-600",
        text: "text-red-700",
    };
}

export default function ManagerHealthOverview({ health, latest }) {
    const cards = [
        {
            title: "Manager API",
            value: health.manager_api || "unknown",
            description: "Wazuh API availability",
            icon: Activity,
        },
        {
            title: "Indexer",
            value: health.indexer || "unknown",
            description: "OpenSearch connection",
            icon: Database,
        },
        {
            title: "Alert Pipeline",
            value: health.alerts_pipeline || "unknown",
            description: latest.latest_alert_at || "No recent alert",
            icon: ShieldCheck,
        },
        {
            title: "Log Archive",
            value: health.logs_pipeline || "unknown",
            description: latest.latest_log_at || "No recent log",
            icon: FileText,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;
                const statusStyle = getStatusClass(card.value);

                return (
                    <div
                        key={card.title}
                        className="flex items-start gap-3.5 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm"
                    >
                        <div className={`grid h-[44px] w-[44px] shrink-0 place-items-center rounded-xl ${statusStyle.icon}`}>
                            <Icon size={22} />
                        </div>

                        <div className="min-w-0">
                            <span className="text-sm font-medium text-slate-500">
                                {card.title}
                            </span>
                            <strong className={`mt-1 block text-lg font-bold capitalize ${statusStyle.text}`}>
                                {card.value}
                            </strong>
                            <p className="m-0 mt-1 truncate text-sm text-slate-500">
                                {card.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}