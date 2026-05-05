export default function StatCard({ title, value, description, icon }) {
    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div>
                <p>{title}</p>
                <h2>{value}</h2>
                <span>{description}</span>
            </div>
        </div>
    );
}