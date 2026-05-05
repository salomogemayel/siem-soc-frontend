import { useEffect, useState } from "react";

import { getManager } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import ManagerSummary from "../components/manager/ManagerSummary";
import ManagerStatusList from "../components/manager/ManagerStatusList";
import ManagerInfoList from "../components/manager/ManagerInfoList";
import ManagerHealthCard from "../components/manager/ManagerHealthCard";

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
                setError("Failed to load manager information");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManager();
    }, []);

    if (loading) return <LoadingState message="Loading manager information..." />;
    if (error) return <ErrorState message={error} />;

    const status = manager?.status || {};
    const info = manager?.info || {};

    return (
        <>
            <PageHeader
                title="Wazuh Manager"
                description=""
            />

            <ManagerSummary info={info} />

            <div className="manager-content-grid">
                <ManagerStatusList status={status} />
                <ManagerInfoList info={info} />
            </div>

            <ManagerHealthCard onRefresh={fetchManager} />
        </>
    );
}