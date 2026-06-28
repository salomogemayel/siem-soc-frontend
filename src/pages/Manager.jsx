import { useEffect, useState } from "react";

import { getManager } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import ManagerPipelineStatus from "../components/manager/ManagerPipelineStatus";
import ManagerIndexHealth from "../components/manager/ManagerIndexHealth";
import ManagerAgentSummary from "../components/manager/ManagerAgentSummary";

export default function Manager() {
    const [manager, setManager] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchManager = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getManager();

            if (response.data.success) {
                setManager(response.data.data);
            } else {
                setError("Failed to load SIEM health information");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchManager();
    }, []);

    if (loading) {
        return <LoadingState message="Loading SIEM health information..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    const health = manager?.health || {};
    const metrics = manager?.metrics || {};
    const indices = manager?.indices || {};

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="SIEM Health and Connectivity"
            />


            <ManagerPipelineStatus health={health} />

            <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-12">
                <div className="xl:col-span-7">
                    <ManagerIndexHealth indices={indices} metrics={metrics} />
                </div>

                <div className="xl:col-span-5">
                    <ManagerAgentSummary metrics={metrics} />
                </div>
            </div>

        </section>
    );
}