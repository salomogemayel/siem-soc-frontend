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

    const itemClass =
        "flex w-full items-center gap-2.5 bg-white px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50";

    return (
        <div className="absolute right-0 top-[52px] z-50 w-[180px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <button
                type="button"
                className={itemClass}
                onClick={() => navigate("/profile")}
            >
                <User size={16} />
                Profile
            </button>

            <button type="button" className={itemClass}>
                <Settings size={16} />
                Settings
            </button>

            <button
                type="button"
                className={`${itemClass} text-red-600 hover:bg-red-50`}
                onClick={handleLogout}
            >
                <LogOut size={16} />
                Logout
            </button>
        </div>
    );
}