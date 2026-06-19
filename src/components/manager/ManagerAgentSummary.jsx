import { CheckCircle, Server, WifiOff, CircleHelp } from "lucide-react";

export default function ManagerAgentSummary({ metrics }) {
    const cards = [
        {
            title: "Total Agents",
            value: metrics.total_agents,
            icon: Server,
            iconClass: "bg-blue-50 text-blue-600",
        },
        {
            title: "Active",
            value: metrics.active_agents,
            icon: CheckCircle,
            iconClass: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Disconnected",
            value: metrics.disconnected_agents,
            icon: WifiOff,
            iconClass: "bg-red-50 text-red-600",
        },
        {
            title: "Never Connected",
            value: metrics.never_connected_agents,
            icon: CircleHelp,
            iconClass: "bg-amber-50 text-amber-600",
        },
    ];

    return (
        <div className="h-full rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="m-0 text-lg font-semibold text-slate-900">
                Agent Connectivity
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                        >
                            <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${card.iconClass}`}>
                                <Icon size={22} />
                            </div>

                            <span className="text-sm font-medium text-slate-500">
                                {card.title}
                            </span>
                            <strong className="mt-1 block text-2xl font-bold text-slate-900">
                                {card.value ?? 0}
                            </strong>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}