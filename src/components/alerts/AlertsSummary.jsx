import { useNavigate } from "react-router-dom";
import {
    ShieldAlert,
    OctagonAlert,
    TriangleAlert,
    Info,
} from "lucide-react";

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
            description: "All detected security alerts",
            icon: ShieldAlert,
            onClick: () => handleNavigate(""),
            iconClass: "bg-blue-50 text-blue-600",
        },
        {
            title: "High Alerts",
            value: summary.high,
            description: "Requires immediate review",
            icon: OctagonAlert,
            onClick: () => handleNavigate("high"),
            iconClass: "bg-red-50 text-red-600",
        },
        {
            title: "Medium Alerts",
            value: summary.medium,
            description: "Needs correlation and monitoring",
            icon: TriangleAlert,
            onClick: () => handleNavigate("medium"),
            iconClass: "bg-amber-50 text-amber-600",
        },
        {
            title: "Low Alerts",
            value: summary.low,
            description: "Informational or minor activity",
            icon: Info,
            onClick: () => handleNavigate("low"),
            iconClass: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <div className="mb-[18px] grid grid-cols-1 gap-4 xl:grid-cols-4">
            {cards.map((item) => {
                const Icon = item.icon;

                return (
                    <button
                        key={item.title}
                        type="button"
                        onClick={item.onClick}
                        className="flex items-start gap-3.5 rounded-[14px] border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className={`grid h-[44px] w-[44px] shrink-0 place-items-center rounded-xl ${item.iconClass}`}>
                            <Icon size={26} />
                        </div>

                        <div>
                            <span className="text-sm font-medium text-slate-500">
                                {item.title}
                            </span>
                            <strong className="mt-1 block text-2xl font-bold text-slate-900">
                                {item.value}
                            </strong>
                            <p className="m-0 mt-1 text-sm text-slate-500">
                                {item.description}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}