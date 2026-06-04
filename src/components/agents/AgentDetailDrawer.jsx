import { X } from "lucide-react";

export default function AgentDetailDrawer({ agent, onClose }) {
    if (!agent) return null;

    const insights = agent.insights || {};

    const formatDate = (value) => {
        if (!value) return "-";

        const date = new Date(value);

        if (Number.isNaN(date.getTime()) || date.getFullYear() >= 9999) {
            return "-";
        }

        return date.toLocaleString();
    };

    return (
        <div className="agent-drawer-overlay" onClick={onClose}>
            <aside className="agent-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="agent-drawer-header">
                    <div>
                        <h2>{agent.name}</h2>
                        <p>
                            Agent #{agent.id} • {agent.ip || "-"}
                        </p>
                    </div>

                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="agent-drawer-section">
                    <h3>Endpoint Overview</h3>

                    <div className="agent-detail-grid">
                        <div>
                            <span>Status</span>
                            <strong>{agent.status || "-"}</strong>
                        </div>

                        <div>
                            <span>Risk Level</span>
                            <strong>{insights.risk_level || "Low"}</strong>
                        </div>

                        <div>
                            <span>Operating System</span>
                            <strong>{agent.os?.name || "-"}</strong>
                        </div>

                        <div>
                            <span>Last Keep Alive</span>
                            <strong>{formatDate(agent.lastKeepAlive)}</strong>
                        </div>
                    </div>
                </div>

                <div className="agent-drawer-section">
                    <h3>Security Activity</h3>

                    <div className="agent-detail-grid">
                        <div>
                            <span>Alerts Last 24h</span>
                            <strong>{insights.alerts_24h || 0}</strong>
                        </div>

                        <div>
                            <span>High Alerts Last 24h</span>
                            <strong>{insights.high_alerts_24h || 0}</strong>
                        </div>

                        <div>
                            <span>Latest Alert</span>
                            <strong>{formatDate(insights.latest_alert_at)}</strong>
                        </div>

                        <div>
                            <span>Latest Log</span>
                            <strong>{formatDate(insights.latest_log_at)}</strong>
                        </div>
                    </div>
                </div>

                <div className="agent-drawer-section">
                    <h3>Monitoring Coverage</h3>

                    <div className="coverage-list">
                        <div>
                            <span>Log Collection</span>
                            <strong>Active</strong>
                        </div>

                        <div>
                            <span>Security Alerts</span>
                            <strong>Active</strong>
                        </div>

                        <div>
                            <span>Syscollector</span>
                            <strong>{agent.os ? "Available" : "Unknown"}</strong>
                        </div>

                        <div>
                            <span>Vulnerability Data</span>
                            <strong>Future Module</strong>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}