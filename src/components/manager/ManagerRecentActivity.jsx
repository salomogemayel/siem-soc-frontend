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
        <div className="card manager-recent-card">
            <div className="manager-card-title">
                <Clock size={20} />
                <h2>Recent System Activity</h2>
            </div>

            <div className="manager-activity-list">
                {activities.map((item) => (
                    <div className="manager-activity-item" key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                        <p>{item.detail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}