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
        <div className="agents-toolbar">
            <div className="agents-search">
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Search agent ID, name, or IP..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onApply();
                    }}
                />
            </div>

            <select
                value={status}
                onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                }}
            >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="disconnected">Disconnected</option>
                <option value="never_connected">Never Connected</option>
            </select>

            <button onClick={onApply}>Search</button>
            <button className="secondary-btn" onClick={onReset}>
                Reset
            </button>
        </div>
    );
}