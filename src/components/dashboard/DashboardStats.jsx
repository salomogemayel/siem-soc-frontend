import {
    Activity,
    AlertTriangle,
    Radar,
    ShieldAlert,
    Info,
} from "lucide-react";

import Tooltip from "../../components/Tooltip.jsx";

export default function DashboardStats({
                                           totalAlerts = 0,
                                           highAlerts = 0,
                                           attackTypeCount = 0,
                                           totalAgents = 0,
                                           activeAgents = 0,
                                       }) {
    const stats = [
        {
            title: "Total Alerts",
            value: totalAlerts,
            description: "Alert keamanan yang terkumpul dari Wazuh Indexer",
            icon: ShieldAlert,
        },
        {
            title: "High Risk Alerts",
            value: highAlerts,
            description: "Alert dengan tingkat keparahan tinggi",
            icon: AlertTriangle,
        },
        {
            title: "Attack Types",
            value: attackTypeCount,
            description: "Kategori serangan yang terdeteksi pada data saat ini",
            icon: Radar,
        },
        {
            title: "Active Agents",
            value: `${activeAgents}/${totalAgents}`,
            description: "Agen Wazuh aktif yang sedang dipantau",
            icon: Activity,
        },
    ];

    return (
        <div className="mb-[18px] grid grid-cols-1 gap-4 xl:grid-cols-4">
            {stats.map((item) => {
                const Icon = item.icon;
                return (
                    <Tooltip key={item.title} content={item.description} icon={Info}>
                        <div className="flex items-start gap-3.5 rounded-[14px] border border-slate-100 bg-white p-3.5 shadow-sm cursor-help transition-all hover:border-blue-200">
                            <div className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px] bg-blue-50 text-blue-600">
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="m-0 text-sm text-slate-500">{item.title}</p>
                                <h2 className="my-1.5 text-2xl font-bold text-slate-900">{item.value}</h2>
                                <p className="m-0 text-sm text-slate-500 truncate max-w-[150px]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </Tooltip>
                );
            })}
        </div>
    );
}