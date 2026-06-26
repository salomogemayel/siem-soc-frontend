import { useState } from "react";
import { X } from "lucide-react";
import { changePassword } from "../../api/profileApi";

export default function ChangePasswordForm({ onClose }) {
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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[520px] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl"
            >
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <h2 className="m-0 text-lg font-semibold text-slate-900">
                            Change Password
                        </h2>
                        <p className="m-0 mt-1 text-sm text-slate-500">
                            Enter your current password and create a new one.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        <X size={18} />
                    </button>
                </div>

                {message && (
                    <p className="mb-4 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                        {message}
                    </p>
                )}

                <div className="space-y-3">
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

                <div className="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="h-10 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Save Password
                    </button>
                </div>
            </form>
        </div>
    );
}