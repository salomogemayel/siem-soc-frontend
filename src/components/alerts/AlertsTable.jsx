import { Fragment } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import AlertExpandedRow from "./AlertsExpandedRow.jsx";

export default function AlertsTable({ alerts, expanded, setExpanded }) {
    const formatTime = (timestamp) => {
        if (!timestamp) return "-";
        return new Date(timestamp).toLocaleString();
    };

    const getLevelClass = (level) => {
        const value = Number(level);

        if (value >= 8) return "bg-red-50 text-red-700";
        if (value >= 5) return "bg-amber-50 text-amber-700";
        return "bg-emerald-50 text-emerald-700";
    };

    return (
        <div className="overflow-x-auto rounded-[14px] border border-slate-100 bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
                <thead>
                <tr className="bg-slate-50 text-sm text-slate-600">
                    <th className="border-b border-slate-200 p-3.5"></th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Time</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Agent</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Agent Name</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Technique(s)</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Tactic(s)</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Description</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Level</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Rule ID</th>
                </tr>
                </thead>

                <tbody>
                {alerts.length === 0 ? (
                    <tr>
                        <td colSpan="9" className="p-6 text-center text-sm text-slate-500">
                            No alerts found.
                        </td>
                    </tr>
                ) : (
                    alerts.map((alert, index) => {
                        const rowKey = `${alert.rule_id}-${alert.timestamp}-${index}`;
                        const isOpen = expanded === rowKey;

                        return (
                            <Fragment key={rowKey}>
                                <tr className="text-sm text-slate-700 hover:bg-slate-50">
                                    <td className="border-b border-slate-100 p-3.5">
                                        <button
                                            type="button"
                                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                            onClick={() => setExpanded(isOpen ? null : rowKey)}
                                        >
                                            {isOpen ? (
                                                <ChevronDown size={16} />
                                            ) : (
                                                <ChevronRight size={16} />
                                            )}
                                        </button>
                                    </td>

                                    <td className="border-b border-slate-100 p-3.5">
                                        {formatTime(alert.timestamp)}
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">
                                        {alert.agent_id}
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">
                                        {alert.agent_name}
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">
                                        {alert.technique?.length ? alert.technique.join(", ") : "-"}
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">
                                        {alert.tactic?.length ? alert.tactic.join(", ") : "-"}
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">
                                        {alert.description}
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">
                                            <span className={`inline-flex min-w-8 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${getLevelClass(alert.level)}`}>
                                                {alert.level}
                                            </span>
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">
                                            <span className="font-semibold text-blue-600">
                                                {alert.rule_id}
                                            </span>
                                    </td>
                                </tr>

                                {isOpen && <AlertExpandedRow alert={alert} />}
                            </Fragment>
                        );
                    })
                )}
                </tbody>
            </table>
        </div>
    );
}