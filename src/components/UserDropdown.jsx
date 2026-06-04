import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

export default function UserDropdown() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed");
        } finally {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
            navigate("/login");
        }
    };

    return (
        <div className="user-dropdown">
            <button className="dropdown-item" onClick={() => navigate("/profile")}>
                <User size={16} />
                Profile
            </button>

            <button className="dropdown-item">
                <Settings size={16} />
                Settings
            </button>

            <button className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
            </button>
        </div>
    );
}