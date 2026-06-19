import { Server, CheckCircle, WifiOff } from "lucide-react";

export default function AgentsSummary({ total, active, disconnected }) {
    const cards = [
        {
            title: "Total Agents",
            value: total,
            icon: Server,
            iconClass: "bg-blue-50 text-blue-600",
        },
        {
            title: "Active",
            value: active,
            icon: CheckCircle,
            iconClass: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Disconnected",
            value: disconnected,
            icon: WifiOff,
            iconClass: "bg-red-50 text-red-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {cards.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="flex items-center gap-3.5 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm"
                    >
                        <div className={`grid h-[44px] w-[44px] shrink-0 place-items-center rounded-xl ${item.iconClass}`}>
                            <Icon size={24} />
                        </div>

                        <div>
                            <span className="text-sm font-medium text-slate-500">
                                {item.title}
                            </span>
                            <strong className="mt-1 block text-2xl font-bold text-slate-900">
                                {item.value}
                            </strong>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}