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
  // هل وصلنا لآخر صفحة؟
  const isLastPage = page >= totalPages;

  return (
    <div className="flex justify-center mt-6 lg:mt-10">
      <button
        aria-label="Load more"
        disabled={isLastPage}
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        className="px-6 py-2 bg-main text-black cursor-pointer disabled:opacity-50  disabled:cursor-auto transition-all duration-200 hover:bg-main/90"
      >
        {isLastPage ? "No more items" : "Load more"}
      </button>
    </div>
  );
}
