export default function AlertsFilterBar({
                                            search,
                                            setSearch,
                                            severity,
                                            setSeverity,
                                            levelValue,
                                            setLevelValue,
                                            timeRange,
                                            setTimeRange,
                                            dateFrom,
                                            setDateFrom,
                                            dateTo,
                                            setDateTo,
                                            agent,
                                            setAgent,
                                            agentOptions = [],
                                            ruleId,
                                            setRuleId,
                                            group,
                                            setGroup,
                                            onApply,
                                            onReset,
                                        }) {
    const isCustomTime = timeRange === "custom";
    const isCustomLevel = severity === "custom";

    const fieldClass =
        "min-w-0 flex flex-col gap-1.5";

    const labelClass =
        "text-sm font-semibold text-slate-700";

    const inputClass =
        "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

    return (
        <div className="mb-[18px] rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-4">
                <h3 className="m-0 text-lg font-semibold text-slate-900">
                    Alert Filters
                </h3>
                <p className="m-0 mt-1 text-sm text-slate-500">
                    Refine alerts by keyword, time, severity, agent, and rule details.
                </p>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className={fieldClass}>
                    <label className={labelClass}>Search</label>
                    <input
                        className={inputClass}
                        type="text"
                        placeholder="Search description, agent, IP, log..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onApply();
                        }}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Time Range</label>
                    <select
                        className={inputClass}
                        value={timeRange}
                        onChange={(e) => {
                            setTimeRange(e.target.value);

                            if (e.target.value !== "custom") {
                                setDateFrom("");
                                setDateTo("");
                            }
                        }}
                    >
                        <option value="15m">Last 15 minutes</option>
                        <option value="30m">Last 30 minutes</option>
                        <option value="1h">Last 1 hour</option>
                        <option value="6h">Last 6 hours</option>
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="custom">Custom range</option>
                    </select>
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>From</label>
                    <input
                        className={inputClass}
                        type="datetime-local"
                        value={dateFrom}
                        disabled={!isCustomTime}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>To</label>
                    <input
                        className={inputClass}
                        type="datetime-local"
                        value={dateTo}
                        disabled={!isCustomTime}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
                <div className={fieldClass}>
                    <label className={labelClass}>Rule ID</label>
                    <input
                        className={inputClass}
                        type="text"
                        placeholder="Example: 100200"
                        value={ruleId}
                        onChange={(e) => setRuleId(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onApply();
                        }}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Agent</label>
                    <select
                        className={inputClass}
                        value={agent}
                        onChange={(e) => setAgent(e.target.value)}
                    >
                        <option value="">All Agents</option>
                        {agentOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.id} - {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Rule Group</label>
                    <select
                        className={inputClass}
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                    >
                        <option value="">All Groups</option>
                        <option value="authentication">Authentication</option>
                        <option value="authentication_failed">Authentication Failed</option>
                        <option value="authentication_success">Authentication Success</option>
                        <option value="sudo">Sudo / Privilege Activity</option>
                        <option value="syslog">System</option>
                        <option value="web">Web</option>
                        <option value="apache">Apache</option>
                        <option value="mysql">MySQL</option>
                        <option value="syscheck">File Integrity</option>
                    </select>
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Severity</label>
                    <select
                        className={inputClass}
                        value={severity}
                        onChange={(e) => {
                            setSeverity(e.target.value);

                            if (e.target.value !== "custom") {
                                setLevelValue("");
                            }
                        }}
                    >
                        <option value="">All Severities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                        <option value="custom">Custom Level</option>
                    </select>
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Level</label>
                    <select
                        className={inputClass}
                        value={levelValue}
                        disabled={!isCustomLevel}
                        onChange={(e) => setLevelValue(e.target.value)}
                    >
                        <option value="">Choose level</option>
                        {Array.from({ length: 16 }, (_, i) => (
                            <option key={i} value={i}>
                                Level {i}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end gap-2">
                    <button
                        type="button"
                        onClick={onApply}
                        className="h-10 flex-1 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Apply
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}