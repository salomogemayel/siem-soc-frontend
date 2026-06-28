import { Database } from "lucide-react";

export default function ManagerIndexHealth({ indices = {}, metrics = {} }) {
    const formatDateTime = (value) => {
        if (!value) return "-";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatNumber = (value) =>
        new Intl.NumberFormat("id-ID").format(value ?? 0);

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
        <div className="h-full rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Database size={18} />
                </div>

                <div>
                    <h2 className="m-0 text-base font-semibold text-slate-900">
                        Index Health
                    </h2>
                    <p className="m-0 text-xs text-slate-500">
                        Wazuh index availability
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                {rows.map((row) => (
                    <div
                        key={row.index}
                        className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                    >
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1.4fr_110px_110px_170px]">
                            <div className="min-w-0">
                                <h3 className="m-0 truncate text-sm font-semibold text-slate-900">
                                    {row.name}
                                </h3>
                                <p className="m-0 mt-0.5 truncate text-xs text-slate-500">
                                    {row.index}
                                </p>
                            </div>

                            <div>
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        row.available
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-red-50 text-red-700"
                                    }`}
                                >
                                    {row.available ? "Available" : "Unavailable"}
                                </span>
                            </div>

                            <div>
                                <p className="m-0 text-[11px] font-medium text-slate-500">
                                    Last 24h
                                </p>
                                <strong className="text-sm font-semibold text-slate-900">
                                    {formatNumber(row.count)}
                                </strong>
                            </div>

                            <div>
                                <p className="m-0 text-[11px] font-medium text-slate-500">
                                    Latest
                                </p>
                                <strong className="text-sm font-semibold text-slate-900">
                                    {formatDateTime(row.latest)}
                                </strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}