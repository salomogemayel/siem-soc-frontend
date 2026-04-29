import { useEffect, useState } from "react";
import { getRules } from "../api/wazuhApi";

export default function Rules() {
    const [rules, setRules] = useState([]);
    const [totalRules, setTotalRules] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await getRules();

                if (response.data.success) {
                    setRules(response.data.data.affected_items || []);
                    setTotalRules(response.data.data.total_affected_items || 0);
                } else {
                    setError(response.data.error || "Failed to load rules");
                }
            } catch (err) {
                setError("Cannot connect to Laravel backend API");
            } finally {
                setLoading(false);
            }
        };

        fetchRules();
    }, []);

    if (loading) return <p>Loading rules...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Wazuh Security Rules</h1>

            <p>
                Total Rules: <strong>{totalRules}</strong>
            </p>

            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Rule ID</th>
                    <th>Level</th>
                    <th>Description</th>
                    <th>Groups</th>
                </tr>
                </thead>

                <tbody>
                {rules.map((rule) => (
                    <tr key={rule.id}>
                        <td>#{rule.id}</td>
                        <td>{rule.level ?? 0}</td>
                        <td>{rule.description ?? "No description"}</td>
                        <td>
                            {rule.groups && rule.groups.length > 0
                                ? rule.groups.join(", ")
                                : "N/A"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}