import { CheckCircle } from "lucide-react";

export default function ManagerHealthMini({ manager, onRefresh }) {
    return (
        <div className="card manager-mini-card">
            <h2>Manager Health</h2>

            <div className="manager-health-status">
                <div className="manager-health-icon">
                    <CheckCircle size={28} />
                </div>

                <div>
                    <strong>{manager ? "Connected" : "Unknown"}</strong>
                    <p>Laravel backend can communicate with Wazuh Manager API.</p>
                </div>
            </div>

            <div className="manager-mini-list">
                <div>
                    <span>Version</span>
                    <strong>{manager?.info?.version || "-"}</strong>
                </div>

                <div>
                    <span>Node</span>
                    <strong>{manager?.info?.node_name || manager?.info?.name || "-"}</strong>
                </div>

                <div>
                    <span>Type</span>
                    <strong>{manager?.info?.type || "Manager"}</strong>
                </div>
            </div>

            <button onClick={onRefresh}>Refresh Dashboard</button>
        </div>
    );
}