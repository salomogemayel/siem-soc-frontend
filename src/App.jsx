import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Rules from "./pages/Rules";
import Agents from "./pages/Agents";
import Manager from "./pages/Manager";
import Alerts from "./pages/Alerts";
import AlertsList from "./pages/AlertsList";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile";
import Logs from "./pages/Logs";
import Notifications from "./pages/Notifications.jsx";
import Playbook from "./pages/Playbook";
import PlaybookLevelPage from "./pages/PlaybookLevelPage";
import AttackPlaybookDetail from "./pages/AttackPlaybookDetail";
import Settings from "./pages/Settings";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<Dashboard />} />

                        <Route path="/alerts" element={<Alerts />} />
                        <Route path="/alerts-list" element={<AlertsList />} />
                        <Route path="/agents" element={<Agents />} />
                        <Route path="/rules" element={<Rules />} />
                        <Route path="/manager" element={<Manager />} />
                        <Route path="/logs" element={<Logs />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/profile" element={<Profile />} />

                        <Route path="/settings" element={<Settings />} />

                        <Route path="/playbook" element={<Playbook />} />

                        <Route path="/playbook/perlu-ditinjau" element={<PlaybookLevelPage type="review" />} />
                        <Route path="/playbook/perlu-tindakan" element={<PlaybookLevelPage type="action" />} />
                        <Route path="/playbook/perlu-eskalasi" element={<PlaybookLevelPage type="escalation" />} />
                        <Route path="/playbook/brute-force" element={<AttackPlaybookDetail slug="brute-force" />} />
                        <Route path="/playbook/sql-injection" element={<AttackPlaybookDetail slug="sql-injection" />} />
                        <Route path="/playbook/unauthorized-access" element={<AttackPlaybookDetail slug="unauthorized-access" />} />
                        <Route path="/playbook/unauthorize-access" element={<AttackPlaybookDetail slug="unauthorized-access" />} />
                        <Route path="/playbook/dos-ddos" element={<AttackPlaybookDetail slug="dos-ddos" />} />
                        <Route path="/playbook/system-issue" element={<AttackPlaybookDetail slug="system-issue" />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;