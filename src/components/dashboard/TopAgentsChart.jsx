import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TopAgentsChart({ data }) {
    return (
        <div className="chart-card">
            <h3>Top Alert Agents</h3>

            {(!data || data.length === 0) ? (
                <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p>No agent data available.</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        {/* You can change this hex to var(--your-css-variable) if you have one! */}
                        <Bar dataKey="alerts" name="Total Alerts" fill="#1e293b" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}