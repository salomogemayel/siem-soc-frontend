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
        <div className="rules-toolbar">
            <div className="rules-search">
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Search rule ID, description, or group..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onApply();
                    }}
                />
            </div>

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

            <select
                value={group}
                onChange={(e) => {
                    setGroup(e.target.value);
                    setPage(1);
                }}
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

            <button onClick={onApply}>Apply</button>
            <button className="secondary-btn" onClick={onReset}>
                Reset
            </button>
        </div>
    );
}