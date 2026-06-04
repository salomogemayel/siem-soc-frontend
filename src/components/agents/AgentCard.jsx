import { Activity, Eye, FileText, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgentCard({ agent, onSelectAgent }) {
    const navigate = useNavigate();

    const insights = agent.insights || {};
    const risk = insights.risk_level || "Low";

    const formatDate = (value) => {
        if (!value) return "-";

        const date = new Date(value);

        if (Number.isNaN(date.getTime()) || date.getFullYear() >= 9999) {
            return "-";
        }

        return date.toLocaleString();
    };

    const goToAlerts = (event) => {
        event.stopPropagation();
        navigate(`/alerts?agent=${encodeURIComponent(agent.name || "")}`);
    };

    const goToLogs = (event) => {
        event.stopPropagation();
        navigate(`/logs?agent_id=${encodeURIComponent(agent.id || "")}`);
    };

    return (
        <div className="agent-card" onClick={() => onSelectAgent(agent)}>
            <div className="agent-card-header">
                <div>
                    <h3>{agent.name || "Unknown Agent"}</h3>
                    <p>
                        #{agent.id} • {agent.ip || "-"}
                    </p>
                </div>

                <span className={`risk-badge risk-${risk.toLowerCase()}`}>
          {risk} Risk
        </span>
            </div>

            <div className="agent-meta-row">
                <span>OS</span>
                <strong>{agent.os?.name || "-"}</strong>
            </div>

            <div className="agent-meta-row">
                <span>Status</span>
                <strong>
          <span className={`status-badge ${agent.status}`}>
            {agent.status || "unknown"}
          </span>
                </strong>
            </div>

            <div className="agent-meta-row">
                <span>Last Keep Alive</span>
                <strong>{formatDate(agent.lastKeepAlive)}</strong>
            </div>

            <div className="agent-metric-grid">
                <div>
                    <ShieldAlert size={18} />
                    <span>Alerts 24h</span>
                    <strong>{insights.alerts_24h || 0}</strong>
                </div>

                <div>
                    <Activity size={18} />
                    <span>High Alerts</span>
                    <strong>{insights.high_alerts_24h || 0}</strong>
                </div>

                <div>
                    <FileText size={18} />
                    <span>Latest Data</span>
                    <strong>{formatDate(insights.latest_data_at)}</strong>
                </div>
            </div>

            <div className="agent-actions">
                <button onClick={goToAlerts}>
                    <ShieldAlert size={15} />
                    View Alerts
                </button>

                <button onClick={goToLogs}>
                    <FileText size={15} />
                    View Logs
                </button>

                <button className="secondary-btn" onClick={(e) => {
                    e.stopPropagation();
                    onSelectAgent(agent);
                }}>
                    <Eye size={15} />
                    Details
                </button>
            </div>
        </div>
    );
}