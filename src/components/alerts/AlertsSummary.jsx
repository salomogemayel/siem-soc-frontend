import { useNavigate } from "react-router-dom";

export default function AlertsSummary({ summary }) {
    const navigate = useNavigate();

    const handleNavigate = (severity) => {
        if (severity) {
            navigate(`/alerts-list?severity=${severity}`);
        } else {
            navigate(`/alerts-list`); // Navigates to all alerts
        }
    };

    return (
        <div className="alert-summary-grid">
            <div
                className="alert-summary-card"
                onClick={() => handleNavigate("")}
                style={{ cursor: "pointer" }}
            >
                <span>Total Alerts</span>
                <strong>{summary.total}</strong>
            </div>

            <div
                className="alert-summary-card danger"
                onClick={() => handleNavigate("high")}
                style={{ cursor: "pointer" }}
            >
                <span>High Alerts</span>
                <strong>{summary.high}</strong>
            </div>

            <div
                className="alert-summary-card warning"
                onClick={() => handleNavigate("medium")}
                style={{ cursor: "pointer" }}
            >
                <span>Medium Alerts</span>
                <strong>{summary.medium}</strong>
            </div>

            <div
                className="alert-summary-card success"
                onClick={() => handleNavigate("low")}
                style={{ cursor: "pointer" }}
            >
                <span>Low Alerts</span>
                <strong>{summary.low}</strong>
            </div>
        </div>
    );
}