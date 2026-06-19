import { Search } from "lucide-react";

export default function AgentsToolbar({
                                          search,
                                          setSearch,
                                          status,
                                          setStatus,
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
                    placeholder="Search agent ID, name, or IP..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onApply();
                    }}
                    className="h-full min-w-0 flex-1 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
            </div>

            <select
                value={status}
                onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-[190px]"
            >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="disconnected">Disconnected</option>
                <option value="never_connected">Never Connected</option>
            </select>

            <button
                type="button"
                onClick={onApply}
                className="h-10 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
                Search
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