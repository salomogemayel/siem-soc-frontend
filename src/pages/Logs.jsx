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
    const [logs, setLogs] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalRelation, setTotalRelation] = useState("eq");

    const [search, setSearch] = useState("");
    const [agentId, setAgentId] = useState("");
    const [location, setLocation] = useState("");
    const [decoder, setDecoder] = useState("");
    const [program, setProgram] = useState("");
    const [timeRange, setTimeRange] = useState("1h");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [logType, setLogType] = useState("");
    const [logScope, setLogScope] = useState("cis");
    const [viewMode, setViewMode] = useState("simple");

    const [logInsights, setLogInsights] = useState(DEFAULT_INSIGHTS);
    const [filterOptions, setFilterOptions] = useState({
        agents: [],
        locations: [],
        decoders: [],
        programs: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const fetchLogs = async (overrides = {}) => {
        setLoading(true);
        setError("");

        const selectedPage = overrides.page ?? page;
        const selectedTimeRange = overrides.timeRange ?? timeRange;
        const selectedDateFrom = overrides.dateFrom ?? dateFrom;
        const selectedDateTo = overrides.dateTo ?? dateTo;

        const params = {
            page: selectedPage,
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
            logType,
            logScope,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, logScope]);

    const changeLogScope = (scope) => {
        setLogScope(scope);
        setExpanded(null);

        if (page !== 1) {
            setPage(1);
        }
    };

    const applySearch = () => {
        if (timeRange === "custom" && (!dateFrom || !dateTo)) {
            setError("Please select both From and To date for custom range.");
            return;
        }

        setExpanded(null);

        if (page === 1) {
            fetchLogs({
                page: 1,
                timeRange,
                dateFrom,
                dateTo,
            });
        } else {
            setPage(1);
        }
    };

    const resetFilters = () => {
        setSearch("");
        setAgentId("");
        setLocation("");
        setDecoder("");
        setProgram("");
        setTimeRange("1h");
        setDateFrom("");
        setDateTo("");
        setLogType("");
        setViewMode("simple");
        setExpanded(null);

        if (page === 1) {
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
                logType: "",
                viewMode: "simple",
            });
        } else {
            setPage(1);
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

    if (loading && logs.length === 0) {
        return <LoadingState message="Loading raw logs..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    const totalLabel =
        totalRelation === "gte" ? `${total.toLocaleString()}+` : total.toLocaleString();

    const maxAccessiblePages = Math.ceil(total / PAGE_SIZE);
    const paginationTotalPages = Math.min(totalPages, maxAccessiblePages || 1);

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="Raw Logs"
            />

            <div className="flex w-fit gap-1 rounded-xl bg-slate-100 p-1">
                <button
                    type="button"
                    onClick={() => changeLogScope("cis")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                        logScope === "cis"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    CIS Logs
                </button>

                <button
                    type="button"
                    onClick={() => changeLogScope("other")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                        logScope === "other"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    Other Logs
                </button>
            </div>
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
                logType={logType}
                setLogType={setLogType}
                viewMode={viewMode}
                setViewMode={setViewMode}
                filterOptions={filterOptions}
                setPage={setPage}
                onApply={applySearch}
                onReset={resetFilters}
                onExportCSV={exportCSV}
                onExportJSON={exportJSON}
            />

            <div className="relative rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
                {loading && logs.length > 0 && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[14px] bg-white/60 backdrop-blur-sm">
                        <span className="text-sm font-medium text-slate-700">
                            Updating...
                        </span>
                    </div>
                )}

                <LogsTable
                    logs={logs}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    search={search}
                    viewMode={viewMode}
                />

                <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 lg:flex-row lg:items-center lg:justify-between">
                    <Pagination
                        page={page}
                        totalPages={paginationTotalPages}
                        pageNumbers={pageNumbers}
                        setPage={setPage}
                    />

                    <div className="text-sm text-slate-500">
                        Showing{" "}
                        <strong className="text-slate-900">{logs.length}</strong>{" "}
                        logs • Total{" "}
                        <strong className="text-slate-900">{totalLabel}</strong>{" "}
                        • Page{" "}
                        <strong className="text-slate-900">{page}</strong> of{" "}
                        <strong className="text-slate-900">
                            {paginationTotalPages || 1}
                        </strong>
                    </div>
                </div>
            </div>
        </section>
    );
}