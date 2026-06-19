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
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 rounded-xl bg-slate-100 px-3 py-2 transition hover:bg-slate-200"
            >
                <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-blue-600 text-white">
                    <User size={16} />
                </div>

                <div className="hidden flex-col text-left sm:flex">
                    <span className="text-sm font-semibold text-slate-900">
                        {user.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {user.role || "SOC Analyst"}
                    </span>
                </div>
            </button>

            {open && <UserDropdown />}
        </div>
    );
}