import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function AttackTypeChart({ data = [] }) {
    return (
        <div className="h-full w-full">
            <div className="mb-4">
                <h3 className="m-0 text-base font-semibold text-slate-900">
                    Distribusi Serangan
                </h3>
            </div>

            {data.length === 0 ? (
                <div className="grid h-[260px] place-items-center rounded-xl bg-slate-50 text-sm text-slate-500">
                    No attack data available.
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 24, left: 32, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" allowDecimals={false} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={140}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip />
                        <Bar dataKey="count" radius={[0, 8, 8, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}