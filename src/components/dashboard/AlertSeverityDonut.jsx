import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AlertSeverityDonut({ high, medium, low }) {
    const data = [
        { name: "High", value: high, color: "#ef4444" },
        { name: "Medium", value: medium, color: "#f59e0b" },
        { name: "Low", value: low, color: "#3b82f6" },
    ].filter((item) => item.value > 0);

    return (
        <div className="chart-card">
            <h3>Severity Distribution</h3>

            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}