import { useState } from "react";
import { User } from "lucide-react";
import UserDropdown from "./UserDropdown";

export default function UserMenu() {
    const [open, setOpen] = useState(false);

    const storedUser = localStorage.getItem("auth_user");
    const user = storedUser
        ? JSON.parse(storedUser)
        : { name: "Unknown User", role: "SOC User" };

    return (
        <div className="navbar-user-container">
            <div className="navbar-user" onClick={() => setOpen(!open)}>
                <div className="user-avatar">
                    <User size={16} />
                </div>

                <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role || "SOC Analyst"}</span>
                </div>
            </div>

            {open && <UserDropdown />}
        </div>
    );
}