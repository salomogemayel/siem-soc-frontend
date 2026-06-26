import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import { Info } from "lucide-react";
import Tooltips from "../../components/Tooltip.jsx";

export default function TopMitreTactics({ data }) {
    return (
        <div className="h-full w-full">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-base font-semibold text-slate-900 m-0">Top MITRE Tactics</h3>
                <Tooltips content="Kategori taktik serangan MITRE ATT&CK" icon={Info}>
                    <Info size={14} className="text-slate-400 cursor-help" />
                </Tooltips>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <RechartsTooltip />
                    <Bar dataKey="count" name="Alert" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}