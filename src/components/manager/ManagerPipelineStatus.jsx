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
        return "success";
    }

    if (status === "idle") {
        return "warning";
    }

    return "danger";
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
        <div className="card manager-pipeline-card">
            <h2>Data Pipeline Status</h2>
            <p>Agent data flow from Wazuh into your custom SOC dashboard.</p>

            <div className="pipeline-steps">
                {steps.map((step, index) => (
                    <div className="pipeline-step" key={step.label}>
                        <div className={`pipeline-icon ${statusClass(step.status)}`}>
                            <StatusIcon status={step.status} />
                        </div>

                        <div>
                            <strong>{step.label}</strong>
                            <span>{step.description}</span>
                            <small className={statusClass(step.status)}>{step.status}</small>
                        </div>

                        {index !== steps.length - 1 && <div className="pipeline-line" />}
                    </div>
                ))}
            </div>
        </div>
    );
}