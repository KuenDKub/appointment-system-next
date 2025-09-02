"use client";

import { Key, ReactNode } from "react";

import { Pagination } from "@/server/models/pagination";
import { orderValues } from "@/shared/params/collection-schema";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";

import { InlineLoading } from "../Loading";
import DataTableBottomContent from "./DataTableBottomContent";
import EmptyContent from "./EmptyContent";

export interface DataColumn<T> {
  key: (Key & keyof T) | "actions" | string;
  title: string;
  allowSorting?: boolean;
}

interface DataTableProps<T, O> {
  ariaLabel: string;
  pagination?: Pagination | null;
  columns: DataColumn<T>[];
  items?: Iterable<T>;
  rowId: string;
  renderCell: (data: T, columnKey: Key, rowIndex: number) => ReactNode;
  topContent?: ReactNode;
  onRowClicked?: (item: T) => void;
  isLoading?: boolean;
}

const DataTable = <T, O extends string>(props: DataTableProps<T, O>) => {
  const {
    columns,
    items,
    pagination,
    topContent,
    rowId,
    renderCell,
    ariaLabel,
    onRowClicked,
    isLoading = false,
  } = props;
  const [sortDescriptor, setSortDescriptor] = useQueryStates(
    {
      order: parseAsStringLiteral(orderValues),
      orderBy: parseAsString.withDefault("createdAt"),
    },
    { shallow: false }
  );

  const bottomContent = pagination && (
    <DataTableBottomContent pagination={pagination} />
  );

  const tableSortDescriptor = {
    column: sortDescriptor.orderBy,
    direction: sortDescriptor.order == "desc" ? "descending" : "ascending",
  } as SortDescriptor;

  return (
    <Table
      isHeaderSticky
      aria-label={ariaLabel}
      topContent={topContent}
      topContentPlacement="outside"
      bottomContentPlacement="outside"
      sortDescriptor={tableSortDescriptor}
      onSortChange={(descriptor: SortDescriptor) => {
        let order: "asc" | "desc" =
          descriptor.direction == "ascending" ? "asc" : "desc";
        const orderBy = descriptor.column;
        if (
          orderBy === sortDescriptor.orderBy &&
          order === sortDescriptor.order
        ) {
          order = sortDescriptor.order === "asc" ? "desc" : "asc";
        }
        setSortDescriptor({
          order,
          orderBy: orderBy?.toString() ?? "createdAt",
        });
      }}
      bottomContent={bottomContent}
      classNames={{ th: "bg-secondary text-white" }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn
            key={column.key}
            align={"start"}
            allowsSorting={column.allowSorting}
          >
            {column.title}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={<EmptyContent />}
        items={items}
        isLoading={isLoading}
        loadingContent={<InlineLoading message="กำลังโหลดข้อมูล..." />}
      >
        {(item) => {
          const kv = item as Record<string, any>;
          const key = `${kv[rowId]}`;

          const index = Array.from(items ?? []).indexOf(item);
          const isLast = index === Array.from(items ?? []).length - 1;

          return (
            <TableRow
              className={`${isLast ? "" : "border-b"} ${
                onRowClicked ? "cursor-pointer hover:bg-gray-50" : ""
              }`}
              key={key}
              onClick={onRowClicked ? () => onRowClicked(item) : undefined}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey, index)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default DataTable;
