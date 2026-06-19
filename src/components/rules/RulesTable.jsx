export default function RulesTable({ rules }) {
    const getLevelClass = (level) => {
        const value = Number(level);

        if (value >= 8) return "bg-red-50 text-red-700";
        if (value >= 5) return "bg-amber-50 text-amber-700";

        return "bg-emerald-50 text-emerald-700";
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
                <thead>
                <tr className="bg-slate-50 text-sm text-slate-600">
                    <th className="border-b border-slate-200 p-3.5 font-semibold">
                        Rule ID
                    </th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">
                        Level
                    </th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">
                        Description
                    </th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">
                        Groups
                    </th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">
                        PCI DSS
                    </th>
                    <th className="border-b border-slate-200 p-3.5 font-semibold">
                        MITRE
                    </th>
                </tr>
                </thead>

                <tbody>
                {rules.length === 0 ? (
                    <tr>
                        <td
                            colSpan="6"
                            className="p-6 text-center text-sm text-slate-500"
                        >
                            No rules found.
                        </td>
                    </tr>
                ) : (
                    rules.map((rule) => (
                        <tr
                            key={rule.id}
                            className="text-sm text-slate-700 hover:bg-slate-50"
                        >
                            <td className="border-b border-slate-100 p-3.5">
                                    <span className="font-semibold text-blue-600">
                                        #{rule.id}
                                    </span>
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                    <span
                                        className={`inline-flex min-w-8 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${getLevelClass(rule.level)}`}
                                    >
                                        {rule.level ?? 0}
                                    </span>
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                {rule.description ?? "No description"}
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                <div className="flex flex-wrap gap-1.5">
                                    {rule.groups?.length
                                        ? rule.groups.slice(0, 4).map((item) => (
                                            <span
                                                key={item}
                                                className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                                            >
                                                    {item}
                                                </span>
                                        ))
                                        : "-"}
                                </div>
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                {rule.pci_dss?.length ? rule.pci_dss.join(", ") : "-"}
                            </td>

                            <td className="border-b border-slate-100 p-3.5">
                                {rule.mitre?.id?.length ? rule.mitre.id.join(", ") : "-"}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}