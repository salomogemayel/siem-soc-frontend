export default function ManagerInfoList({ info }) {
    const formatValue = (value) => {
        if (value === null || value === undefined) return "-";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value);
    };

    return (
        <div className="card">
            <h2>Manager Information</h2>

            <div className="manager-info-list">
                {Object.entries(info).length === 0 ? (
                    <p className="empty-text">No manager information available.</p>
                ) : (
                    Object.entries(info).map(([key, value]) => (
                        <div className="manager-info-item" key={key}>
                            <span>{key}</span>
                            <strong>{formatValue(value)}</strong>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}