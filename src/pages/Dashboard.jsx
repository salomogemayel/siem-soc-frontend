import { ShieldAlert, Server, ScrollText, Activity } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function Dashboard() {
    return (
        <>
            <PageHeader
                title="Dashboard Overview"
                description="Summary of your Wazuh-based SIEM monitoring system."
            />

            <div className="stats-grid">
                <StatCard
                    title="Total Alerts"
                    value="0"
                    description="Security events"
                    icon={<ShieldAlert size={22} />}
                />
                <StatCard
                    title="Active Agents"
                    value="0"
                    description="Connected endpoints"
                    icon={<Server size={22} />}
                />
                <StatCard
                    title="Rules"
                    value="0"
                    description="Detection rules"
                    icon={<ScrollText size={22} />}
                />
                <StatCard
                    title="Manager"
                    value="Online"
                    description="Wazuh manager status"
                    icon={<Activity size={22} />}
                />
            </div>

            <div className="card">
                <h2>Welcome to SIEM SOC Dashboard</h2>
                <p>
                    This dashboard will help visualize Wazuh alerts, agents, security
                    rules, and manager status in a simpler interface.
                </p>
            </div>
        </>
    );
}