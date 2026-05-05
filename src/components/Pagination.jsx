export default function Pagination({ page, totalPages, pageNumbers, setPage }) {
    return (
        <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(1)}>
                First
            </button>

            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
            </button>

            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={page === number ? "active" : ""}
                    onClick={() => setPage(number)}
                >
                    {number}
                </button>
            ))}

            <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

            <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(totalPages)}
            >
                Last
            </button>

            <span>
        Page {page} of {totalPages || 1}
      </span>
        </div>
    );
}