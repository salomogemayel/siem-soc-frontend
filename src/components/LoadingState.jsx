export default function LoadingState({ message = "Loading data..." }) {
    return (
        <div className="rounded-[14px] border border-slate-100 bg-white p-4 text-sm font-medium text-slate-500 shadow-sm">
            {message}
        </div>
    );
}