import AgentCard from "./AgentCard";

export default function AgentCardGrid({ agents, onSelectAgent }) {
    if (!agents.length) {
        return (
            <div className="rounded-[14px] border border-slate-100 bg-white p-6 text-center shadow-sm">
                <p className="m-0 text-sm text-slate-500">No agents found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
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