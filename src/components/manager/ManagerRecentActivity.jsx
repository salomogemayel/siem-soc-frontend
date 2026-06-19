import { Clock } from "lucide-react";

export default function ManagerRecentActivity({ latest, metrics }) {
    const activities = [
        {
            label: "Latest Alert",
            value: latest.latest_alert_at || "No alert found",
            detail: `${metrics.alerts_last_24h ?? 0} alerts in the last 24 hours`,
        },
        {
            label: "Latest Raw Log",
            value: latest.latest_log_at || "No log found",
            detail: `${metrics.logs_last_24h ?? 0} logs in the last 24 hours`,
        },
        {
            label: "Active Agents",
            value: `${metrics.active_agents ?? 0} active`,
            detail: `${metrics.disconnected_agents ?? 0} disconnected agents`,
        },
    ];

    return (
        <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                <h2 className="m-0 text-lg font-semibold text-slate-900">
                    Recent System Activity
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                {activities.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                        <span className="text-sm font-medium text-slate-500">
                            {item.label}
                        </span>
                        <strong className="mt-1 block break-words text-base font-bold text-slate-900">
                            {item.value}
                        </strong>
                        <p className="m-0 mt-1 text-sm text-slate-500">
                            {item.detail}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}