import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login({ email, password });

            localStorage.setItem("auth_token", response.data.token);
            localStorage.setItem("auth_user", JSON.stringify(response.data.user));

            navigate("/");
        } catch (err) {
            setError("Email atau password salah.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div className="mb-6">
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                        S
                    </div>

                    <h1 className="m-0 text-2xl font-bold text-slate-900">
                        SIEM SOC Login
                    </h1>
                    <p className="m-0 mt-2 text-sm text-slate-500">
                        Sign in to access the security dashboard.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <button
                    disabled={loading}
                    className="h-10 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}