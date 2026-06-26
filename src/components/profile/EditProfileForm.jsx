import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateProfile } from "../../api/profileApi";

export default function EditProfileForm({ user = {}, onUpdated, onClose }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        setForm({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            department: user?.department || "",
        });
    }, [user]);

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
            await updateProfile(form);
            setMessage("Profile updated successfully");

            if (onUpdated) {
                await onUpdated();
            }
        } catch (err) {
            setMessage("Failed to update profile");
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
                className="w-full max-w-[640px] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl"
            >
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <h2 className="m-0 text-lg font-semibold text-slate-900">
                            Edit Profile
                        </h2>
                        <p className="m-0 mt-1 text-sm text-slate-500">
                            Update your account information.
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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Full Name
                        </label>
                        <input
                            className={inputClass}
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Email
                        </label>
                        <input
                            className={inputClass}
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Phone
                        </label>
                        <input
                            className={inputClass}
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Department
                        </label>
                        <input
                            className={inputClass}
                            name="department"
                            value={form.department}
                            onChange={handleChange}
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
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}