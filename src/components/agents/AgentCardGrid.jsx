import AgentCard from "./AgentCard";

export default function AgentCardGrid({ agents, onSelectAgent }) {
    if (!agents.length) {
        return (
            <div className="card empty-agents-card">
                <p>No agents found.</p>
            </div>
        );
    }

    return (
        <div className="agent-card-grid">
            {agents.map((agent) => (
                <AgentCard
                    key={agent.id}
                    agent={agent}
                    onSelectAgent={onSelectAgent}
                />
            ))}
        </div>
    );
}