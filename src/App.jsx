import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Rules from "./pages/Rules";
import Agents from "./pages/Agents";
import Manager from "./pages/Manager";
import Alerts from "./pages/Alerts";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/manager" element={<Manager />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;