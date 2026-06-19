import { AlertTriangle } from "lucide-react";

export default function RecentAlertsTable({ alerts, limit = 5 }) {
    const formatTime = (timestamp) => {
        if (!timestamp) return "-";
        return new Date(timestamp).toLocaleString();
    };

    const getLevelClass = (level) => {
        const value = Number(level);

        if (value >= 8) {
            return "bg-red-50 text-red-700";
        }

        if (value >= 5) {
            return "bg-amber-50 text-amber-700";
        }

        return "bg-emerald-50 text-emerald-700";
    };

    return (
        <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h2 className="m-0 text-lg font-semibold text-slate-900">
                        Recent Alerts
                    </h2>
                    <p className="m-0 mt-1 text-sm text-slate-500">
                        Latest alerts retrieved from Wazuh Indexer
                    </p>
                </div>

                <AlertTriangle size={22} className="text-slate-500" />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                    <tr className="bg-slate-50 text-sm text-slate-600">
                        <th className="border-b border-slate-200 p-3.5 font-semibold">Time</th>
                        <th className="border-b border-slate-200 p-3.5 font-semibold">Agent</th>
                        <th className="border-b border-slate-200 p-3.5 font-semibold">Description</th>
                        <th className="border-b border-slate-200 p-3.5 font-semibold">Level</th>
                        <th className="border-b border-slate-200 p-3.5 font-semibold">Rule</th>
                    </tr>
                    </thead>

                    <tbody>
                    {alerts.slice(0, limit).map((alert, index) => (
                        <tr
                            key={`${alert.timestamp}-${alert.rule_id}-${index}`}
                            className="text-sm text-slate-700 hover:bg-slate-50"
                        >
                            <td className="border-b border-slate-100 p-3.5">
                                {formatTime(alert.timestamp)}
                            </td>
                            <td className="border-b border-slate-100 p-3.5">
                                {alert.agent_name}
                            </td>
                            <td className="border-b border-slate-100 p-3.5">
                                {alert.description}
                            </td>
                            <td className="border-b border-slate-100 p-3.5">
                                    <span
                                        className={`inline-flex min-w-8 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${getLevelClass(alert.level)}`}
                                    >
                                        {alert.level}
                                    </span>
                            </td>
                            <td className="border-b border-slate-100 p-3.5">
                                    <span className="font-semibold text-blue-600">
                                        {alert.rule_id}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}