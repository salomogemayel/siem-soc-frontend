import { Activity } from "lucide-react";

export default function ManagerHealthCard({ onRefresh }) {
    return (
        <div className="card manager-health-card">
            <div>
                <Activity size={24} />
                <h2>Service Health</h2>
                <p>
                    This section confirms that Laravel can communicate with the Wazuh
                    Manager API successfully.
                </p>
            </div>

            <button onClick={onRefresh}>Refresh Status</button>
        </div>
    );
}