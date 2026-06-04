import UserMenu from "./UserMenu";
import NotificationBell from "./notifications/NotificationBell";

export default function Navbar() {
    return (
        <header className="navbar">
            <div>
                <h3></h3>
                {/* Optional title */}
                {/* <h3>Security Monitoring Center</h3> */}
                {/* <p>Monitor Wazuh agents, rules, alerts, and manager status</p> */}
            </div>

            <div className="navbar-actions">
                <NotificationBell />
                <UserMenu />
            </div>
        </header>
    );
}