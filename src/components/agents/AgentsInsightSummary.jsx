import { Activity, AlertTriangle, Clock, ShieldCheck } from "lucide-react";

export default function AgentsInsightSummary({
                                                 active,
                                                 atRisk,
                                                 alerts24h,
                                                 latestData,
                                             }) {
    return (
        <div className="agents-insight-grid">
            <div className="agents-insight-card success">
                <ShieldCheck size={22} />
                <div>
                    <span>Active Agents</span>
                    <strong>{active}</strong>
                    <p>Currently sending data</p>
                </div>
            </div>

            <div className="agents-insight-card danger">
                <AlertTriangle size={22} />
                <div>
                    <span>At-Risk Agents</span>
                    <strong>{atRisk}</strong>
                    <p>Disconnected or suspicious activity</p>
                </div>
            </div>

            <div className="agents-insight-card warning">
                <Activity size={22} />
                <div>
                    <span>Alerts 24h</span>
                    <strong>{alerts24h}</strong>
                    <p>Detected from all endpoints</p>
                </div>
            </div>

            <div className="agents-insight-card">
                <Clock size={22} />
                <div>
                    <span>Latest Data</span>
                    <strong className="agent-insight-date">{latestData || "-"}</strong>
                    <p>Most recent alert or log</p>
                </div>
            </div>
        </div>
    );
}