import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TopMitreTactics({ data }) {
    return (
        <div className="chart-card">
            <h3>Top MITRE Tactics</h3>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="count" name="Alerts" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}