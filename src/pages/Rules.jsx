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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const fetchRules = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getRules({
                page,
                size: PAGE_SIZE,
                search,
                level,
                group,
            });

            if (response.data.success) {
                setRules(response.data.data.affected_items || []);
                setTotal(response.data.data.total_affected_items || 0);
            } else {
                setError(response.data.error || "Failed to load rules");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, [page, level, group]);

    const applySearch = () => {
        setPage(1);
        fetchRules();
    };

    const resetFilters = () => {
        setSearch("");
        setLevel("");
        setGroup("");
        setPage(1);
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

    if (loading) return <LoadingState message="Loading Wazuh rules..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="Wazuh Security Rules"
                description=""
            />

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

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
                <RulesTable rules={rules} />

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