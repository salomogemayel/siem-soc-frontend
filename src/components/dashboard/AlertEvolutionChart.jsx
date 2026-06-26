import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip, // Alias agar tidak bentrok dengan komponen Tooltip Anda
    ResponsiveContainer,
} from "recharts";
import { Info } from "lucide-react"; // Import Info agar ikon muncul
import Tooltips from "../../components/Tooltip.jsx";

export default function AlertEvolutionChart({ data }) {
    return (
        <div className="h-full w-full">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-base font-semibold text-slate-900 m-0">
                    Alert Level Evolution
                </h3>
                <Tooltips content="Tren jumlah alert dari waktu ke waktu" icon={Info}>
                    <Info size={14} className="text-slate-400 cursor-help" />
                </Tooltips>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis allowDecimals={false} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="low" name="Rendah" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="medium" name="Sedang" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="high" name="Tinggi" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}