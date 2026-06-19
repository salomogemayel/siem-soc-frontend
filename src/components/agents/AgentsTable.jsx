const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }).format(date);
};

export default function AgentsTable({ agents }) {
    const getStatusClass = (value) => {
        const statusValue = String(value || "").toLowerCase();

        if (statusValue === "active") return "bg-emerald-50 text-emerald-700";
        if (statusValue === "disconnected") return "bg-red-50 text-red-700";

        return "bg-slate-100 text-slate-600";
    };

    return (
        <div className="overflow-x-auto rounded-[14px] border border-slate-100 bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
                <thead>
                <tr className="bg-slate-50 text-sm text-slate-600">
                    <th className="border-b border-slate-200 p-3.5 font-semibold">ID</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Name</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">IP</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">OS</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Status</th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">Last Keep Alive</th>
                </tr>
                </thead>

                <tbody>
                {agents.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="p-6 text-center text-sm text-slate-500">
                            No agents found.
                        </td>
                    </tr>
                ) : (
                    agents.map((agent) => (
                        <tr
                            key={agent.id}
                            className="text-sm text-slate-700 hover:bg-slate-50"
                        >
                            <td className="border-b border-slate-100 p-3.5">
                                    <span className="font-semibold text-blue-600">
                                        #{agent.id}
                                    </span>
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                {agent.name || "-"}
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                {agent.ip || "-"}
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                {agent.os?.name || "-"}
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${getStatusClass(agent.status)}`}>
                                        {agent.status || "unknown"}
                                    </span>
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                {formatDate(agent.lastKeepAlive)}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}