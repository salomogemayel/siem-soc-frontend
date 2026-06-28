import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileCode, Copy, Check } from "lucide-react";

export default function RulesTable({ rules = [], expanded, setExpanded }) {
    const [copiedId, setCopiedId] = useState(null);

    const jsonToXml = (rule) => {
        let xml = `<rule id="${rule.id}" level="${rule.level || 0}">\n`;
        if (rule.description) xml += `  <description>${rule.description}</description>\n`;
        if (Array.isArray(rule.groups)) {
            rule.groups.forEach(g => xml += `  <group>${g}</group>\n`);
        }
        if (rule.mitre?.tactic) {
            xml += `  <mitre>\n    <tactic>${rule.mitre.tactic.join(", ")}</tactic>\n  </mitre>\n`;
        }
        xml += `</rule>`;
        return xml;
    };

    const toggleExpand = (ruleId) => {
        setExpanded(expanded === ruleId ? null : ruleId);
    };

    const handleCopy = (rule, e) => {
        e.stopPropagation();
        const ruleXml = jsonToXml(rule);

        navigator.clipboard.writeText(ruleXml).then(() => {
            setCopiedId(rule.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    const getLevelClass = (level) => {
        const value = Number(level || 0);
        if (value >= 12) return "bg-red-100 text-red-800 border-red-200";
        if (value >= 10) return "bg-rose-50 text-rose-700 border-rose-100";
        if (value >= 5) return "bg-amber-50 text-amber-700 border-amber-100";
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
    };

    const safeRules = Array.isArray(rules) ? rules : [];

    return (
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead>
            <tr className="bg-slate-50 text-slate-600">
                <th className="w-10 border-b border-slate-200 p-3"></th>
                <th className="border-b border-slate-200 p-3 font-semibold">Rule ID</th>
                <th className="border-b border-slate-200 p-3 font-semibold">Level</th>
                <th className="border-b border-slate-200 p-3 font-semibold">Description</th>
                <th className="border-b border-slate-200 p-3 font-semibold">Groups</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
            {safeRules.length === 0 ? (
                <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                        No rules found matching your filters.
                    </td>
                </tr>
            ) : (
                safeRules.map((rule) => {
                    const safeGroups = Array.isArray(rule.groups) ? rule.groups : [];

                    return (
                        <React.Fragment key={rule.id}>
                            <tr
                                className={`cursor-pointer transition-colors hover:bg-slate-50 ${expanded === rule.id ? 'bg-slate-50' : ''}`}
                                onClick={() => toggleExpand(rule.id)}
                            >
                                <td className="p-3 text-slate-400">
                                    {expanded === rule.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </td>
                                <td className="p-3 font-semibold text-blue-600">{rule.id}</td>
                                <td className="p-3">
                                        <span className={`inline-flex min-w-[32px] justify-center rounded-full border px-2 py-0.5 text-xs font-bold ${getLevelClass(rule.level)}`}>
                                            {rule.level}
                                        </span>
                                </td>
                                <td className="p-3 font-medium text-slate-800">{rule.description}</td>
                                <td className="p-3">
                                    <div className="flex flex-wrap gap-1">
                                        {safeGroups.slice(0, 2).map((group, idx) => (
                                            <span key={idx} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">{group}</span>
                                        ))}
                                        {safeGroups.length > 2 && <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">+{safeGroups.length - 2}</span>}
                                    </div>
                                </td>
                            </tr>

                            {expanded === rule.id && (
                                <tr className="bg-slate-50">
                                    <td></td>
                                    <td colSpan="4" className="p-3.5 pr-4">
                                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                            {/*<div className="mb-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">*/}
                                            {/*    <p className="m-0"><strong>File:</strong> {rule.file || "-"}</p>*/}
                                            {/*    <p className="m-0"><strong>Category:</strong> {rule.category || "-"}</p>*/}
                                            {/*    <p className="m-0"><strong>Fired Times:</strong> {rule.firedtimes || "0"}</p>*/}
                                            {/*    <p className="m-0"><strong>MITRE Tactics:</strong> {rule.mitre?.tactic?.join(", ") || "-"}</p>*/}
                                            {/*</div>*/}

                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-slate-700">
                                                    <FileCode size={16} className="text-orange-600" />
                                                    <span className="text-sm font-bold">Rule XML Configuration</span>
                                                </div>
                                                <button
                                                    onClick={(e) => handleCopy(rule, e)}
                                                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                                                >
                                                    {copiedId === rule.id ? (
                                                        <><Check size={14} className="text-emerald-600" /> <span className="text-emerald-700">Copied!</span></>
                                                    ) : (
                                                        <><Copy size={14} /> <span>Copy XML</span></>
                                                    )}
                                                </button>
                                            </div>

                                            <pre className="m-0 max-h-[350px] overflow-auto rounded-[10px] bg-slate-900 p-4 text-xs text-orange-300 font-mono">
                                                    {jsonToXml(rule)}
                                                </pre>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })
            )}
            </tbody>
        </table>
    );
}