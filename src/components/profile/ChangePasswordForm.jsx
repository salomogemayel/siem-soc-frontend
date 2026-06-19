import { useState } from "react";
import { changePassword } from "../../api/profileApi";

export default function ChangePasswordForm() {
    const [form, setForm] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await changePassword(form);
            setMessage("Password changed successfully");

            setForm({
                current_password: "",
                new_password: "",
                new_password_confirmation: "",
            });
        } catch (err) {
            setMessage("Failed to change password");
        }
    };

    const inputClass =
        "h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm"
        >
            <h2 className="m-0 text-lg font-semibold text-slate-900">
                Change Password
            </h2>

            {message && (
                <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    {message}
                </p>
            )}

            <div className="mt-4 space-y-3">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Current Password
                    </label>
                    <input
                        className={inputClass}
                        type="password"
                        name="current_password"
                        value={form.current_password}
                        onChange={handleChange}
                        placeholder="Enter current password"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        New Password
                    </label>
                    <input
                        className={inputClass}
                        type="password"
                        name="new_password"
                        value={form.new_password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Confirm New Password
                    </label>
                    <input
                        className={inputClass}
                        type="password"
                        name="new_password_confirmation"
                        value={form.new_password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    className="h-10 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Save Password
                </button>
            </div>
        </form>
    );
}