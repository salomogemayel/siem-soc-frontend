import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import Tooltip from "../../components/Tooltip.jsx";
import { Info } from "lucide-react";

export default function AlertSeverityDonut({ high, medium, low }) {
    const data = [
        { name: "Tinggi", value: high, color: "#ef4444" },
        { name: "Sedang", value: medium, color: "#f59e0b" },
        { name: "Rendah", value: low, color: "#3b82f6" },
    ].filter((item) => item.value > 0);

    return (
        <div className="h-full w-full">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-base font-semibold text-slate-900 m-0">Alert Severity Distribusi</h3>
                <Tooltip content="Persentase ancaman berdasarkan level alert Wazuh" icon={Info}>
                    <Info size={14} className="text-slate-400 cursor-help" />
                </Tooltip>
            </div>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <RechartsTooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}