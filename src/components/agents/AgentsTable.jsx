const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }).format(date);
};

export default function AgentsTable({ agents }) {
    return (
        <div className="table-wrapper">
            <table className="data-table agents-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>IP</th>
                    <th>OS</th>
                    <th>Status</th>
                    <th>Last Keep Alive</th>
                </tr>
                </thead>

                <tbody>
                {agents.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="empty-table">
                            No agents found.
                        </td>
                    </tr>
                ) : (
                    agents.map((agent) => (
                        <tr key={agent.id}>
                            <td>
                                <span className="agent-id">#{agent.id}</span>
                            </td>

                            <td>{agent.name || "-"}</td>
                            <td>{agent.ip || "-"}</td>
                            <td>{agent.os?.name || "-"}</td>

                            <td>
                  <span className={`status-badge ${agent.status}`}>
                    {agent.status || "unknown"}
                  </span>
                            </td>

                            <td>{formatDate(agent.lastKeepAlive)}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}