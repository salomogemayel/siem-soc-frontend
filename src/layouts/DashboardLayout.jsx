import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="flex min-h-screen w-full bg-[#f4f7fb]">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className="min-w-0 flex-1">
                <Navbar />
                <div className="p-5 md:p-7">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}