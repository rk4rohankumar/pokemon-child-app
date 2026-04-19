const Pagination = ({ page, totalPages, onPrev, onNext }) => (
  <nav
    className="flex items-center justify-center gap-4 mt-6"
    aria-label="Pagination"
  >
    <button
      type="button"
      onClick={onPrev}
      disabled={page <= 1}
      aria-label="Previous page"
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      Prev
    </button>
    <span aria-live="polite" className="text-sm text-gray-700">
      Page {page}
      {totalPages ? ` of ${totalPages}` : ""}
    </span>
    <button
      type="button"
      onClick={onNext}
      disabled={totalPages ? page >= totalPages : false}
      aria-label="Next page"
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      Next
    </button>
  </nav>
);

export default Pagination;
