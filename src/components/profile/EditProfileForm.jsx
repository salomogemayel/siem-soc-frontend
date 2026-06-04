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

    return (
        <form className="profile-form card" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>

            {message && <p className="form-message">{message}</p>}

            <div className="profile-form-grid">
                <div>
                    <label>Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} />
                </div>

                <div>
                    <label>Email</label>
                    <input name="email" value={form.email} onChange={handleChange} />
                </div>

                <div>
                    <label>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} />
                </div>

                <div>
                    <label>Department</label>
                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="submit">Save Changes</button>
            </div>
        </form>
    );
}