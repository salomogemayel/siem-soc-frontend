export default function Pagination({ page, totalPages, pageNumbers, setPage }) {
    const baseClass =
        "h-[38px] min-w-[38px] rounded-[10px] border px-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45";

    const inactiveClass =
        "border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-slate-700";

    const activeClass =
        "border-blue-600 bg-blue-600 text-white hover:bg-blue-600 hover:text-black";

    return (
        <div className="flex flex-wrap items-center gap-2 mt-3">
            <button
                type="button"
                className={`${baseClass} ${inactiveClass}`}
                disabled={page === 1}
                onClick={() => setPage(1)}
            >
                First
            </button>

            <button
                type="button"
                className={`${baseClass} ${inactiveClass}`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
               Prev
            </button>

            {pageNumbers.map((number) => (
                <button
                    type="button"
                    key={number}
                    // Mencegah konflik warna dengan menerapkan class secara kondisional
                    className={`${baseClass} ${page === number ? activeClass : inactiveClass}`}
                    onClick={() => setPage(number)}
                >
                    {number}
                </button>
            ))}

            <button
                type="button"
                className={`${baseClass} ${inactiveClass}`}
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

            <button
                type="button"
                className={`${baseClass} ${inactiveClass}`}
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(totalPages)}
            >
                Last
            </button>

            <span className="ml-1 text-sm text-black">
                Page {page} of {totalPages || 1}
            </span>
        </div>
    );
}