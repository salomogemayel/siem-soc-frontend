import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    ShieldAlert,
    Server,
    ScrollText,
    Settings,
    Menu,
    User,
    FileText,
    Bell,
    BookOpen,
} from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
    const location = useLocation();

    const menus = [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
        { name: "Alerts", path: "/alerts", icon: <ShieldAlert size={18} /> },
        { name: "Agents", path: "/agents", icon: <Server size={18} /> },
        { name: "Rules", path: "/rules", icon: <ScrollText size={18} /> },
        { name: "Manager", path: "/manager", icon: <Settings size={18} /> },
        { name: "Logs", path: "/logs", icon: <FileText size={18} /> },
        { name: "Notification", path: "/notifications", icon: <Bell size={18} /> },
        { name: "Playbook", path: "/playbook", icon: <BookOpen size={18} /> },
        { name: "Profile", path: "/profile", icon: <User size={18} /> },
    ];

    const isActive = (path) => {
        if (path === "/alerts") {
            return location.pathname === "/alerts" || location.pathname === "/alerts-list";
        }

        return location.pathname === path;
    };

    return (
        <aside
            className={`hidden min-h-screen shrink-0 bg-slate-900 px-[18px] py-6 text-white transition-all duration-300 md:block ${
                collapsed ? "w-[82px]" : "w-[260px]"
            }`}
        >
            <div
                className={`mb-9 flex items-center justify-between ${
                    collapsed ? "flex-col gap-4" : ""
                }`}
            >
                <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                    <div className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-blue-600 font-bold">
                        S
                    </div>

                    {!collapsed && (
                        <div>
                            <h2 className="m-0 text-lg font-semibold text-white">SIEM SOC</h2>
                            <p className="mt-0.5 text-sm text-slate-400">Wazuh Dashboard</p>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    className="grid h-[38px] w-[38px] place-items-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="flex flex-col gap-2">
                {menus.map((menu) => (
                    <Link
                        key={menu.path}
                        to={menu.path}
                        className={`flex items-center gap-3 rounded-xl px-3.5 py-3 font-medium transition ${
                            collapsed ? "justify-center" : ""
                        } ${
                            isActive(menu.path)
                                ? "bg-slate-800 text-white"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        {menu.icon}
                        {!collapsed && <span>{menu.name}</span>}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}