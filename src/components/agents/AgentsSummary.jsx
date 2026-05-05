import { Server, CheckCircle, WifiOff } from "lucide-react";

export default function AgentsSummary({ total, active, disconnected }) {
    return (
        <div className="agents-summary-grid">
            <div className="agents-summary-card">
                <Server size={24} />
                <div>
                    <span>Total Agents</span>
                    <strong>{total}</strong>
                </div>
            </div>

            <div className="agents-summary-card success">
                <CheckCircle size={24} />
                <div>
                    <span>Active</span>
                    <strong>{active}</strong>
                </div>
            </div>

            <div className="agents-summary-card danger">
                <WifiOff size={24} />
                <div>
                    <span>Disconnected</span>
                    <strong>{disconnected}</strong>
                </div>
            </div>
        </div>
    );
}