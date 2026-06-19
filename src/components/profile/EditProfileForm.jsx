import { useEffect, useState } from "react";
import { updateProfile } from "../../api/profileApi";

export default function EditProfileForm({ user = {}, onUpdated }) {
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
        <form
            onSubmit={handleSubmit}
            className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm"
        >
            <h2 className="m-0 text-lg font-semibold text-slate-900">
                Edit Profile
            </h2>

            {message && (
                <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    {message}
                </p>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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

            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    className="h-10 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}