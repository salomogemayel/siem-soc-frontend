import { useState } from "react";
import { User } from "lucide-react";
import UserDropdown from "./UserDropdown";

export default function UserMenu() {
    const [open, setOpen] = useState(false);

    const user = {
        name: "Admin User",
        role: "SOC Analyst",
    };

    return (
        <div className="navbar-user-container">
            <div className="navbar-user" onClick={() => setOpen(!open)}>
                <div className="user-avatar">
                    <User size={16} />
                </div>

                <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role}</span>
                </div>
            </div>

            {open && <UserDropdown />}
        </div>
    );
}