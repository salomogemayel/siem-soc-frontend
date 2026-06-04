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

export default function Playbook() {
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("Semua");

    const filteredPlaybooks = useMemo(() => {
        return playbooks.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase());

            const matchSeverity =
                severity === "Semua" || item.severity === severity;

            return matchSearch && matchSeverity;
        });
    }, [search, severity]);

    return (
        <div className="playbook-page">
            <PageHeader
                title="Playbook"
                description="Monitor endpoint health, status, and security activity."
            />

            <div className="playbook-toolbar">
                <div className="playbook-search">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Cari jenis serangan atau tindakan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="playbook-filter">
                    {["Semua", "High", "Medium", "Low"].map((item) => (
                        <button
                            key={item}
                            className={severity === item ? "active" : ""}
                            onClick={() => setSeverity(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <section className="playbook-section">
                <h2>Panduan Level Penanganan</h2>

                <div className="handling-level-grid">
                    {handlingLevels.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                to={item.to}
                                className={`handling-card ${item.type}`}
                                key={item.title}
                            >
                                <div className="handling-icon">
                                    <Icon size={34} />
                                </div>

                                <div>
                                    <h3>{item.title}</h3>
                                    <strong>{item.level}</strong>
                                    <p>{item.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="level-note">
                    <Info size={18} />
                    <span>Level 0–2: hanya informasi / prioritas rendah.</span>
                </div>
            </section>

            <section className="playbook-section">
                <h2>Rekomendasi Tindakan</h2>

                <div className="recommendation-grid">
                    {filteredPlaybooks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div className="recommendation-card" key={item.title}>
                                <div className="recommendation-icon">
                                    <Icon size={36} />
                                </div>

                                <div className="recommendation-content">
                                    <div className="recommendation-title-row">
                                        <h3>{item.title}</h3>
                                        <span
                                            className={`severity-badge ${item.severity.toLowerCase()}`}
                                        >
                      {item.severity}
                    </span>
                                    </div>

                                    <p>{item.description}</p>

                                    <ul>
                                        {item.steps.map((step) => (
                                            <li key={step}>{step}</li>
                                        ))}
                                    </ul>

                                    <Link to={item.to} className="playbook-link-btn">
                                        Lihat Panduan
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredPlaybooks.length === 0 && (
                    <div className="playbook-empty">
                        Tidak ada playbook yang sesuai dengan pencarian.
                    </div>
                )}
            </section>

            <div className="playbook-footer-note">
                <Info size={18} />
                <p>
                    <strong>High</strong> = tindakan segera,{" "}
                    <strong>Medium</strong> = perlu verifikasi,{" "}
                    <strong>Low</strong> = monitor.
                </p>
            </div>
        </div>
    );
}