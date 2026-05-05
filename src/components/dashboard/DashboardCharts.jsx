import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function DashboardCharts({ alertEvolutionData, topAgentsData }) {
    return (
        <div className="dashboard-grid">
            <div className="chart-card wide">
                <h3>Alert Level Evolution</h3>

                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={alertEvolutionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="low" stackId="1" />
                        <Area type="monotone" dataKey="medium" stackId="1" />
                        <Area type="monotone" dataKey="high" stackId="1" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>Top Alert Agents</h3>

                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={topAgentsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="alerts" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}