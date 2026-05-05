import { CheckCircle, Server, Shield, Database } from "lucide-react";

export default function ManagerSummary({ info }) {
    return (
        <div className="manager-summary-grid">
            <div className="manager-card">
                <div className="manager-icon success">
                    <CheckCircle size={22} />
                </div>
                <div>
                    <span>Status</span>
                    <strong>Online</strong>
                </div>
            </div>

            <div className="manager-card">
                <div className="manager-icon">
                    <Shield size={22} />
                </div>
                <div>
                    <span>Version</span>
                    <strong>{info.version || "-"}</strong>
                </div>
            </div>

            <div className="manager-card">
                <div className="manager-icon">
                    <Server size={22} />
                </div>
                <div>
                    <span>Node Name</span>
                    <strong>{info.node_name || info.name || "-"}</strong>
                </div>
            </div>

            <div className="manager-card">
                <div className="manager-icon">
                    <Database size={22} />
                </div>
                <div>
                    <span>Type</span>
                    <strong>{info.type || "Manager"}</strong>
                </div>
            </div>
        </div>
    );
}