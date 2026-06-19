import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AlertEvolutionChart({ data }) {
    return (
        <div className="h-full w-full">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
                Alert Level Evolution
            </h3>

            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="low" name="Low" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="medium" name="Medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="high" name="High" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}