import { useNavigate } from "react-router-dom";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Info } from "lucide-react";
import Tooltip from "../../components/Tooltip.jsx";

export default function AlertsCharts({
                                         levelChartData = [],
                                         topAgentsData = [],
                                         categoryData = [],
                                         topRulesData = [],
                                         recentHighAlerts = [],
                                     }) {
    const navigate = useNavigate();

    const maxCategoryValue = Math.max(...categoryData.map((item) => item.value), 1);
    const maxAgentValue = Math.max(...topAgentsData.map((item) => item.value), 1);

    const openAlertInExplorer = (alert) => {
        const params = new URLSearchParams();
        if (alert.rule_id) params.set("rule_id", alert.rule_id);
        if (alert.level !== undefined && alert.level !== null) params.set("level", `exact:${alert.level}`);
        if (alert.agent_id && alert.agent_id !== "-") params.set("agent", alert.agent_id);
        navigate(`/alerts-list?${params.toString()}`);
    };

    const openRuleInExplorer = (rule) => {
        const params = new URLSearchParams();
        if (rule.rule_id) params.set("rule_id", rule.rule_id);
        navigate(`/alerts-list?${params.toString()}`);
    };

    const openAgentInExplorer = (agent) => {
        const params = new URLSearchParams();
        if (agent.id) params.set("agent", agent.id);
        else if (agent.name) params.set("search", agent.name);
        navigate(`/alerts-list?${params.toString()}`);
    };

    const getLevelClass = (level) => {
        const value = Number(level);
        if (value >= 10) return "bg-red-50 text-red-700";
        if (value >= 5) return "bg-amber-50 text-amber-700";
        return "bg-emerald-50 text-emerald-700";
    };

    return (
        <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-12">
            {/* Alert Trend by Severity */}
            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm xl:col-span-8">
                <div className="flex items-center gap-2">
                    <h3 className="m-0 text-base font-semibold text-slate-900">Alert Trend by Severity</h3>
                    <Tooltip content="Tren jumlah alert berdasarkan tingkat keparahan dari waktu ke waktu" icon={Info}>
                        <Info size={14} className="text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="mt-4">
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={levelChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis allowDecimals={false} />
                            <RechartsTooltip />
                            <Area type="monotone" dataKey="low" stackId="1" stroke="#047857" fill="#a7f3d0" />
                            <Area type="monotone" dataKey="medium" stackId="1" stroke="#b45309" fill="#fde68a" />
                            <Area type="monotone" dataKey="high" stackId="1" stroke="#dc2626" fill="#fecaca" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm xl:col-span-4">
                <div className="flex items-center gap-2">
                    <h3 className="m-0 text-base font-semibold text-slate-900">Recent High Alerts</h3>
                    <Tooltip content="Daftar alert dengan tingkat keparahan tinggi yang perlu diperhatikan" icon={Info}>
                        <Info size={14} className="text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                    {recentHighAlerts.length === 0 ? (
                        <p className="m-0 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No high alerts found.</p>
                    ) : (
                        recentHighAlerts.map((alert, index) => (
                            <button type="button" key={`${alert.rule_id}-${alert.timestamp}-${index}`} onClick={() => openAlertInExplorer(alert)} className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left transition hover:bg-slate-50 hover:shadow-sm">
                                <div className="min-w-0">
                                    <strong className="line-clamp-2 text-sm font-semibold text-slate-900">{alert.description}</strong>
                                    <p className="m-0 mt-1 text-xs text-slate-500">Rule {alert.rule_id} • Level {alert.level} • {alert.agent_name}</p>
                                </div>
                                <span className={`inline-flex min-w-8 shrink-0 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${getLevelClass(alert.level)}`}>{alert.level}</span>
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm xl:col-span-8">
                <div className="flex items-center gap-2">
                    <h3 className="m-0 text-base font-semibold text-slate-900">Top Triggered Rules</h3>
                    <Tooltip content="Rule yang paling sering memicu alert dalam data terbaru" icon={Info}>
                        <Info size={14} className="text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                        <tr className="bg-slate-50 text-sm text-slate-600">
                            <th className="border-b border-slate-200 p-3.5 font-semibold">Rule ID</th>
                            <th className="border-b border-slate-200 p-3.5 font-semibold">Description</th>
                            <th className="border-b border-slate-200 p-3.5 font-semibold">Level</th>
                            <th className="border-b border-slate-200 p-3.5 font-semibold">Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topRulesData.length === 0 ? (
                            <tr><td colSpan="4" className="p-5 text-center text-sm text-slate-500">No rule data found.</td></tr>
                        ) : (
                            topRulesData.map((rule) => (
                                <tr key={rule.rule_id} className="text-sm text-slate-700 hover:bg-slate-50">
                                    <td className="border-b border-slate-100 p-3.5">
                                        <button type="button" onClick={() => openRuleInExplorer(rule)} className="font-semibold text-blue-600 transition hover:text-blue-700">{rule.rule_id}</button>
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5">{rule.description}</td>
                                    <td className="border-b border-slate-100 p-3.5">
                                        <span className={`inline-flex min-w-8 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${getLevelClass(rule.level)}`}>{rule.level}</span>
                                    </td>
                                    <td className="border-b border-slate-100 p-3.5 font-semibold text-slate-900">{rule.count}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm xl:col-span-4">
                <div className="flex items-center gap-2">
                    <h3 className="m-0 text-base font-semibold text-slate-900">Top Risk Agents</h3>
                    <Tooltip content="Agen dengan aktivitas alert terbanyak" icon={Info}>
                        <Info size={14} className="text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                    {topAgentsData.length === 0 ? (
                        <p className="m-0 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No agent data found.</p>
                    ) : (
                        topAgentsData.slice(0, 5).map((agent) => (
                            <button type="button" key={agent.name} onClick={() => openAgentInExplorer(agent)} className="w-full rounded-xl border border-slate-100 bg-white p-3 text-left transition hover:bg-slate-50 hover:shadow-sm">
                                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-700">{agent.name}</span>
                                    <strong className="text-slate-900">{agent.value}</strong>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${(agent.value / maxAgentValue) * 100}%` }} />
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm xl:col-span-8">
                <div className="flex items-center gap-2">
                    <h3 className="m-0 text-base font-semibold text-slate-900">Alert Category Breakdown</h3>
                    <Tooltip content="Distribusi alert berdasarkan grup atau kategori rule" icon={Info}>
                        <Info size={14} className="text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                    {categoryData.length === 0 ? (
                        <p className="m-0 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No category data found.</p>
                    ) : (
                        categoryData.map((item) => (
                            <div key={item.name} className="rounded-xl border border-slate-100 bg-white p-3">
                                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-700">{item.name}</span>
                                    <strong className="text-slate-900">{item.value}</strong>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(item.value / maxCategoryValue) * 100}%` }} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm xl:col-span-4">
                <div className="flex items-center gap-2">
                    <h3 className="m-0 text-base font-semibold text-slate-900">Alert Activity Bar</h3>
                    <Tooltip content="Perbandingan volume alert antar waktu" icon={Info}>
                        <Info size={14} className="text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="mt-4">
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={levelChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis allowDecimals={false} />
                            <RechartsTooltip />
                            <Bar dataKey="low" stackId="a" fill="#047857" />
                            <Bar dataKey="medium" stackId="a" fill="#b45309" />
                            <Bar dataKey="high" stackId="a" fill="#dc2626" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}