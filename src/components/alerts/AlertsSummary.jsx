import { useNavigate } from "react-router-dom";
import {
    ShieldAlert,
    OctagonAlert,
    TriangleAlert,
    Info,
} from "lucide-react";

import Tooltip from "../../components/Tooltip.jsx";

export default function AlertsSummary({ summary }) {
    const navigate = useNavigate();

    const handleNavigate = (severity) => {
        if (severity) {
            navigate(`/alerts-list?severity=${severity}`);
        } else {
            navigate("/alerts-list");
        }
    };

    const cards = [
        {
            title: "Total Alerts",
            value: summary.total,
            description: "Semua alert keamanan yang terdeteksi",
            icon: ShieldAlert,
            onClick: () => handleNavigate(""),
            iconClass: "bg-blue-50 text-blue-600",
        },
        {
            title: "High Alerts",
            value: summary.high,
            description: "Memerlukan peninjauan segera",
            icon: OctagonAlert,
            onClick: () => handleNavigate("high"),
            iconClass: "bg-red-50 text-red-600",
        },
        {
            title: "Medium Alerts",
            value: summary.medium,
            description: "Memerlukan korelasi dan pemantauan",
            icon: TriangleAlert,
            onClick: () => handleNavigate("medium"),
            iconClass: "bg-amber-50 text-amber-600",
        },
        {
            title: "Low Alerts",
            value: summary.low,
            description: "Aktivitas informatif atau minor",
            icon: Info,
            onClick: () => handleNavigate("low"),
            iconClass: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <div className="mb-[18px] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((item) => {
                const Icon = item.icon;

                return (
                    /* Tambahkan w-full agar tooltip mengisi penuh slot grid */
                    <Tooltip key={item.title} content={item.description} icon={Info}>
                        <button
                            type="button"
                            onClick={item.onClick}
                            /* w-full dan min-w-0 menjaga lebar tetap konsisten di dalam grid */
                            className="w-full min-w-0 flex items-start gap-3.5 rounded-[14px] border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-help"
                        >
                            <div className={`grid h-[44px] w-[44px] shrink-0 place-items-center rounded-xl ${item.iconClass}`}>
                                <Icon size={26} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <span className="text-sm font-medium text-slate-500 block truncate">
                                    {item.title}
                                </span>
                                <strong className="mt-1 block text-2xl font-bold text-slate-900 truncate">
                                    {item.value}
                                </strong>
                                <p className="m-0 mt-1 text-sm text-slate-500 truncate">
                                    {item.description}
                                </p>
                            </div>
                        </button>
                    </Tooltip>
                );
            })}
        </div>
    );
}