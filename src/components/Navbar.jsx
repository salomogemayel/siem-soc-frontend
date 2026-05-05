import UserMenu from "./UserMenu";

export default function Navbar() {
    return (
        <header className="navbar">
            <div>
                <h3></h3>
                {/*<h3>Security Monitoring Center</h3>*/}
                {/*<p>Monitor Wazuh agents, rules, alerts, and manager status</p>*/}
            </div>

            <UserMenu />
        </header>
    );
}