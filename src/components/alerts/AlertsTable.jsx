import { Fragment } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import AlertExpandedRow from "./AlertsExpandedRow.jsx";

export default function AlertsTable({ alerts, expanded, setExpanded }) {
    const formatTime = (timestamp) => {
        if (!timestamp) return "-";
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="table-wrapper">
            <table className="data-table alerts-table">
                <thead>
                <tr>
                    <th></th>
                    <th>Time</th>
                    <th>Agent</th>
                    <th>Agent Name</th>
                    <th>Technique(s)</th>
                    <th>Tactic(s)</th>
                    <th>Description</th>
                    <th>Level</th>
                    <th>Rule ID</th>
                </tr>
                </thead>

                <tbody>
                {alerts.length === 0 ? (
                    <tr>
                        <td colSpan="9" className="empty-table">
                            No alerts found.
                        </td>
                    </tr>
                ) : (
                    alerts.map((alert, index) => {
                        const rowKey = `${alert.rule_id}-${alert.timestamp}-${index}`;
                        const isOpen = expanded === rowKey;

                        return (
                            <Fragment key={rowKey}>
                                <tr>
                                    <td>
                                        <button
                                            className="expand-btn"
                                            onClick={() => setExpanded(isOpen ? null : rowKey)}
                                        >
                                            {isOpen ? (
                                                <ChevronDown size={16} />
                                            ) : (
                                                <ChevronRight size={16} />
                                            )}
                                        </button>
                                    </td>

                                    <td>{formatTime(alert.timestamp)}</td>
                                    <td>{alert.agent_id}</td>
                                    <td>{alert.agent_name}</td>

                                    <td>
                                        {alert.technique?.length
                                            ? alert.technique.join(", ")
                                            : "-"}
                                    </td>

                                    <td>
                                        {alert.tactic?.length ? alert.tactic.join(", ") : "-"}
                                    </td>

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

                                {isOpen && <AlertExpandedRow alert={alert} />}
                            </Fragment>
                        );
                    })
                )}
                </tbody>
            </table>
        </div>
    );
}