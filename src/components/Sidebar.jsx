import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    ShieldAlert,
    Server,
    ScrollText,
    Settings,
    Menu,
} from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
    const location = useLocation();

    const menus = [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
        { name: "Alerts", path: "/alerts", icon: <ShieldAlert size={18} /> },
        { name: "Agents", path: "/agents", icon: <Server size={18} /> },
        { name: "Rules", path: "/rules", icon: <ScrollText size={18} /> },
        { name: "Manager", path: "/manager", icon: <Settings size={18} /> },
    ];

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-top">
                <div className="sidebar-logo">
                    <div className="logo-icon">S</div>

                    {!collapsed && (
                        <div>
                            <h2>SIEM SOC</h2>
                            <p>Wazuh Dashboard</p>
                        </div>
                    )}
                </div>

                <button
                    className="sidebar-toggle"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="sidebar-menu">
                {menus.map((menu) => (
                    <Link
                        key={menu.path}
                        to={menu.path}
                        className={`sidebar-link ${
                            location.pathname === menu.path ? "active" : ""
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