import { Link } from "react-router-dom";
import {
    ArrowLeft,
    AlertTriangle,
    Database,
    Lock,
    ServerCrash,
    Settings,
    ShieldAlert,
    UserX,
} from "lucide-react";
import { attackPlaybooks } from "../data/attackPlaybooks";

const playbookSteps = {
    "brute-force": [
        [
            "Validasi Alert",
            "Periksa IP sumber, akun target, waktu kejadian, jumlah login gagal, serta apakah ada login berhasil setelah percobaan gagal.",
        ],
        [
            "Analisis Pola",
            "Identifikasi apakah percobaan berasal dari satu IP, banyak IP, menargetkan satu akun, atau banyak akun sekaligus.",
        ],
        [
            "Tindakan Awal",
            "Blokir sementara IP mencurigakan dan terapkan rate limiting atau account lockout untuk membatasi percobaan login berulang.",
        ],
        [
            "Amankan Akun",
            "Reset password akun terdampak, cek riwayat login terakhir, dan aktifkan MFA jika tersedia.",
        ],
        [
            "Monitoring",
            "Pantau log login setelah tindakan dilakukan untuk memastikan percobaan brute force tidak berlanjut.",
        ],
        [
            "Eskalasi",
            "Eskalasi ke admin atau tim teknis jika login berhasil, menyerang banyak akun, berasal dari banyak IP, atau terus berulang.",
        ],
    ],

    "dos-ddos": [
        [
            "Validasi Alert",
            "Periksa IP sumber, waktu kejadian, endpoint yang diserang, jumlah request, dan apakah layanan mengalami gangguan atau penurunan performa.",
        ],
        [
            "Analisis Pola",
            "Identifikasi apakah lonjakan traffic berasal dari satu IP, banyak IP, menargetkan satu endpoint, atau menyerang beberapa layanan sekaligus.",
        ],
        [
            "Tindakan Awal",
            "Blokir sementara IP mencurigakan dan terapkan rate limiting atau filtering traffic untuk membatasi request berlebihan.",
        ],
        [
            "Amankan Layanan",
            "Cek kondisi server, resource, dan layanan yang terdampak, lalu aktifkan firewall/WAF atau proteksi tambahan jika tersedia.",
        ],
        [
            "Monitoring",
            "Pantau traffic dan log server setelah tindakan dilakukan untuk memastikan serangan DDoS tidak berlanjut dan layanan kembali normal.",
        ],
        [
            "Eskalasi",
            "Eskalasi ke admin atau tim teknis jika traffic tetap tinggi, serangan berasal dari banyak IP, atau layanan masih terganggu.",
        ],
    ],

    "sql-injection": [
        [
            "Validasi Alert",
            "Periksa URL, parameter input, payload mencurigakan, waktu kejadian, IP sumber, akun pengguna, dan agent/server yang menerima request.",
        ],
        [
            "Analisis Pola Serangan",
            "Identifikasi apakah payload mengandung pola SQL Injection seperti ' OR '1'='1, UNION SELECT, komentar SQL, karakter khusus, atau percobaan akses berulang pada parameter tertentu.",
        ],
        [
            "Periksa Dampak ke Aplikasi",
            "Cek apakah request menghasilkan error database, perubahan data, akses tidak sah, atau respons aplikasi yang tidak normal.",
        ],
        [
            "Lakukan Tindakan Awal",
            "Blokir sementara IP mencurigakan, aktifkan atau perketat rule WAF, dan batasi request pada endpoint yang terindikasi diserang.",
        ],
        [
            "Amankan Input dan Query",
            "Validasi input, gunakan parameterized query atau prepared statement, hindari query dinamis yang langsung menggabungkan input pengguna, dan lakukan sanitasi parameter.",
        ],
        [
            "Monitoring dan Eskalasi",
            "Pantau log web, log aplikasi, dan log database setelah tindakan dilakukan. Eskalasi ke admin atau developer jika ditemukan percobaan berulang, error database, perubahan data, atau indikasi akses tidak sah.",
        ],
    ],

    "unauthorized-access": [
        [
            "Validasi Alert",
            "Periksa IP sumber, akun pengguna, role akun, waktu kejadian, endpoint yang diakses, dan status request seperti 403 atau 200 pada halaman sensitif.",
        ],
        [
            "Analisis Pola",
            "Identifikasi apakah pengguna mencoba mengakses halaman yang tidak sesuai hak akses, melakukan force browsing, mengubah parameter URL, atau mengakses endpoint sensitif secara berulang.",
        ],
        [
            "Tindakan Awal",
            "Tinjau hak akses akun, validasi session/token, dan periksa apakah akses berhasil terjadi. Jika mencurigakan, batasi sementara akses akun atau endpoint terkait.",
        ],
        [
            "Amankan Layanan",
            "Pastikan kontrol akses diterapkan di sisi server, gunakan prinsip deny by default, periksa kembali role dan permission, serta pastikan pengguna hanya dapat mengakses data miliknya.",
        ],
        [
            "Monitoring",
            "Pantau log akses setelah tindakan dilakukan untuk memastikan tidak ada percobaan akses tidak sah yang berulang pada endpoint sensitif.",
        ],
        [
            "Eskalasi",
            "Eskalasi ke Tim SDI atau admin teknis jika pengguna berhasil mengakses data/fungsi yang tidak sesuai hak, menargetkan banyak endpoint sensitif, atau menyebabkan perubahan data.",
        ],
    ],

    "system-issue": [
        [
            "Validasi Alert",
            "Periksa jenis error, service yang terdampak, waktu kejadian, agent/server, serta apakah error berdampak pada layanan CIS.",
        ],
        [
            "Analisis Penyebab",
            "Cek resource server seperti CPU, memory, disk, network, status service, dan log sistem yang berkaitan.",
        ],
        [
            "Tindakan Awal",
            "Restart service jika aman dilakukan, bersihkan resource jika disk penuh, dan periksa konfigurasi service.",
        ],
        [
            "Pemulihan Layanan",
            "Pastikan service kembali aktif dan fungsi utama CIS dapat digunakan normal.",
        ],
        [
            "Monitoring",
            "Pantau log sistem dan status service setelah tindakan dilakukan untuk memastikan error tidak berulang.",
        ],
        [
            "Eskalasi",
            "Eskalasi ke admin sistem jika service gagal berjalan, resource kritis penuh, atau error terjadi berulang.",
        ],
    ],
};

