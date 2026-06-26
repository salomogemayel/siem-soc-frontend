import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ClipboardCheck,
    AlertTriangle,
    Crosshair,
    Info,
    Eye,
    FileSearch,
    CheckCircle,
    ShieldAlert,
    ChevronRight,
} from "lucide-react";
import { levelAlerts, playbookLevels } from "../data/playbookLevels";

const mainColorStyle = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
};

export default function PlaybookLevelPage({ type = "review" }) {
    const levelData = playbookLevels[type] || playbookLevels.review;

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
    const [selectedAgent, setSelectedAgent] = useState("Semua Agent");

    const alerts = levelAlerts.filter((alert) => alert.type === type);
    const [selectedAlert, setSelectedAlert] = useState(alerts[0] || null);

    const filteredAlerts = useMemo(() => {
        return alerts.filter((alert) => {
            const keyword = search.toLowerCase();

            const matchSearch =
                alert.title.toLowerCase().includes(keyword) ||
                alert.source.toLowerCase().includes(keyword) ||
                alert.agent.toLowerCase().includes(keyword) ||
                alert.ruleId.toLowerCase().includes(keyword) ||
                alert.sourceIp.toLowerCase().includes(keyword);

            const matchCategory =
                selectedCategory === "Semua Kategori" ||
                alert.category === selectedCategory;

            const matchAgent =
                selectedAgent === "Semua Agent" || alert.agent === selectedAgent;

            return matchSearch && matchCategory && matchAgent;
        });
    }, [alerts, search, selectedCategory, selectedAgent]);

    const getSummaryIcon = () => {
        if (type === "review") return ClipboardCheck;
        if (type === "action") return AlertTriangle;

        return ShieldAlert;
    };

    const SummaryIcon = getSummaryIcon();

    return (
        <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
                    <Link to="/playbook" className="text-blue-600 hover:underline">
                        Playbook
                    </Link>
                    <span>/</span>
                    <strong className="text-slate-900">{levelData.title}</strong>
                </div>

                <Link
                    to="/playbook"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Playbook
                </Link>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {levelData.title}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        {levelData.description}
                    </p>
                </div>

                <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                    {levelData.level}
                </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                                mainColorStyle[levelData.mainColor] ||
                                "bg-blue-50 text-blue-700"
                            }`}
                        >
                            <SummaryIcon size={30} />
                        </div>

                        <div>
                            <span className="text-sm font-semibold text-slate-500">
                                Total Alert
                            </span>
                            <strong className="block text-2xl font-bold text-slate-900">
                                {levelData.total}
                            </strong>
                            <p className="text-sm text-slate-500">{levelData.title}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                            <AlertTriangle size={30} />
                        </div>

                        <div>
                            <span className="text-sm font-semibold text-slate-500">
                                Rentang Level
                            </span>
                            <strong className="block text-2xl font-bold text-amber-600">
                                {levelData.range}
                            </strong>
                            <p className="text-sm text-slate-500">
                                Prioritas penanganan
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                            <Crosshair size={30} />
                        </div>

                        <div>
                            <span className="text-sm font-semibold text-slate-500">
                                Fokus
                            </span>
                            <strong className="block text-xl font-bold text-slate-900">
                                {levelData.focus}
                            </strong>
                            <p className="text-sm text-slate-500">
                                Tujuan utama halaman ini
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="space-y-6">
                    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
                        <div className="flex min-h-11 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 md:col-span-1">
                            <FileSearch size={18} className="text-slate-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari alert, rule, agent, IP..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
                        >
                            <option>Semua Kategori</option>
                            <option>Authentication</option>
                            <option>Web Access</option>
                            <option>Traffic</option>
                            <option>Unauthorized Access</option>
                            <option>Web Attack</option>
                        </select>

                        <select
                            value={selectedAgent}
                            onChange={(e) => setSelectedAgent(e.target.value)}
                            className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
                        >
                            <option>Semua Agent</option>
                            <option>ubuntu24-agent</option>
                            <option>vivobook-pro</option>
                        </select>

                        <select
                            defaultValue="24h"
                            className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
                        >
                            <option value="1h">Last 1 Hour</option>
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                        </select>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                            <h2 className="text-lg font-bold text-slate-900">
                                Daftar Alert {levelData.title}
                            </h2>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                {filteredAlerts.length} alert
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4">Waktu</th>
                                    <th className="px-5 py-4">Jenis Alert</th>
                                    <th className="px-5 py-4">Sumber</th>
                                    <th className="px-5 py-4">Level</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Aksi</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                {filteredAlerts.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-5 py-8 text-center text-slate-500"
                                        >
                                            Tidak ada alert yang sesuai.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAlerts.map((alert) => {
                                        const isSelected =
                                            selectedAlert?.id === alert.id;

                                        return (
                                            <tr
                                                key={alert.id}
                                                onClick={() => setSelectedAlert(alert)}
                                                className={`cursor-pointer transition hover:bg-slate-50 ${
                                                    isSelected ? "bg-blue-50/60" : "bg-white"
                                                }`}
                                            >
                                                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                    {alert.time}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <strong className="block text-slate-900">
                                                        {alert.title}
                                                    </strong>
                                                    <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                                                        {alert.description}
                                                    </p>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                    {alert.source}
                                                </td>

                                                <td className="px-5 py-4">
                                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-700">
                                                            {alert.level}
                                                        </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                                alert.status === "Sedang Dicek"
                                                                    ? "bg-amber-50 text-amber-700"
                                                                    : "bg-slate-100 text-slate-600"
                                                            }`}
                                                        >
                                                            {alert.status}
                                                        </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                                    >
                                                        Lihat
                                                        <ChevronRight size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedAlert && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {selectedAlert.title}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Rule {selectedAlert.ruleId} •{" "}
                                        {selectedAlert.category}
                                    </p>
                                </div>

                                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                    {selectedAlert.status}
                                </span>
                            </div>

                            <div className="mt-5 grid gap-3 md:grid-cols-4">
                                {[
                                    ["Waktu", selectedAlert.time],
                                    ["Agent", selectedAlert.agent],
                                    ["Source IP", selectedAlert.sourceIp],
                                    ["Level", selectedAlert.level],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                                    >
                                        <span className="text-xs font-bold uppercase text-slate-400">
                                            {label}
                                        </span>
                                        <strong className="mt-1 block text-sm text-slate-900">
                                            {value}
                                        </strong>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-4 lg:grid-cols-3">
                                <div className="rounded-2xl border border-slate-100 p-4">
                                    <h3 className="font-bold text-slate-900">
                                        Penjelasan
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {selectedAlert.description}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-100 p-4">
                                    <h3 className="font-bold text-slate-900">
                                        Yang Perlu Dicek
                                    </h3>
                                    <ul className="mt-2 space-y-2 text-sm text-slate-600">
                                        <li>• Apakah sumber IP dikenal?</li>
                                        <li>• Apakah akun atau endpoint valid?</li>
                                        <li>• Apakah kejadian berulang?</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-slate-100 p-4">
                                    <h3 className="font-bold text-slate-900">
                                        Rekomendasi Awal
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        Validasi alert terlebih dahulu. Jika aktivitas
                                        terlihat mencurigakan atau berulang, lanjutkan ke
                                        tahap penanganan.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                    <Eye size={16} />
                                    Lihat Log Terkait
                                </button>

                                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                    <ShieldAlert size={16} />
                                    Lihat Alert Detail
                                </button>

                                <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                    <CheckCircle size={16} />
                                    Tandai Reviewed
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <Info size={18} className="text-blue-600" />
                            <h3 className="font-bold text-slate-900">
                                Fungsi {levelData.title}
                            </h3>
                        </div>

                        <p className="text-sm leading-6 text-slate-600">
                            {levelData.purpose}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <ClipboardCheck size={18} className="text-blue-600" />
                            <h3 className="font-bold text-slate-900">
                                Panduan Penanganan
                            </h3>
                        </div>

                        <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
                            {levelData.guidance.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <Eye size={18} className="text-blue-600" />
                            <h3 className="font-bold text-slate-900">
                                Yang Perlu Dilihat
                            </h3>
                        </div>

                        <ul className="space-y-2 text-sm leading-6 text-slate-600">
                            {levelData.watchItems.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5 shadow-sm">
                        <h3 className="font-bold text-amber-800">
                            Kapan Naik Status?
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-amber-700">
                            {levelData.escalationRule}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}