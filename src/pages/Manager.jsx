import { useEffect, useState } from "react";

import { getManager } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import ManagerHealthOverview from "../components/manager/ManagerHealthOverview";
import ManagerPipelineStatus from "../components/manager/ManagerPipelineStatus";
import ManagerIndexHealth from "../components/manager/ManagerIndexHealth";
import ManagerAgentSummary from "../components/manager/ManagerAgentSummary";
import ManagerRecentActivity from "../components/manager/ManagerRecentActivity";
import ManagerAdvancedDetails from "../components/manager/ManagerAdvancedDetails";

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

    const status = manager?.status || {};
    const info = manager?.info || {};
    const health = manager?.health || {};
    const metrics = manager?.metrics || {};
    const latest = manager?.latest || {};
    const indices = manager?.indices || {};

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="SIEM Health Center"
                description="Monitor Wazuh infrastructure, data pipeline, index health, and agent connectivity."
            />

            {/*<ManagerHealthOverview health={health} latest={latest} />*/}

            <ManagerPipelineStatus health={health} />

            <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-12">
                <div className="xl:col-span-7">
                    <ManagerIndexHealth indices={indices} metrics={metrics} />
                </div>

                <div className="xl:col-span-5">
                    <ManagerAgentSummary metrics={metrics} />
                </div>
            </div>

            <ManagerRecentActivity latest={latest} metrics={metrics} />

            <ManagerAdvancedDetails status={status} info={info} />
        </section>
    );
}