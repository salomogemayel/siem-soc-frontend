import { User } from "lucide-react";

export default function ProfileCard({ user }) {
    return (
        <div className="profile-card card">
            <h2>Account Information</h2>

            <div className="profile-card-content">
                <div className="profile-avatar">
                    <User size={48} />
                </div>

                <div className="profile-info-list">
                    <div>
                        <span>Full Name</span>
                        <strong>{user?.name || "-"}</strong>
                    </div>

                    <div>
                        <span>Email</span>
                        <strong>{user?.email || "-"}</strong>
                    </div>

                    <div>
                        <span>Role</span>
                        <strong>{user?.role || "SOC Analyst"}</strong>
                    </div>

                    <div>
                        <span>Status</span>
                        <strong className="status-active">{user?.status || "active"}</strong>
                    </div>

                    <div>
                        <span>Last Login</span>
                        <strong>{user?.last_login_at || "-"}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}