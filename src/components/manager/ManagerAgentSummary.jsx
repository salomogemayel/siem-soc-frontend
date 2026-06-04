import { CheckCircle, Server, WifiOff, CircleHelp } from "lucide-react";

export default function ManagerAgentSummary({ metrics }) {
    const cards = [
        {
            title: "Total Agents",
            value: metrics.total_agents,
            icon: <Server size={22} />,
        },
        {
            title: "Active",
            value: metrics.active_agents,
            icon: <CheckCircle size={22} />,
            className: "success",
        },
        {
            title: "Disconnected",
            value: metrics.disconnected_agents,
            icon: <WifiOff size={22} />,
            className: "danger",
        },
        {
            title: "Never Connected",
            value: metrics.never_connected_agents,
            icon: <CircleHelp size={22} />,
            className: "warning",
        },
    ];

    return (
        <div className="card">
            <h2>Agent Connectivity</h2>

            <div className="manager-agent-grid">
                {cards.map((card) => (
                    <div className="manager-agent-card" key={card.title}>
                        <div className={card.className || ""}>{card.icon}</div>
                        <span>{card.title}</span>
                        <strong>{card.value ?? 0}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}