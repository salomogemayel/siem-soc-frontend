import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className="main-content">
                <Navbar />
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}