import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/dashboard.css";
import "./styles/manager.css";
import "./styles/rules.css";
import "./styles/agents.css";
import "./styles/alerts.css";
import "./styles/auth.css";
import "./styles/profile.css";
import "./styles/logs.css";
import "./styles/notifications.css";
import "./styles/playbook.css";
import "./styles/attack-playbook.css";
import "./styles/playbook-review.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);