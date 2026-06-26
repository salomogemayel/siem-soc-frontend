import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Info } from "lucide-react";
import Tooltips from "../../components/Tooltip.jsx";

export default function AttackTypeChart({ data = [] }) {
    return (
        <div className="h-full w-full">
            <div className="mb-4 flex items-center gap-2">
                <h3 className="m-0 text-base font-semibold text-slate-900">
                    Attack Distribution
                </h3>
                <Tooltips content="Kategori serangan yang paling banyak terdeteksi saat ini" icon={Info}>
                    <Info size={14} className="text-slate-400 cursor-help" />
                </Tooltips>
            </div>

            {data.length === 0 ? (
                <div className="grid h-[260px] place-items-center rounded-xl bg-slate-50 text-sm text-slate-500">
                    Data serangan tidak tersedia.
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
                        <RechartsTooltip />
                        <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}