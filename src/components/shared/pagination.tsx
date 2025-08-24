"use client";

export default function PaginationContainer({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>; 
}) {
  return (
    <div className="flex gap-2 mt-4 lg:mt-10 items-center " >
      <button
        aria-label="Previous page "
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        className="px-3 py-1  rounded disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        className="px-3 py-1  rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
