import { CheckCircle, CircleAlert, CircleMinus } from "lucide-react";

function StatusIcon({ status }) {
    if (status === "online" || status === "connected" || status === "receiving") {
        return <CheckCircle size={20} />;
    }

    if (status === "idle") {
        return <CircleMinus size={20} />;
    }

    return <CircleAlert size={20} />;
}

function statusClass(status) {
    if (status === "online" || status === "connected" || status === "receiving") {
        return {
            icon: "bg-emerald-50 text-emerald-600",
            text: "text-emerald-700",
        };
    }

    if (status === "idle") {
        return {
            icon: "bg-amber-50 text-amber-600",
            text: "text-amber-700",
        };
    }

    return {
        icon: "bg-red-50 text-red-600",
        text: "text-red-700",
    };
}

export default function ManagerPipelineStatus({ health }) {
    const steps = [
        {
            label: "Wazuh Manager",
            status: health.manager_api || "unknown",
            description: "Receives events from agents",
        },
        {
            label: "Wazuh Indexer",
            status: health.indexer || "unknown",
            description: "Stores alerts and logs",
        },
        {
            label: "Alerts Index",
            status: health.alerts_pipeline || "unknown",
            description: "wazuh-alerts-*",
        },
        {
            label: "Archives Index",
            status: health.logs_pipeline || "unknown",
            description: "wazuh-archives-*",
        },
        {
            label: "SOC Dashboard",
            status: "online",
            description: "Laravel API and React UI",
        },
    ];

    return (
        <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="m-0 text-lg font-semibold text-slate-900">
                Data Pipeline Status
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-5">
                {steps.map((step, index) => {
                    const style = statusClass(step.status);

                    return (
                        <div key={step.label} className="relative">
                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${style.icon}`}>
                                    <StatusIcon status={step.status} />
                                </div>

                                <strong className="block text-sm font-semibold text-slate-900">
                                    {step.label}
                                </strong>
                                <span className="mt-1 block text-xs text-slate-500">
                                    {step.description}
                                </span>
                                <small className={`mt-2 block text-xs font-bold uppercase ${style.text}`}>
                                    {step.status}
                                </small>
                            </div>

                            {index !== steps.length - 1 && (
                                <div className="absolute left-full top-1/2 hidden h-px w-4 bg-slate-200 xl:block" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}