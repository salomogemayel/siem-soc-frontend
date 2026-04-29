export default function Navbar() {
    return (
        <header className="navbar">
            <div>
                <h3>Security Monitoring Center</h3>
                <p>Monitor Wazuh agents, rules, alerts, and manager status</p>
            </div>

            <div className="navbar-user">
                <span className="status-dot"></span>
                <span>Connected</span>
            </div>
        </header>
    );
}