import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Navbar />
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}