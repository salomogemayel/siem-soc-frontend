import { Search } from "lucide-react";

export default function RulesToolbar({
                                         search,
                                         setSearch,
                                         level,
                                         setLevel,
                                         group,
                                         setGroup,
                                         setPage,
                                         onApply,
                                         onReset,
                                     }) {
    return (
        <div className="flex flex-col gap-3 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
            <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <Search size={18} className="shrink-0 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search rule ID, description, or group..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onApply();
                    }}
                    className="h-full min-w-0 flex-1 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
            </div>

            <select
                value={level}
                onChange={(e) => {
                    setLevel(e.target.value);
                    setPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-[150px]"
            >
                <option value="">All Levels</option>
                <option value="3">Level 3+</option>
                <option value="5">Level 5+</option>
                <option value="7">Level 7+</option>
                <option value="10">Level 10+</option>
                <option value="12">Level 12+</option>
            </select>

            <select
                value={group}
                onChange={(e) => {
                    setGroup(e.target.value);
                    setPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-[220px]"
            >
                <option value="">All Groups</option>
                <option value="authentication_success">Authentication Success</option>
                <option value="authentication_failed">Authentication Failed</option>
                <option value="syslog">Syslog</option>
                <option value="pam">PAM</option>
                <option value="sudo">Sudo</option>
                <option value="web">Web</option>
                <option value="attack">Attack</option>
            </select>

            <button
                type="button"
                onClick={onApply}
                className="h-10 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
                Apply
            </button>

            <button
                type="button"
                onClick={onReset}
                className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
                Reset
            </button>
        </div>
    );
}