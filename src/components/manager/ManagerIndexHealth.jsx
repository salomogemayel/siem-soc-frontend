import { Database } from "lucide-react";

export default function ManagerIndexHealth({ indices, metrics }) {
    const rows = [
        {
            name: "Alerts Index",
            index: "wazuh-alerts-*",
            available: indices.alerts?.available,
            count: metrics.alerts_last_24h,
            latest: indices.alerts?.latest_at,
        },
        {
            name: "Archives Index",
            index: "wazuh-archives-*",
            available: indices.archives?.available,
            count: metrics.logs_last_24h,
            latest: indices.archives?.latest_at,
        },
    ];

    return (
        <div className="h-full rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <Database size={20} className="text-blue-600" />
                <h2 className="m-0 text-lg font-semibold text-slate-900">
                    Index Health
                </h2>
            </div>

            <div className="space-y-3">
                {rows.map((row) => (
                    <div
                        key={row.index}
                        className="grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 lg:grid-cols-4"
                    >
                        <div>
                            <strong className="block text-sm font-semibold text-slate-900">
                                {row.name}
                            </strong>
                            <span className="text-xs text-slate-500">
                                {row.index}
                            </span>
                        </div>

                        <div>
                            <span className="block text-xs font-medium text-slate-500">
                                Status
                            </span>
                            <strong
                                className={`text-sm font-bold ${
                                    row.available ? "text-emerald-700" : "text-red-700"
                                }`}
                            >
                                {row.available ? "Available" : "Unavailable"}
                            </strong>
                        </div>

                        <div>
                            <span className="block text-xs font-medium text-slate-500">
                                Last 24h
                            </span>
                            <strong className="text-sm font-bold text-slate-900">
                                {row.count ?? 0}
                            </strong>
                        </div>

                        <div>
                            <span className="block text-xs font-medium text-slate-500">
                                Latest
                            </span>
                            <strong className="break-words text-sm font-bold text-slate-900">
                                {row.latest || "-"}
                            </strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}