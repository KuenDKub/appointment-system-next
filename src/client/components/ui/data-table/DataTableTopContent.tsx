"use client";

import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { usePageQuery } from "@/client/hooks/data/usePageQuery";
import { Pagination } from "@/server/models/pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@heroui/react";
import { debounce } from "lodash";
import { parseAsString, useQueryState } from "nuqs";

import PageSizeOption from "./DataTablePageSizeOption";

interface DataTableTopContentProps extends PropsWithChildren {
  pagination?: Pagination | null;
  withSearch?: boolean;
  actionButton?: ReactNode;
}

const DataTableTopContent = (props: DataTableTopContentProps) => {
  const { pagination, children, withSearch, actionButton } = props;

  const [q, setQ] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
  const [localSearch, setLocalSearch] = useState(q ?? "");
  const { resetPage } = usePageQuery();
  const router = useRouter();

  // Create a ref to store the debounced function
  const debouncedSearchRef = useRef(
    debounce((value: string) => {
      setQ(value).then(() => {
        resetPage();
        router.refresh();
      });
    }, 400)
  );

  // Update local search when URL query changes
  useEffect(() => {
    setLocalSearch(q ?? "");
  }, [q]);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-end gap-2 max-w-full ">
          <div className="flex w-full items-center justify-between gap-3 flex-wrap">
            {withSearch ? (
              <Input
                onClear={() => {
                  setLocalSearch("");
                  setQ("").then(() => {
                    resetPage();
                    router.refresh();
                  });
                }}
                placeholder={"ค้นหา..."}
                className="min-w-[200px] sm:w-fit"
                size="sm"
                value={localSearch}
                variant="bordered"
                startContent={<MagnifyingGlassIcon className="size-4" />}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocalSearch(value);
                  debouncedSearchRef.current(value);
                }}
              />
            ) : (
              <div />
            )}
            {actionButton}
          </div>
          <div className="max-w-full">{children}</div>
        </div>
        {pagination && <PageSizeOption pagination={pagination} />}
      </div>
    );
  }, [pagination?.totalCount, localSearch, actionButton, children, withSearch]);

  return topContent;
};

export default DataTableTopContent;
