"use client";

import { usePageQuery } from "@/client/hooks/data/usePageQuery";
import { Pagination } from "@/server/models/pagination";
import { DEFAULT_PAGE_SIZE } from "@/shared/params/pagination-params";
import { parseAsInteger, useQueryState } from "nuqs";

interface PageSizeOptionProps {
  pagination: Pagination | null | undefined;
}

const PageSizeOption = (props: PageSizeOptionProps) => {
  const { pagination } = props;
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger
      .withDefault(DEFAULT_PAGE_SIZE)
      .withOptions({ shallow: false })
  );
  const { resetPage } = usePageQuery();

  return (
    <div className="flex items-center justify-between">
      <span className="text-small text-default-400">{`ทั้งหมด ${
        pagination?.totalCount ?? 0
      } แถว`}</span>
      <label className="flex items-center text-small text-default-400">
        {`แสดงต่อหน้า: `}
        <select
          className="cursor-pointer bg-transparent text-small text-default-400 outline-none"
          value={pageSize}
          onChange={(e) => {
            resetPage();
            setPageSize(Number(e.target.value));
          }}
        >
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </label>
    </div>
  );
};

export default PageSizeOption;
