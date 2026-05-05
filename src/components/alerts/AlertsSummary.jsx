export default function AlertsSummary({ summary }) {
    return (
        <div className="alert-summary-grid">
            <div className="alert-summary-card">
                <span>Total</span>
                <strong>{summary.total}</strong>
            </div>

            <div className="alert-summary-card danger">
                <span>Level 12 or above alerts</span>
                <strong>{summary.critical}</strong>
            </div>

            <div className="alert-summary-card warning">
                <span>Authentication failure</span>
                <strong>{summary.authFailed}</strong>
            </div>

            <div className="alert-summary-card success">
                <span>Authentication success</span>
                <strong>{summary.authSuccess}</strong>
            </div>
        </div>
    );
}