import { Activity, Eye, FileText, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgentCard({ agent, onSelectAgent }) {
    const navigate = useNavigate();

    const insights = agent.insights || {};
    const risk = insights.risk_level || "Low";

    const formatDate = (value) => {
        if (!value) return "-";

        const date = new Date(value);

        if (Number.isNaN(date.getTime()) || date.getFullYear() >= 9999) {
            return "-";
        }

        return date.toLocaleString();
    };

    const getRiskClass = (value) => {
        const riskValue = String(value || "").toLowerCase();

        if (riskValue === "high") return "bg-red-50 text-red-700";
        if (riskValue === "medium") return "bg-amber-50 text-amber-700";

        return "bg-emerald-50 text-emerald-700";
    };

    const getStatusClass = (value) => {
        const statusValue = String(value || "").toLowerCase();

        if (statusValue === "active") return "bg-emerald-50 text-emerald-700";
        if (statusValue === "disconnected") return "bg-red-50 text-red-700";

        return "bg-slate-100 text-slate-600";
    };

    const goToAlerts = (event) => {
        event.stopPropagation();
        navigate(`/alerts?agent=${encodeURIComponent(agent.name || "")}`);
    };

    const goToLogs = (event) => {
        event.stopPropagation();
        navigate(`/logs?agent_id=${encodeURIComponent(agent.id || "")}`);
    };

    return (
        <div
            onClick={() => onSelectAgent(agent)}
            className="cursor-pointer rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="m-0 truncate text-lg font-semibold text-slate-900">
                        {agent.name || "Unknown Agent"}
                    </h3>
                    <p className="m-0 mt-1 text-sm text-slate-500">
                        #{agent.id} • {agent.ip || "-"}
                    </p>
                </div>

                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${getRiskClass(risk)}`}>
                    {risk} Risk
                </span>
            </div>

            <div className="space-y-2.5">
                <div className="flex justify-between gap-3 text-sm">
                    <span className="text-slate-500">OS</span>
                    <strong className="text-right font-semibold text-slate-900">
                        {agent.os?.name || "-"}
                    </strong>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                    <span className="text-slate-500">Status</span>
                    <strong>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${getStatusClass(agent.status)}`}>
                            {agent.status || "unknown"}
                        </span>
                    </strong>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                    <span className="text-slate-500">Last Keep Alive</span>
                    <strong className="text-right font-semibold text-slate-900">
                        {formatDate(agent.lastKeepAlive)}
                    </strong>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <ShieldAlert size={18} className="text-blue-600" />
                    <span className="mt-2 block text-xs text-slate-500">Alerts 24h</span>
                    <strong className="text-base font-bold text-slate-900">
                        {insights.alerts_24h || 0}
                    </strong>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <Activity size={18} className="text-amber-600" />
                    <span className="mt-2 block text-xs text-slate-500">High Alerts</span>
                    <strong className="text-base font-bold text-slate-900">
                        {insights.high_alerts_24h || 0}
                    </strong>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <FileText size={18} className="text-emerald-600" />
                    <span className="mt-2 block text-xs text-slate-500">Latest Data</span>
                    <strong className="block truncate text-sm font-bold text-slate-900">
                        {formatDate(insights.latest_data_at)}
                    </strong>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                    type="button"
                    onClick={goToAlerts}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                    <ShieldAlert size={15} />
                    View Alerts
                </button>

                <button
                    type="button"
                    onClick={goToLogs}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                    <FileText size={15} />
                    View Logs
                </button>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelectAgent(agent);
                    }}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    <Eye size={15} />
                    Details
                </button>
            </div>
        </div>
    );
}