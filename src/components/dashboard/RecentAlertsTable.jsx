import { AlertTriangle } from "lucide-react";

export default function RecentAlertsTable({ alerts }) {
    const formatTime = (timestamp) => {
        if (!timestamp) return "-";
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="card">
            <div className="dashboard-card-header">
                <div>
                    <h2>Recent Alerts</h2>
                    <p>Latest alerts retrieved from Wazuh Indexer</p>
                </div>
                <AlertTriangle size={22} />
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Agent</th>
                        <th>Description</th>
                        <th>Level</th>
                        <th>Rule</th>
                    </tr>
                    </thead>

                    <tbody>
                    {alerts.map((alert, index) => (
                        <tr key={`${alert.timestamp}-${alert.rule_id}-${index}`}>
                            <td>{formatTime(alert.timestamp)}</td>
                            <td>{alert.agent_name}</td>
                            <td>{alert.description}</td>
                            <td>
                  <span className={`level-badge level-${alert.level}`}>
                    {alert.level}
                  </span>
                            </td>
                            <td>
                                <span className="rule-link">{alert.rule_id}</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}