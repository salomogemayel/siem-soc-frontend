import { X } from "lucide-react";

export default function AgentDetailDrawer({ agent, onClose }) {
    if (!agent) return null;

    const insights = agent.insights || {};

    const formatDate = (value) => {
        if (!value) return "-";

        const date = new Date(value);

        if (Number.isNaN(date.getTime()) || date.getFullYear() >= 9999) {
            return "-";
        }

        return date.toLocaleString();
    };

    const detailItemClass =
        "rounded-xl border border-slate-100 bg-slate-50 p-3";

    return (
        <div
            className="fixed inset-0 z-50 flex justify-end bg-slate-900/40"
            onClick={onClose}
        >
            <aside
                className="h-full w-full max-w-[520px] overflow-y-auto bg-white p-5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="m-0 text-xl font-bold text-slate-900">
                            {agent.name}
                        </h2>
                        <p className="m-0 mt-1 text-sm text-slate-500">
                            Agent #{agent.id} • {agent.ip || "-"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-5">
                    <h3 className="mb-3 text-base font-semibold text-slate-900">
                        Endpoint Overview
                    </h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">Status</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {agent.status || "-"}
                            </strong>
                        </div>

                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">Risk Level</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {insights.risk_level || "Low"}
                            </strong>
                        </div>

                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">Operating System</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {agent.os?.name || "-"}
                            </strong>
                        </div>

                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">Last Keep Alive</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {formatDate(agent.lastKeepAlive)}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="mb-3 text-base font-semibold text-slate-900">
                        Security Activity
                    </h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">Alerts Last 24h</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {insights.alerts_24h || 0}
                            </strong>
                        </div>

                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">High Alerts Last 24h</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {insights.high_alerts_24h || 0}
                            </strong>
                        </div>

                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">Latest Alert</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {formatDate(insights.latest_alert_at)}
                            </strong>
                        </div>

                        <div className={detailItemClass}>
                            <span className="text-xs font-medium text-slate-500">Latest Log</span>
                            <strong className="mt-1 block text-sm text-slate-900">
                                {formatDate(insights.latest_log_at)}
                            </strong>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-base font-semibold text-slate-900">
                        Monitoring Coverage
                    </h3>

                    <div className="space-y-2.5">
                        {[
                            ["Log Collection", "Active"],
                            ["Security Alerts", "Active"],
                            ["Syscollector", agent.os ? "Available" : "Unknown"],
                            ["Vulnerability Data", "Future Module"],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm"
                            >
                                <span className="text-slate-500">{label}</span>
                                <strong className="text-slate-900">{value}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}