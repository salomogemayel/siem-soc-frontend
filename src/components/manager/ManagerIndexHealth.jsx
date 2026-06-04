import { Database } from "lucide-react";

export default function ManagerIndexHealth({ indices, metrics }) {
    const rows = [
        {
            name: "Alerts Index",
            index: "wazuh-alerts-*",
            available: indices.alerts?.available,
            count: metrics.alerts_last_24h,
            latest: indices.alerts?.latest_at,
        },
        {
            name: "Archives Index",
            index: "wazuh-archives-*",
            available: indices.archives?.available,
            count: metrics.logs_last_24h,
            latest: indices.archives?.latest_at,
        },
    ];

    return (
        <div className="card">
            <div className="manager-card-title">
                <Database size={20} />
                <h2>Index Health</h2>
            </div>

            <div className="manager-index-list">
                {rows.map((row) => (
                    <div className="manager-index-item" key={row.index}>
                        <div>
                            <strong>{row.name}</strong>
                            <span>{row.index}</span>
                        </div>

                        <div>
                            <span>Status</span>
                            <strong className={row.available ? "success" : "danger"}>
                                {row.available ? "Available" : "Unavailable"}
                            </strong>
                        </div>

                        <div>
                            <span>Last 24h</span>
                            <strong>{row.count ?? 0}</strong>
                        </div>

                        <div>
                            <span>Latest</span>
                            <strong>{row.latest || "-"}</strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}