import { Activity, AlertTriangle, Clock } from "lucide-react";

export default function AgentsInsightSummary({
                                                 atRisk,
                                                 alerts24h,
                                                 latestData,
                                             }) {
    const cards = [
        {
            title: "At-Risk Agents",
            value: atRisk,
            description: "Disconnected or suspicious activity",
            icon: AlertTriangle,
            iconClass: "bg-red-50 text-red-600",
        },
        {
            title: "Alerts 24h",
            value: alerts24h,
            description: "Detected from all endpoints",
            icon: Activity,
            iconClass: "bg-amber-50 text-amber-600",
        },
        {
            title: "Latest Data",
            value: latestData || "-",
            description: "Most recent alert or log",
            icon: Clock,
            iconClass: "bg-blue-50 text-blue-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {cards.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="flex items-start gap-3.5 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm"
                    >
                        <div className={`grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl ${item.iconClass}`}>
                            <Icon size={22} />
                        </div>

                        <div className="min-w-0">
                            <span className="text-sm font-medium text-slate-500">
                                {item.title}
                            </span>
                            <strong className="mt-1 block truncate text-lg font-bold text-slate-900">
                                {item.value}
                            </strong>
                            <p className="m-0 mt-1 text-sm text-slate-500">
                                {item.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}