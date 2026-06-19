import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getAlerts, getAgents } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import AlertsTabs from "../components/alerts/AlertsTabs";
import AlertsSummary from "../components/alerts/AlertsSummary";
import AlertsFilterBar from "../components/alerts/AlertsFilterBar";
import AlertsTable from "../components/alerts/AlertsTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20;
const MAX_RESULT_WINDOW = 100000;

const DEFAULT_SUMMARY = {
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
};

export default function AlertsList() {
    const [searchParams] = useSearchParams();

    const [alerts, setAlerts] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const [summary, setSummary] = useState(DEFAULT_SUMMARY);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("");
    const [levelValue, setLevelValue] = useState("");

    const [timeRange, setTimeRange] = useState("24h");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [agent, setAgent] = useState("");
    const [agentOptions, setAgentOptions] = useState([]);

    const [ruleId, setRuleId] = useState("");
    const [group, setGroup] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const maxAccessiblePages = Math.floor(MAX_RESULT_WINDOW / PAGE_SIZE);

    const totalPages = Math.min(
        Math.ceil(total / PAGE_SIZE),
        maxAccessiblePages
    );

    const buildLevelParam = (
        selectedSeverity = severity,
        selectedLevelValue = levelValue
    ) => {
        if (selectedSeverity === "low") return "low";
        if (selectedSeverity === "medium") return "medium";
        if (selectedSeverity === "high") return "high";
        if (selectedSeverity === "critical") return "gte:12";

        if (selectedSeverity === "custom" && selectedLevelValue !== "") {
            return `exact:${selectedLevelValue}`;
        }

        return "";
    };

    const applyUrlParamsToState = () => {
        const urlSearch = searchParams.get("search") || "";
        const urlSeverity = searchParams.get("severity") || "";
        const urlLevel = searchParams.get("level") || "";
        const urlRuleId =
            searchParams.get("rule_id") || searchParams.get("ruleId") || "";
        const urlAgent = searchParams.get("agent") || "";
        const urlGroup = searchParams.get("group") || "";

        setSearch(urlSearch);
        setRuleId(urlRuleId);
        setAgent(urlAgent);
        setGroup(urlGroup);

        if (urlSeverity) {
            setSeverity(urlSeverity);
            setLevelValue("");
            return;
        }

        if (urlLevel === "high" || urlLevel === "medium" || urlLevel === "low") {
            setSeverity(urlLevel);
            setLevelValue("");
            return;
        }

        if (urlLevel === "gte:12") {
            setSeverity("critical");
            setLevelValue("");
            return;
        }

        if (urlLevel.startsWith("exact:")) {
            setSeverity("custom");
            setLevelValue(urlLevel.replace("exact:", ""));
            return;
        }

        setSeverity("");
        setLevelValue("");
    };

    const fetchAgentOptions = async () => {
        try {
            const response = await getAgents({
                page: 1,
                size: 100,
                search: "",
                status: "",
            });

            const items = response.data?.data?.affected_items || [];

            setAgentOptions(
                items.map((agent) => ({
                    id: agent.id,
                    name: agent.name || agent.ip || "Unknown Agent",
                }))
            );
        } catch (err) {
            console.error("Failed to load agent options");
        }
    };

    const fetchAlerts = async (overrides = {}) => {
        setLoading(true);
        setError("");

        const selectedPage = overrides.page ?? page;
        const selectedSearch = overrides.search ?? search;
        const selectedSeverity = overrides.severity ?? severity;
        const selectedLevelValue = overrides.levelValue ?? levelValue;

        const selectedTimeRange = overrides.timeRange ?? timeRange;
        const selectedDateFrom = overrides.dateFrom ?? dateFrom;
        const selectedDateTo = overrides.dateTo ?? dateTo;

        const selectedLevel =
            overrides.level ?? buildLevelParam(selectedSeverity, selectedLevelValue);

        const params = {
            page: selectedPage,
            size: PAGE_SIZE,
            level: selectedLevel,
            search: selectedSearch,
            agent: overrides.agent ?? agent,
            ruleId: overrides.ruleId ?? ruleId,
            group: overrides.group ?? group,
            timeRange: selectedTimeRange,
            dateFrom:
                selectedTimeRange === "custom" && selectedDateFrom
                    ? new Date(selectedDateFrom).toISOString()
                    : "",
            dateTo:
                selectedTimeRange === "custom" && selectedDateTo
                    ? new Date(selectedDateTo).toISOString()
                    : "",
        };

        try {
            const response = await getAlerts(params);

            if (response.data.success) {
                setAlerts(response.data.data || []);
                setTotal(response.data.total || 0);
                setSummary(response.data.summary || DEFAULT_SUMMARY);
            } else {
                setError(response.data.error || "Failed to load alerts");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchAgentOptions();
    }, []);

    useEffect(() => {
        applyUrlParamsToState();

        const urlSearch = searchParams.get("search") || "";
        const urlSeverity = searchParams.get("severity") || "";
        const urlLevel = searchParams.get("level") || "";
        const urlRuleId =
            searchParams.get("rule_id") || searchParams.get("ruleId") || "";
        const urlAgent = searchParams.get("agent") || "";
        const urlGroup = searchParams.get("group") || "";

        let selectedSeverity = urlSeverity;
        let selectedLevelValue = "";
        let selectedLevel = urlLevel;

        if (!urlLevel && urlSeverity) {
            selectedLevel = urlSeverity;
        }

        if (urlLevel === "gte:12") {
            selectedSeverity = "critical";
        }

        if (urlLevel.startsWith("exact:")) {
            selectedSeverity = "custom";
            selectedLevelValue = urlLevel.replace("exact:", "");
        }

        setPage(1);

        void fetchAlerts({
            page: 1,
            search: urlSearch,
            severity: selectedSeverity,
            levelValue: selectedLevelValue,
            level: selectedLevel,
            ruleId: urlRuleId,
            agent: urlAgent,
            group: urlGroup,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    useEffect(() => {
        if (page !== 1) {
            void fetchAlerts();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const applySearch = () => {
        if (timeRange === "custom" && (!dateFrom || !dateTo)) {
            setError("Please select both From and To date for custom range.");
            return;
        }

        setPage(1);

        void fetchAlerts({
            page: 1,
            search,
            severity,
            levelValue,
            agent,
            ruleId,
            group,
            timeRange,
            dateFrom,
            dateTo,
        });
    };

    const resetFilters = () => {
        setSearch("");
        setSeverity("");
        setLevelValue("");
        setTimeRange("24h");
        setDateFrom("");
        setDateTo("");
        setAgent("");
        setRuleId("");
        setGroup("");
        setPage(1);

        void fetchAlerts({
            page: 1,
            level: "",
            search: "",
            agent: "",
            ruleId: "",
            group: "",
            timeRange: "24h",
            dateFrom: "",
            dateTo: "",
        });
    };

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }, [page, totalPages]);

    if (loading) return <LoadingState message="Loading alerts..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <PageHeader
                title="Security Alerts"
                description="Monitor detected security alerts from Wazuh Indexer."
            />

            <AlertsTabs />

            <AlertsSummary summary={summary} />

            <div className="card alert-explorer-card">
                <AlertsFilterBar
                    search={search}
                    setSearch={setSearch}
                    severity={severity}
                    setSeverity={setSeverity}
                    levelValue={levelValue}
                    setLevelValue={setLevelValue}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    dateFrom={dateFrom}
                    setDateFrom={setDateFrom}
                    dateTo={dateTo}
                    setDateTo={setDateTo}
                    agent={agent}
                    setAgent={setAgent}
                    agentOptions={agentOptions}
                    ruleId={ruleId}
                    setRuleId={setRuleId}
                    group={group}
                    setGroup={setGroup}
                    onApply={applySearch}
                    onReset={resetFilters}
                />

                <AlertsTable
                    alerts={alerts}
                    expanded={expanded}
                    setExpanded={setExpanded}
                />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={pageNumbers}
                    setPage={setPage}
                />
            </div>
        </>
    );
}