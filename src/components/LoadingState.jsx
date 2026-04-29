export default function LoadingState({ message = "Loading data..." }) {
    return <div className="state-card">{message}</div>;
}