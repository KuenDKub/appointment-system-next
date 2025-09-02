"use client";

import { usePageQuery } from "@/client/hooks/data/usePageQuery";
import { Pagination as PaginatedModel } from "@/server/models/pagination";
import { Pagination } from "@heroui/react";

interface DataTableBottomContentProps {
  pagination: PaginatedModel | null | undefined;
}
const DataTableBottomContent = (props: DataTableBottomContentProps) => {
  const { pagination } = props;
  const { page, setPage } = usePageQuery();

  return (
    <div className="flex w-full justify-center">
      {(pagination?.totalCount ?? 0) > 0 && (
        <Pagination
          isCompact
          showControls
          showShadow
          page={page}
          classNames={{
            cursor: "bg-white text-primary border border-primary",
          }}
          total={pagination?.totalPages ?? 1}
          onChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default DataTableBottomContent;
