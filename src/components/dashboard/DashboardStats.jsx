import {
    Activity,
    CheckCircle,
    ScrollText,
    Server,
    ShieldAlert,
} from "lucide-react";
import StatCard from "../StatCard";

export default function DashboardStats({
                                           totalAlerts,
                                           highAlerts,
                                           totalAgents,
                                           activeAgents,
                                           totalRules,
                                           manager,
                                       }) {
    return (
        <div className="stats-grid">
            <StatCard
                title="Total Alerts"
                value={totalAlerts}
                description={`${highAlerts} high-risk alerts shown`}
                icon={<ShieldAlert size={22} />}
            />

            <StatCard
                title="Total Agents"
                value={totalAgents}
                description={`${activeAgents} active in current page`}
                icon={<Server size={22} />}
            />

            <StatCard
                title="Rules"
                value={totalRules}
                description="Detection rules available"
                icon={<ScrollText size={22} />}
            />

            <StatCard
                title="Manager"
                value={manager ? "Online" : "Unknown"}
                description="Wazuh manager API status"
                icon={manager ? <CheckCircle size={22} /> : <Activity size={22} />}
            />
        </div>
    );
}