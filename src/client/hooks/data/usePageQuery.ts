"use client";

import { parseAsInteger, useQueryState } from "nuqs";

export function usePageQuery() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1).withOptions({ shallow: false }));
  const resetPage = () => setPage(1);
  return { page, setPage, resetPage };
}
