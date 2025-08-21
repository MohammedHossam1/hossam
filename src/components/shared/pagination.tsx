"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationContainer({ total }: { total: number }) {
  const search = useSearchParams();
  const router = useRouter();
  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(search.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: true });
  };
  const page = parseInt(search.get("page") || "1");
  if (total <= 1) return null;

  return (
    <Pagination className="my-5" dir="ltr">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-main"
            onClick={() => {
              if (page != 1)
                setSearchParam("page", Math.max(1, page - 1).toString());
            }}
          />
        </PaginationItem>
        {page != 1 && page - 1 != 1 && (
          <PaginationItem
            className="custom-pagination"
            onClick={() => {
              setSearchParam("page", "1");
            }}
          >
            <span className="custom-span">1</span>
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page - 1 > 0 && (
          <PaginationItem
            onClick={() => {
              setSearchParam("page", (page - 1).toString());
            }}
            className="custom-pagination"
          >
            <span className="custom-span">{page - 1}</span>
          </PaginationItem>
        )}
        <PaginationItem className="custom-pagination !border-main !font-semibold">
          <span className="custom-span">{page}</span>
        </PaginationItem>
        {page + 1 <= total && (
          <PaginationItem
            className="custom-pagination"
            onClick={() => {
              setSearchParam("page", (page + 1).toString());
            }}
          >
            <span className="custom-span">{page + 1}</span>
          </PaginationItem>
        )}

        {page < total - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page != total && page + 1 != total && (
          <PaginationItem
            className="custom-pagination"
            onClick={() => {
              setSearchParam("page", total.toString());
            }}
          >
            <span className="custom-span">{total}</span>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className="text-main"
            onClick={() => {
              if (page != total)
                setSearchParam("page", Math.min(total, page + 1).toString());
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
