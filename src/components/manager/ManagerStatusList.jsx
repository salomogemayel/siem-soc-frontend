export default function ManagerStatusList({ status }) {
    return (
        <div className="card">
            <h2>Manager Status</h2>

            <div className="manager-status-list">
                {Object.entries(status).length === 0 ? (
                    <p className="empty-text">No manager status data available.</p>
                ) : (
                    Object.entries(status).map(([key, value]) => (
                        <div className="manager-status-item" key={key}>
                            <span>{key}</span>
                            <strong>{String(value)}</strong>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}