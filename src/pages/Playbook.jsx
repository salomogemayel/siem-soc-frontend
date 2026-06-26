import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    ClipboardCheck,
    AlertTriangle,
    Upload,
    Lock,
    Database,
    UserX,
    Settings,
    Info,
    ChevronRight,
} from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";

const handlingLevels = [
    {
        title: "Perlu Ditinjau",
        level: "Level 3–6",
        description: "Cek dan validasi alert terlebih dahulu.",
        icon: ClipboardCheck,
        type: "review",
        to: "/playbook/perlu-ditinjau",
    },
    {
        title: "Perlu Tindakan",
        level: "Level 7–11",
        description: "Lakukan tindakan awal sesuai jenis serangan.",
        icon: AlertTriangle,
        type: "action",
        to: "/playbook/perlu-tindakan",
    },
    {
        title: "Perlu Eskalasi",
        level: "Level 12–16",
        description: "Eskalasi ke admin atau tim teknis karena risikonya tinggi.",
        icon: Upload,
        type: "escalation",
        to: "/playbook/perlu-eskalasi",
    },
];

const playbooks = [
    {
        title: "Brute Force",
        severity: "High",
        icon: Lock,
        description: "Percobaan login berulang untuk menebak kredensial.",
        steps: [
            "Periksa IP dan pola login.",
            "Cek akun yang terdampak.",
            "Blokir IP mencurigakan jika perlu.",
            "Reset password jika diperlukan.",
        ],
        to: "/playbook/brute-force",
    },
    {
        title: "DoS / DDoS",
        severity: "High",
        icon: AlertTriangle,
        description: "Lonjakan request untuk mengganggu ketersediaan layanan CIS.",
        steps: [
            "Periksa IP dan endpoint target.",
            "Analisis lonjakan traffic.",
            "Terapkan rate limiting.",
            "Pantau resource server.",
        ],
        to: "/playbook/dos-ddos",
    },
    {
        title: "SQL Injection",
        severity: "High",
        icon: Database,
        description: "Upaya injeksi SQL melalui input atau parameter aplikasi.",
        steps: [
            "Periksa URL dan query mencurigakan.",
            "Tinjau log aplikasi dan database.",
            "Validasi input dan parameter.",
            "Batasi akses jika diperlukan.",
        ],
        to: "/playbook/sql-injection",
    },
    {
        title: "Unauthorized Access",
        severity: "Medium",
        icon: UserX,
        description: "Akses tidak sah ke akun atau sistem.",
        steps: [
            "Verifikasi akun dan waktu akses.",
            "Periksa riwayat login.",
            "Nonaktifkan sesi mencurigakan.",
            "Ganti kredensial jika perlu.",
        ],
        to: "/playbook/unauthorized-access",
    },
    {
        title: "System Issue",
        severity: "Low",
        icon: Settings,
        description: "Masalah layanan atau sistem yang memengaruhi operasional.",
        steps: [
            "Periksa status service dan resource.",
            "Tinjau log error.",
            "Restart layanan bila perlu.",
            "Eskalasi ke admin sistem jika berlanjut.",
        ],
        to: "/playbook/system-issue",
    },
];

const handlingStyle = {
    review: "border-blue-100 bg-blue-50 text-blue-700",
    action: "border-amber-100 bg-amber-50 text-amber-700",
    escalation: "border-red-100 bg-red-50 text-red-700",
};

const severityStyle = {
    High: "bg-red-50 text-red-700 border-red-100",
    Medium: "bg-amber-50 text-amber-700 border-amber-100",
    Low: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export default function Playbook() {
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("Semua");

    const filteredPlaybooks = useMemo(() => {
        return playbooks.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase());

            const matchSeverity = severity === "Semua" || item.severity === severity;

            return matchSearch && matchSeverity;
        });
    }, [search, severity]);

    return (
        <div className="space-y-8">
            <PageHeader
                title="Playbook"
                description="Panduan tindakan untuk membantu analisis dan penanganan alert keamanan."
            />

            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
                    <Search size={20} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari jenis serangan atau tindakan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {["Semua", "High", "Medium", "Low"].map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setSeverity(item)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                severity === item
                                    ? "border-blue-600 bg-blue-600 text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">
                    Panduan Level Penanganan
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                    {handlingLevels.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                to={item.to}
                                key={item.title}
                                className={`group rounded-3xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${handlingStyle[item.type]}`}
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80">
                                    <Icon size={32} />
                                </div>

                                <h3 className="text-lg font-bold">{item.title}</h3>
                                <strong className="mt-1 block text-sm">{item.level}</strong>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {item.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <Info size={18} />
                    <span>Level 0–2: hanya informasi / prioritas rendah.</span>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">
                    Rekomendasi Tindakan
                </h2>

                <div className="grid gap-5 xl:grid-cols-2">
                    {filteredPlaybooks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                        <Icon size={32} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {item.title}
                                            </h3>

                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-bold ${severityStyle[item.severity]}`}
                                            >
                                                {item.severity}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {item.description}
                                        </p>

                                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                                            {item.steps.map((step) => (
                                                <li key={step} className="flex gap-2">
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            to={item.to}
                                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            Lihat Panduan
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredPlaybooks.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                        Tidak ada playbook yang sesuai dengan pencarian.
                    </div>
                )}
            </section>

            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                <Info size={18} className="mt-0.5 text-blue-600" />
                <p>
                    <strong>High</strong> = tindakan segera,{" "}
                    <strong>Medium</strong> = perlu verifikasi,{" "}
                    <strong>Low</strong> = monitor.
                </p>
            </div>
        </div>
    );
}