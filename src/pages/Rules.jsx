import { useEffect, useMemo, useState } from "react";

import { getRules } from "../api/wazuhApi";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import RulesSummary from "../components/rules/RulesSummary";
import RulesToolbar from "../components/rules/RulesToolbar";
import RulesTable from "../components/rules/RulesTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20;

export default function Rules() {
    const [rules, setRules] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [level, setLevel] = useState("");
    const [group, setGroup] = useState("");

    const [ruleType, setRuleType] = useState('custom');

    const [expanded, setExpanded] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const normalizeLevel = (levelInput) => {
        if (!levelInput) return "";
        if (!isNaN(levelInput)) return String(levelInput);

        switch (levelInput.toLowerCase()) {
            case "critical": return "12";
            case "high": return "10";
            case "medium": return "5";
            case "low": return "0";
            default: return "";
        }
    };

    const loadRulesData = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getRules({
                page: page,
                size: PAGE_SIZE,
                search: search,
                level: normalizeLevel(level),
                group: group,
                ruleType: ruleType
            });

            if (response?.data?.success) {
                setRules(response.data.data.affected_items || []);
                setTotal(response.data.data.total_affected_items || 0);
            } else {
                setError(response?.data?.error || "Failed to load rules");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRulesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, fetchTrigger, ruleType]); // Tambahkan ruleType ke dependency

    const applySearch = () => {
        setExpanded(null);
        if (page === 1) {
            setFetchTrigger(prev => prev + 1);
        } else {
            setPage(1);
        }
    };

    const resetFilters = () => {
        setSearch("");
        setLevel("");
        setGroup("");
        setRuleType('custom'); // Reset ke custom
        setExpanded(null);

        if (page === 1) {
            setFetchTrigger(prev => prev + 1);
        } else {
            setPage(1);
        }
    };

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }, [page, totalPages]);

    if (loading && rules.length === 0) return <LoadingState message="Loading Wazuh rules..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="Wazuh Security Rules"
                description="Manage and inspect your custom and default security rules."
            />

            <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-xl">
                <button
                    onClick={() => setRuleType('custom')}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${ruleType === 'custom' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                >
                    Custom Rules
                </button>
                <button
                    onClick={() => setRuleType('all')}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${ruleType === 'all' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                >
                    Default Ruleset
                </button>
            </div>

            <RulesSummary total={total} displayed={rules.length} page={page} />

            <RulesToolbar
                search={search}
                setSearch={setSearch}
                level={level}
                setLevel={setLevel}
                group={group}
                setGroup={setGroup}
                setPage={setPage}
                onApply={applySearch}
                onReset={resetFilters}
            />

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm relative">
                {loading && rules.length > 0 && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[14px] bg-white/60 backdrop-blur-sm">
                        <span className="text-sm font-medium text-slate-700">Updating...</span>
                    </div>
                )}

                <RulesTable
                    rules={rules}
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
        </section>
    );
}