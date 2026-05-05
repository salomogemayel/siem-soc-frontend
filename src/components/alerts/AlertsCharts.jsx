import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function AlertsCharts({
                                         levelChartData,
                                         topAgentsData,
                                         mitreData,
                                     }) {
    return (
        <div className="charts-grid">
            <div className="chart-card wide">
                <h3>Alert level evolution</h3>

                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={levelChartData}>
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
                <h3>Top MITRE ATT&CKS</h3>

                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={mitreData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={70}
                            outerRadius={105}
                        >
                            {mitreData.map((_, index) => (
                                <Cell key={index} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>Top Agents</h3>

                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={topAgentsData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={70}
                            outerRadius={105}
                        >
                            {topAgentsData.map((_, index) => (
                                <Cell key={index} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card wide">
                <h3>Alerts evolution - Top agents</h3>

                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={levelChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="low" />
                        <Bar dataKey="medium" />
                        <Bar dataKey="high" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}