import { useEffect, useMemo, useState } from "react";

import { getLogFilters, getLogs } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import LogsSummary from "../components/logs/LogsSummary";
import LogsFilterBar from "../components/logs/LogsFilterBar";
import LogsTable from "../components/logs/LogsTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20;

const DEFAULT_INSIGHTS = {
    alert_generated: 0,
    raw_only: 0,
    top_source: "-",
    top_source_count: 0,
    top_decoder: "-",
    top_decoder_count: 0,
    top_program: "-",
    top_program_count: 0,
};

export default function Logs() {
    const [totalRelation, setTotalRelation] = useState("eq");
    const [logInsights, setLogInsights] = useState(DEFAULT_INSIGHTS);

    const [logs, setLogs] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");
    const [agentId, setAgentId] = useState("");
    const [location, setLocation] = useState("");
    const [decoder, setDecoder] = useState("");
    const [program, setProgram] = useState("");
    const [timeRange, setTimeRange] = useState("1h");
    const [viewMode, setViewMode] = useState("simple");

    const [filterOptions, setFilterOptions] = useState({
        agents: [],
        locations: [],
        decoders: [],
        programs: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const fetchLogs = async (overrides = {}) => {
        setLoading(true);
        setError("");

        const selectedTimeRange = overrides.timeRange ?? timeRange;
        const selectedDateFrom = overrides.dateFrom ?? dateFrom;
        const selectedDateTo = overrides.dateTo ?? dateTo;

        const params = {
            page,
            size: PAGE_SIZE,
            search,
            agentId,
            location,
            decoder,
            program,
            timeRange: selectedTimeRange,
            dateFrom:
                selectedTimeRange === "custom" && selectedDateFrom
                    ? new Date(selectedDateFrom).toISOString()
                    : "",
            dateTo:
                selectedTimeRange === "custom" && selectedDateTo
                    ? new Date(selectedDateTo).toISOString()
                    : "",
            ...overrides,
        };

        try {
            const response = await getLogs(params);

            if (response.data.success) {
                setLogs(response.data.data || []);
                setTotal(response.data.total || 0);
                setTotalRelation(response.data.total_relation || "eq");
                setLogInsights(response.data.insights || DEFAULT_INSIGHTS);
            } else {
                setError(response.data.error || "Failed to load logs");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    const fetchFilters = async () => {
        try {
            const response = await getLogFilters();

            if (response.data.success) {
                setFilterOptions(response.data.data);
            }
        } catch (err) {
            console.error("Failed to load log filters");
        }
    };

    useEffect(() => {
        void fetchFilters();
    }, []);

    useEffect(() => {
        void fetchLogs();
    }, [page]);
    const applySearch = () => {
        if (timeRange === "custom" && (!dateFrom || !dateTo)) {
            setError("Please select both From and To date for custom range.");
            return;
        }

        setPage(1);

        fetchLogs({
            page: 1,
            timeRange,
            dateFrom,
            dateTo,
        });
    };

    const resetFilters = () => {
        setPage(1);
        setSearch("");
        setAgentId("");
        setLocation("");
        setDecoder("");
        setProgram("");
        setTimeRange("1h");
        setDateFrom("");
        setDateTo("");

        fetchLogs({
            page: 1,
            search: "",
            agentId: "",
            location: "",
            decoder: "",
            program: "",
            timeRange: "1h",
            dateFrom: "",
            dateTo: "",
        });
    };

    const handleQuickFilter = (type) => {
        setPage(1);

        if (type === "auth") {
            setLocation("/var/log/auth.log");
            setProgram("");
            setDecoder("");
            fetchLogs({ page: 1, location: "/var/log/auth.log", program: "", decoder: "" });
        }

        if (type === "sudo") {
            setProgram("sudo");
            setLocation("");
            setDecoder("");
            fetchLogs({ page: 1, program: "sudo", location: "", decoder: "" });
        }

        if (type === "system") {
            setProgram("systemd");
            setLocation("");
            setDecoder("");
            fetchLogs({ page: 1, program: "systemd", location: "", decoder: "" });
        }

        if (type === "rootcheck") {
            setLocation("rootcheck");
            setProgram("");
            setDecoder("");
            fetchLogs({ page: 1, location: "rootcheck", program: "", decoder: "" });
        }

        if (type === "alerts") {
            setSearch("rule");
            fetchLogs({ page: 1, search: "rule" });
        }
    };

    const exportCSV = () => {
        const headers = [
            "timestamp",
            "agent_id",
            "agent_name",
            "location",
            "program_name",
            "decoder",
            "srcip",
            "srcuser",
            "full_log",
        ];

        const rows = logs.map((log) =>
            headers
                .map((key) => `"${String(log[key] ?? "").replace(/"/g, '""')}"`)
                .join(",")
        );

        const csv = [headers.join(","), ...rows].join("\n");

        downloadFile(csv, "wazuh-logs.csv", "text/csv");
    };

    const exportJSON = () => {
        downloadFile(
            JSON.stringify(logs, null, 2),
            "wazuh-logs.json",
            "application/json"
        );
    };

    const downloadFile = (content, filename, type) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
    };

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;
        const safeTotalPages = Math.min(totalPages, 500);

        let start = Math.max(1, page - 2);
        let end = Math.min(safeTotalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }, [page, totalPages]);

    if (loading) return <LoadingState message="Loading raw logs..." />;
    if (error) return <ErrorState message={error} />;

    const totalLabel =
        totalRelation === "gte" ? `${total.toLocaleString()}+` : total.toLocaleString();

    const maxAccessiblePages = Math.ceil(total / PAGE_SIZE);
    const paginationTotalPages = Math.min(totalPages, maxAccessiblePages || 1);

    return (
        <>
            <PageHeader
                title="Raw Logs"
                description="Explore raw security logs collected and archived by Wazuh."
            />

            <LogsSummary insights={logInsights} />

            <LogsFilterBar
                search={search}
                setSearch={setSearch}
                agentId={agentId}
                setAgentId={setAgentId}
                location={location}
                setLocation={setLocation}
                decoder={decoder}
                setDecoder={setDecoder}
                program={program}
                setProgram={setProgram}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                dateFrom={dateFrom}
                setDateFrom={setDateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                viewMode={viewMode}
                setViewMode={setViewMode}
                filterOptions={filterOptions}
                setPage={setPage}
                onApply={applySearch}
                onReset={resetFilters}
                onQuickFilter={handleQuickFilter}
                onExportCSV={exportCSV}
                onExportJSON={exportJSON}
            />

            <div className="card">
                <LogsTable
                    logs={logs}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    search={search}
                    viewMode={viewMode}
                />

                <div className="logs-pagination-footer">
                    <Pagination
                        page={page}
                        totalPages={paginationTotalPages}
                        pageNumbers={pageNumbers}
                        setPage={setPage}
                    />

                    <div className="logs-pagination-info">
                        Showing <strong>{logs.length}</strong> logs • Total{" "}
                        <strong>{totalLabel}</strong> • Page{" "}
                        <strong>{page}</strong> of <strong>{paginationTotalPages || 1}</strong>
                    </div>
                </div>
            </div>
        </>
    );
}