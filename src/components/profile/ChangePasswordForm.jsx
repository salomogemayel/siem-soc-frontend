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

    return (
        <form className="password-card card" onSubmit={handleSubmit}>
            <h2>Change Password</h2>

            {message && <p className="form-message">{message}</p>}

            <label>Current Password</label>
            <input
                type="password"
                name="current_password"
                value={form.current_password}
                onChange={handleChange}
                placeholder="Enter current password"
            />

            <label>New Password</label>
            <input
                type="password"
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
            />

            <label>Confirm New Password</label>
            <input
                type="password"
                name="new_password_confirmation"
                value={form.new_password_confirmation}
                onChange={handleChange}
                placeholder="Confirm new password"
            />

            <div className="form-actions">
                <button type="submit">Save Password</button>
            </div>
        </form>
    );
}