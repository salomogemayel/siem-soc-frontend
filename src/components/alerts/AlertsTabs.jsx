import { NavLink } from "react-router-dom";
import { BarChart3, Table2 } from "lucide-react";

export default function AlertsTabs() {
    const baseClass =
        "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition";

    return (
        <div className="mb-[18px] flex w-fit gap-2 rounded-[14px] border border-slate-100 bg-white p-1.5 shadow-sm">
            <NavLink
                to="/alerts"
                end
                className={({ isActive }) =>
                    `${baseClass} ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                }
            >
                <BarChart3 size={18} />
                <span>Overview</span>
            </NavLink>

            <NavLink
                to="/alerts-list"
                className={({ isActive }) =>
                    `${baseClass} ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                }
            >
                <Table2 size={18} />
                <span>Explorer</span>
            </NavLink>
        </div>
    );
}