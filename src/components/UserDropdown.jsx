import { User, Settings, LogOut } from "lucide-react";

export default function UserDropdown() {
    return (
        <div className="user-dropdown">
            <button className="dropdown-item">
                <Settings size={16} />
                Settings
            </button>

            <button className="dropdown-item">
                <User size={16} />
                Profile
            </button>

            <button className="dropdown-item logout">
                <LogOut size={16} />
                Logout
            </button>
        </div>
    );
}