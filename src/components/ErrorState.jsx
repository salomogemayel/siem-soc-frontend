export default function ErrorState({ message = "Something went wrong" }) {
    return (
        <div className="rounded-[14px] border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {message}
        </div>
    );
}