const iconMap = {
    "brute-force": Lock,
    "dos-ddos": ServerCrash,
    "sql-injection": Database,
    "unauthorized-access": UserX,
    "system-issue": Settings,
};

export default function AttackPlaybookDetail({ slug }) {
    const playbook = attackPlaybooks[slug];

    if (!playbook) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">
                    Playbook tidak ditemukan
                </h1>

                <Link
                    to="/playbook"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Playbook
                </Link>
            </div>
        );
    }

    const steps = playbookSteps[slug] || [];
    const Icon = iconMap[slug] || ShieldAlert;

    return (
        <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
                    <Link to="/playbook" className="text-blue-600 hover:underline">
                        Playbook
                    </Link>
                    <span>/</span>
                    <strong className="text-slate-900">{playbook.title}</strong>
                </div>

                <Link
                    to="/playbook"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Playbook
                </Link>

                <div className="mt-5">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Panduan {playbook.title}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        Checklist operasional SOC untuk menangani alert{" "}
                        {playbook.title.toLowerCase()}.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Icon size={30} />
                        </div>
                        <div>
                            <span className="text-sm text-slate-500">Kategori</span>
                            <strong className="block text-blue-600">
                                {playbook.category}
                            </strong>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                            <AlertTriangle size={30} />
                        </div>
                        <div>
                            <span className="text-sm text-slate-500">Level</span>
                            <strong className="block text-amber-600">
                                {playbook.level}
                            </strong>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <ShieldAlert size={30} />
                        </div>
                        <div>
                            <span className="text-sm text-slate-500">Prioritas</span>
                            <strong className="block text-red-600">
                                {playbook.priority}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-4">
                    <h2 className="text-xl font-bold text-slate-900">
                        Checklist Operasional SOC
                    </h2>
                </div>

                <div className="overflow-x-auto p-5">
                    <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200 text-left text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                        <tr>
                            <th className="w-20 px-5 py-4 font-bold">No</th>
                            <th className="w-64 px-5 py-4 font-bold">Tahap SOC</th>
                            <th className="px-5 py-4 font-bold">Tindakan</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                        {steps.map(([stage, action], index) => (
                            <tr key={stage} className="hover:bg-slate-50">
                                <td className="px-5 py-4 align-top text-lg font-bold text-blue-600">
                                    {index + 1}
                                </td>
                                <td className="px-5 py-4 align-top font-bold text-slate-900">
                                    {stage}
                                </td>
                                <td className="px-5 py-4 align-top leading-6 text-slate-700">
                                    {action}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*<div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">*/}
            {/*    <h2 className="mb-4 text-xl font-bold text-slate-900">Aksi Cepat</h2>*/}

            {/*    <div className="grid gap-4 md:grid-cols-3">*/}
            {/*        <Link*/}
            {/*            to="/logs"*/}
            {/*            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-blue-500 px-5 py-4 text-sm font-bold text-blue-600 transition hover:bg-blue-50"*/}
            {/*        >*/}
            {/*            <FileText size={22} />*/}
            {/*            Lihat Log Terkait*/}
            {/*        </Link>*/}

            {/*        <button*/}
            {/*            type="button"*/}
            {/*            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-blue-500 px-5 py-4 text-sm font-bold text-blue-600 transition hover:bg-blue-50"*/}
            {/*        >*/}
            {/*            <CheckCircle size={22} />*/}
            {/*            Tandai Selesai*/}
            {/*        </button>*/}

            {/*        <button*/}
            {/*            type="button"*/}
            {/*            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-blue-500 px-5 py-4 text-sm font-bold text-blue-600 transition hover:bg-blue-50"*/}
            {/*        >*/}
            {/*            <Upload size={22} />*/}
            {/*            Eskalasi*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}