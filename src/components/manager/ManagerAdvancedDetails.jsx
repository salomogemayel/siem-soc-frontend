import { useState } from "react";

export default function ManagerAdvancedDetails({ status, info }) {
    const [open, setOpen] = useState(false);

    const formatValue = (value) => {
        if (value === null || value === undefined) return "-";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value);
    };

    return (
        <div className="card manager-advanced-card">
            <div className="manager-advanced-header">
                <div>
                    <h2>Advanced Manager Details</h2>
                    <p>Raw Wazuh manager status and information.</p>
                </div>

                <button onClick={() => setOpen(!open)}>
                    {open ? "Hide Details" : "Show Details"}
                </button>
            </div>

            {open && (
                <div className="manager-advanced-grid">
                    <div>
                        <h3>Manager Status</h3>

                        {Object.entries(status).map(([key, value]) => (
                            <div className="manager-detail-row" key={key}>
                                <span>{key}</span>
                                <strong>{formatValue(value)}</strong>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3>Manager Information</h3>

                        {Object.entries(info).map(([key, value]) => (
                            <div className="manager-detail-row" key={key}>
                                <span>{key}</span>
                                <strong>{formatValue(value)}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}