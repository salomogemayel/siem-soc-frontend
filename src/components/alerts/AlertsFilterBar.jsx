export default function AlertsFilterBar({
                                            search,
                                            setSearch,
                                            level,
                                            setLevel,
                                            setPage,
                                            onApply,
                                            onReset,
                                        }) {
    return (
        <div className="alert-filter-bar">
            <input
                type="text"
                placeholder="Search description, agent, rule ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onApply();
                }}
            />

            <select
                value={level}
                onChange={(e) => {
                    setLevel(e.target.value);
                    setPage(1);
                }}
            >
                <option value="">All Levels</option>
                <option value="3">Level 3+</option>
                <option value="5">Level 5+</option>
                <option value="7">Level 7+</option>
                <option value="10">Level 10+</option>
                <option value="12">Level 12+</option>
            </select>

            <button onClick={onApply}>Apply Filter</button>

            <button className="secondary-btn" onClick={onReset}>
                Reset
            </button>
        </div>
    );
}