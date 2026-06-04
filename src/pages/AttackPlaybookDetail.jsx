import { Link } from "react-router-dom";
import {
    ArrowLeft,
    AlertTriangle,
    Database,
    ShieldCheck,
    ListChecks,
    FileText,
    ExternalLink,
    CheckCircle,
    ShieldAlert,
} from "lucide-react";
import { attackPlaybooks } from "../data/attackPlaybooks";

export default function AttackPlaybookDetail({ slug }) {
    const playbook = attackPlaybooks[slug];

    if (!playbook) {
        return (
            <div className="attack-page">
                <h1>Playbook tidak ditemukan</h1>
                <Link to="/playbook">Kembali ke Playbook</Link>
            </div>
        );
    }

    return (
        <div className="attack-page">
            <div className="attack-topbar">
                <div className="attack-breadcrumb">
                    <span>SOC Playbook</span>
                    <span>/</span>
                    <strong>{playbook.title}</strong>
                </div>

                <Link to="/playbook" className="attack-back-btn">
                    <ArrowLeft size={16} />
                    Kembali ke Playbook
                </Link>
            </div>

            <div className="attack-layout">
                <main className="attack-main">
                    <section className="attack-hero">
                        <div>
                            <div className="attack-title-row">
                                <h1>{playbook.title}</h1>
                                <span className={`attack-severity ${playbook.severity.toLowerCase()}`}>
                  {playbook.severity} Risk
                </span>
                            </div>

                            <p>{playbook.description}</p>
                        </div>

                        <div className="attack-illustration">
                            <ShieldAlert size={56} />
                        </div>
                    </section>

                    <section className="attack-summary-grid">
                        <div className="attack-summary-card">
                            <AlertTriangle size={24} />
                            <span>Level Umum</span>
                            <strong>{playbook.level}</strong>
                        </div>

                        <div className="attack-summary-card">
                            <ShieldCheck size={24} />
                            <span>Kategori</span>
                            <strong>{playbook.category}</strong>
                        </div>

                        <div className="attack-summary-card">
                            <Database size={24} />
                            <span>Sumber Data</span>
                            <strong>{playbook.dataSources}</strong>
                        </div>

                        <div className="attack-summary-card">
                            <ListChecks size={24} />
                            <span>Prioritas</span>
                            <strong>{playbook.priority}</strong>
                        </div>
                    </section>

                    <section className="attack-tabs">
                        <button className="active">Panduan</button>
                        <button>Alert Terkait</button>
                        <button>Aturan Wazuh</button>
                    </section>

                    <section className="attack-card-grid">
                        <InfoCard
                            title="Indikator dari Wazuh"
                            items={playbook.indicators}
                            type="check"
                        />

                        <NumberedCard
                            title="Langkah Investigasi"
                            items={playbook.investigation}
                        />

                        <NumberedCard
                            title="Rekomendasi Tindakan"
                            items={playbook.actions}
                            color="green"
                        />

                        <InfoCard
                            title="Kapan Harus Eskalasi?"
                            items={playbook.escalation}
                            type="danger"
                        />
                    </section>

                    <section className="attack-reference-card">
                        <div>
                            <h2>MITRE ATT&CK Technique</h2>
                            <p>
                                Teknik serangan dapat digunakan sebagai referensi untuk
                                memahami pola ancaman dan menentukan kontrol keamanan yang
                                relevan.
                            </p>
                        </div>

                        <div>
                            <h2>Catatan</h2>
                            <p>
                                Setiap tindakan perlu dicatat sebagai bukti audit dan bahan
                                evaluasi peningkatan kebijakan keamanan.
                            </p>
                        </div>
                    </section>
                </main>

                <aside className="attack-side">
                    <div className="attack-side-card">
                        <h2>Quick Actions</h2>

                        <button>
                            <FileText size={16} />
                            Lihat Alert Terkait
                            <ExternalLink size={14} />
                        </button>

                        <button>
                            <FileText size={16} />
                            Lihat Log Terkait
                            <ExternalLink size={14} />
                        </button>

                        <button>
                            <ShieldAlert size={16} />
                            Buat Incident
                            <ExternalLink size={14} />
                        </button>

                        <button>
                            <CheckCircle size={16} />
                            Tandai sebagai Reviewed
                            <ExternalLink size={14} />
                        </button>
                    </div>

                    <div className="attack-side-card">
                        <div className="side-title-row">
                            <h2>Alert Terkait</h2>
                            <button className="text-btn">Lihat Semua</button>
                        </div>

                        <div className="related-alert-list">
                            {playbook.relatedAlerts.map((alert, index) => (
                                <div className="related-alert-item" key={alert}>
                                    <span className={`dot dot-${index}`}></span>
                                    <div>
                                        <strong>{alert}</strong>
                                        <p>Rule terkait • agent ubuntu24</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function InfoCard({ title, items, type = "check" }) {
    return (
        <div className="attack-info-card">
            <h2>{title}</h2>

            <ul className={type === "danger" ? "danger-list" : "check-list"}>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

function NumberedCard({ title, items, color = "blue" }) {
    return (
        <div className="attack-info-card">
            <h2>{title}</h2>

            <ol className={`numbered-list ${color}`}>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ol>
        </div>
    );
}