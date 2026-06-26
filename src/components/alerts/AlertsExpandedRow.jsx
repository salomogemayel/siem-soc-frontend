export default function AlertExpandedRow({ alert }) {
    const childAlerts = Array.isArray(alert.child_alerts)
        ? alert.child_alerts
        : [];

    const hasEvidence = childAlerts.length > 0;

    const formatTime = (timestamp) => {
        if (!timestamp) return "-";
        return new Date(timestamp).toLocaleString();
    };

    return (
        <tr className="bg-slate-50">
            <td></td>

            <td colSpan="8" className="p-3.5">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="mb-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                        <p className="m-0">
                            <strong>Groups:</strong>{" "}
                            {alert.groups?.length ? alert.groups.join(", ") : "-"}
                        </p>

                        <p className="m-0">
                            <strong>MITRE ID:</strong>{" "}
                            {alert.mitre?.id?.length ? alert.mitre.id.join(", ") : "-"}
                        </p>

                        <p className="m-0">
                            <strong>Timestamp:</strong> {alert.timestamp || "-"}
                        </p>

                        <p className="m-0">
                            <strong>Correlation:</strong>{" "}
                            {alert.correlation_role || "standalone"}
                            {alert.correlation_role === "parent"
                                ? ` (${alert.child_count || 0} evidence)`
                                : ""}
                        </p>
                    </div>

                    <pre className="mt-3 overflow-x-auto rounded-[10px] bg-slate-900 p-3 text-xs text-slate-200">
                        {alert.log_preview || alert.full_log || "No log preview available."}
                    </pre>

                    {hasEvidence && (
                        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/40 p-3">
                            <div className="mb-3 flex items-center justify-between">
                                <h4 className="m-0 text-sm font-bold text-slate-800">
                                    Related Evidence
                                </h4>

                                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                                    {childAlerts.length} events
                                </span>
                            </div>

                            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                                <table className="w-full border-collapse text-left text-xs">
                                    <thead>
                                    <tr className="bg-slate-50 text-slate-600">
                                        <th className="border-b border-slate-200 p-2.5 font-semibold">Time</th>
                                        <th className="border-b border-slate-200 p-2.5 font-semibold">Rule</th>
                                        <th className="border-b border-slate-200 p-2.5 font-semibold">Level</th>
                                        <th className="border-b border-slate-200 p-2.5 font-semibold">Description</th>
                                        <th className="border-b border-slate-200 p-2.5 font-semibold">Source IP</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {childAlerts.map((child, index) => (
                                        <tr key={`${child.id || child.rule_id}-${child.timestamp}-${index}`}>
                                            <td className="border-b border-slate-100 p-2.5">
                                                {formatTime(child.timestamp)}
                                            </td>

                                            <td className="border-b border-slate-100 p-2.5 font-semibold text-blue-600">
                                                {child.rule_id || "-"}
                                            </td>

                                            <td className="border-b border-slate-100 p-2.5">
                                                {child.level || "-"}
                                            </td>

                                            <td className="border-b border-slate-100 p-2.5">
                                                {child.description || "-"}
                                            </td>

                                            <td className="border-b border-slate-100 p-2.5">
                                                {child.srcip || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
}