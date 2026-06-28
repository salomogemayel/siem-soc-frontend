import {
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    Server,
    WifiOff,
} from "lucide-react";

export default function AgentsSummary({
                                          total,
                                          active,
                                          disconnected,
                                          atRisk,
                                          alerts24h,
                                          latestData,
                                      }) {
    const cards = [
        { title: "Total", value: total, icon: Server, iconClass: "bg-blue-50 text-blue-600", className: "lg:col-span-1" },
        { title: "Active", value: active, icon: CheckCircle, iconClass: "bg-emerald-50 text-emerald-600", className: "lg:col-span-1" },
        { title: "Disconnected", value: disconnected, icon: WifiOff, iconClass: "bg-red-50 text-red-600", className: "lg:col-span-1" },
        { title: "At Risk", value: atRisk, icon: AlertTriangle, iconClass: "bg-red-50 text-red-600", className: "lg:col-span-1" },
        { title: "Alerts 24h", value: alerts24h, icon: Activity, iconClass: "bg-amber-50 text-amber-600", className: "lg:col-span-2" },
        { title: "Latest Data", value: latestData || "-", icon: Clock, iconClass: "bg-blue-50 text-blue-600", className: "lg:col-span-2" },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-8">
            {cards.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className={`flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm ${item.className}`}
                    >
                        <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${item.iconClass}`}>
                            <Icon size={17} />
                        </div>

                        <div className="min-w-0">
                            <span className="block truncate text-xs font-medium text-slate-500">
                                {item.title}
                            </span>

                            <strong className="block truncate text-base font-bold text-slate-900">
                                {item.value}
                            </strong>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}