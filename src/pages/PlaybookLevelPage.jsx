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

export default function PlaybookLevelPage({ type = "review" }) {
    const levelData = playbookLevels[type] || playbookLevels.review;

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
    const [selectedAgent, setSelectedAgent] = useState("Semua Agent");

    const alerts = levelAlerts.filter((alert) => alert.type === type);
    const [selectedAlert, setSelectedAlert] = useState(alerts[0] || null);

    const filteredAlerts = useMemo(() => {
        return alerts.filter((alert) => {
            const matchSearch =
                alert.title.toLowerCase().includes(search.toLowerCase()) ||
                alert.source.toLowerCase().includes(search.toLowerCase()) ||
                alert.agent.toLowerCase().includes(search.toLowerCase()) ||
                alert.ruleId.toLowerCase().includes(search.toLowerCase()) ||
                alert.sourceIp.toLowerCase().includes(search.toLowerCase());

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
        <div className="review-page">
            <div className="review-topbar">
                <div className="review-breadcrumb">
                    <span>SOC Playbook</span>
                    <span>/</span>
                    <strong>{levelData.title}</strong>
                </div>

                <Link to="/playbook" className="review-back-btn">
                    <ArrowLeft size={16} />
                    Kembali ke Playbook
                </Link>
            </div>

            <div className="review-header">
                <div>
                    <h1>{levelData.title}</h1>
                    <p>{levelData.description}</p>
                </div>

                <span className="review-level-badge">{levelData.level}</span>
            </div>

            <div className="review-summary-grid">
                <div className="review-summary-card active">
                    <div className={`review-summary-icon ${levelData.mainColor}`}>
                        <SummaryIcon size={30} />
                    </div>
                    <div>
                        <span>Total Alert</span>
                        <strong>{levelData.total}</strong>
                        <p>{levelData.title}</p>
                    </div>
                </div>

                <div className="review-summary-card">
                    <div className="review-summary-icon orange">
                        <AlertTriangle size={30} />
                    </div>
                    <div>
                        <span>Rentang Level</span>
                        <strong className="orange-text">{levelData.range}</strong>
                        <p>Prioritas penanganan</p>
                    </div>
                </div>

                <div className="review-summary-card">
                    <div className="review-summary-icon blue">
                        <Crosshair size={30} />
                    </div>
                    <div>
                        <span>Fokus</span>
                        <strong>{levelData.focus}</strong>
                        <p>Tujuan utama halaman ini</p>
                    </div>
                </div>
            </div>

            <div className="review-main-grid">
                <div className="review-left">
                    <div className="review-filter-card">
                        <div className="review-search-box">
                            <FileSearch size={18} />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari alert, rule, agent, IP..."
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
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
                        >
                            <option>Semua Agent</option>
                            <option>ubuntu24-agent</option>
                            <option>vivobook-pro</option>
                        </select>

                        <select defaultValue="24h">
                            <option value="1h">Last 1 Hour</option>
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                        </select>
                    </div>

                    <div className="review-table-card">
                        <div className="review-card-header">
                            <h2>Daftar Alert {levelData.title}</h2>
                            <span>{filteredAlerts.length} alert</span>
                        </div>

                        <div className="review-table-wrapper">
                            <table className="review-table">
                                <thead>
                                <tr>
                                    <th>Waktu</th>
                                    <th>Jenis Alert</th>
                                    <th>Sumber</th>
                                    <th>Level</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                                </thead>

                                <tbody>
                                {filteredAlerts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-table">
                                            Tidak ada alert yang sesuai.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAlerts.map((alert) => (
                                        <tr
                                            key={alert.id}
                                            className={
                                                selectedAlert?.id === alert.id ? "selected" : ""
                                            }
                                            onClick={() => setSelectedAlert(alert)}
                                        >
                                            <td>{alert.time}</td>

                                            <td>
                                                <strong>{alert.title}</strong>
                                                <p>{alert.description}</p>
                                            </td>

                                            <td>{alert.source}</td>

                                            <td>
                          <span className="review-level-number">
                            {alert.level}
                          </span>
                                            </td>

                                            <td>
                          <span
                              className={`review-status ${
                                  alert.status === "Sedang Dicek"
                                      ? "checking"
                                      : "pending"
                              }`}
                          >
                            {alert.status}
                          </span>
                                            </td>

                                            <td>
                                                <button className="review-view-btn">
                                                    Lihat
                                                    <ChevronRight size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedAlert && (
                        <div className="review-detail-card">
                            <div className="review-detail-header">
                                <div>
                                    <h2>{selectedAlert.title}</h2>
                                    <p>
                                        Rule {selectedAlert.ruleId} • {selectedAlert.category}
                                    </p>
                                </div>

                                <span className="review-status pending">
                  {selectedAlert.status}
                </span>
                            </div>

                            <div className="review-detail-meta">
                                <div>
                                    <span>Waktu</span>
                                    <strong>{selectedAlert.time}</strong>
                                </div>

                                <div>
                                    <span>Agent</span>
                                    <strong>{selectedAlert.agent}</strong>
                                </div>

                                <div>
                                    <span>Source IP</span>
                                    <strong>{selectedAlert.sourceIp}</strong>
                                </div>

                                <div>
                                    <span>Level</span>
                                    <strong>{selectedAlert.level}</strong>
                                </div>
                            </div>

                            <div className="review-detail-grid">
                                <div className="review-detail-box">
                                    <h3>Penjelasan</h3>
                                    <p>{selectedAlert.description}</p>
                                </div>

                                <div className="review-detail-box">
                                    <h3>Yang Perlu Dicek</h3>
                                    <ul>
                                        <li>Apakah sumber IP dikenal?</li>
                                        <li>Apakah akun atau endpoint valid?</li>
                                        <li>Apakah kejadian berulang?</li>
                                    </ul>
                                </div>

                                <div className="review-detail-box">
                                    <h3>Rekomendasi Awal</h3>
                                    <p>
                                        Validasi alert terlebih dahulu. Jika aktivitas terlihat
                                        mencurigakan atau berulang, lanjutkan ke tahap penanganan.
                                    </p>
                                </div>
                            </div>

                            <div className="review-detail-actions">
                                <button>
                                    <Eye size={16} />
                                    Lihat Log Terkait
                                </button>

                                <button>
                                    <ShieldAlert size={16} />
                                    Lihat Alert Detail
                                </button>

                                <button className="primary">
                                    <CheckCircle size={16} />
                                    Tandai Reviewed
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="review-right">
                    <div className="review-help-card">
                        <div className="review-help-title">
                            <Info size={18} />
                            <h3>Fungsi {levelData.title}</h3>
                        </div>

                        <p>{levelData.purpose}</p>
                    </div>

                    <div className="review-help-card">
                        <div className="review-help-title">
                            <ClipboardCheck size={18} />
                            <h3>Panduan Penanganan</h3>
                        </div>

                        <ol className="review-checklist">
                            {levelData.guidance.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="review-help-card">
                        <div className="review-help-title">
                            <Eye size={18} />
                            <h3>Yang Perlu Dilihat</h3>
                        </div>

                        <ul className="review-bullet-list">
                            {levelData.watchItems.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="review-help-card warning">
                        <h3>Kapan Naik Status?</h3>
                        <p>{levelData.escalationRule}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}