export default function Pagination({ page, totalPages, pageNumbers, setPage }) {
    const buttonClass =
        "h-[38px] min-w-[38px] rounded-[10px] border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-slate-700";

    const activeClass =
        "border-blue-600 bg-blue-600 text-white hover:bg-blue-600 hover:text-white";

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                type="button"
                className={buttonClass}
                disabled={page === 1}
                onClick={() => setPage(1)}
            >
                First
            </button>

            <button
                type="button"
                className={buttonClass}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>

            {pageNumbers.map((number) => (
                <button
                    type="button"
                    key={number}
                    className={`${buttonClass} ${page === number ? activeClass : ""}`}
                    onClick={() => setPage(number)}
                >
                    {number}
                </button>
            ))}

            <button
                type="button"
                className={buttonClass}
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

            <button
                type="button"
                className={buttonClass}
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(totalPages)}
            >
                Last
            </button>

            <span className="ml-1 text-sm text-slate-500">
                Page {page} of {totalPages || 1}
            </span>
        </div>
    );
}