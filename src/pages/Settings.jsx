import { useState, useEffect } from "react";
import { createUser, getUsers } from "../api/userApi";
import { UserPlus, ShieldAlert, X, Users } from "lucide-react";

export default function Settings() {
    const authUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
    const isAdmin = authUser?.role === "Admin";

    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "SOC Analyst",
        department: "",
        phone: "",
    });

    // Ambil daftar user saat halaman dimuat
    useEffect(() => {
        if (isAdmin && activeTab === "users") {
            fetchUsers();
        }
    }, [isAdmin, activeTab]);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const response = await getUsers();
            setUsers(response.data.data || []);
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await createUser(formData);
            setMessage({ type: "success", text: "User berhasil ditambahkan!" });

            // Reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "SOC Analyst",
                department: "",
                phone: "",
            });

            // Refresh tabel user
            fetchUsers();

            // Tutup modal setelah sukses (opsional, beri jeda sedikit)
            setTimeout(() => {
                setIsModalOpen(false);
                setMessage({ type: "", text: "" });
            }, 1500);

        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menambahkan user. Pastikan Anda memiliki akses Admin.";
            setMessage({ type: "error", text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold text-slate-800">Settings</h1>

            <div className="flex flex-col gap-6 md:flex-row">
                {/* Sidebar Settings */}
                <div className="w-full shrink-0 md:w-64">
                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                activeTab === "users"
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            <Users size={18} />
                            User Management
                        </button>
                    </nav>
                </div>

                {/* Content Settings */}
                <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    {activeTab === "users" && (
                        <div>
                            {!isAdmin ? (
                                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                                    <ShieldAlert size={20} />
                                    <p className="text-sm font-medium">Akses Ditolak. Hanya role <b>Admin</b> yang dapat mengakses User Management.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Header Section */}
                                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800">User Management</h2>
                                            <p className="text-sm text-slate-500">Kelola akun tim SOC dan Administrator.</p>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                        >
                                            <UserPlus size={16} />
                                            Tambah User
                                        </button>
                                    </div>

                                    {/* Tabel User List */}
                                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                                        <table className="w-full text-left text-sm text-slate-600">
                                            <thead className="border-b border-slate-200 bg-slate-50 text-slate-700">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">Nama</th>
                                                <th className="px-4 py-3 font-medium">Email</th>
                                                <th className="px-4 py-3 font-medium">Role</th>
                                                <th className="px-4 py-3 font-medium">Department</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {loadingUsers ? (
                                                <tr>
                                                    <td colSpan="4" className="py-8 text-center text-slate-500">Memuat data...</td>
                                                </tr>
                                            ) : users.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="py-8 text-center text-slate-500">Belum ada user terdaftar.</td>
                                                </tr>
                                            ) : (
                                                users.map((user) => (
                                                    <tr key={user.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                                        <td className="px-4 py-3 font-medium text-slate-800">{user.name}</td>
                                                        <td className="px-4 py-3">{user.email}</td>
                                                        <td className="px-4 py-3">
                                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                                                    user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                    {user.role}
                                                                </span>
                                                        </td>
                                                        <td className="px-4 py-3">{user.department || "-"}</td>
                                                    </tr>
                                                ))
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Tambah User */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">Tambah User Baru</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {message.text && (
                                <div className={`rounded-lg p-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                    {message.text}
                                </div>
                            )}

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="SOC Analyst">SOC Analyst</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
                                >
                                    {loading ? "Menyimpan..." : "Simpan User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}