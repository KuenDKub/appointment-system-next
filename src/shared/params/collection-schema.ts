import { z } from "zod";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../params/pagination-params";

export const orderValues = ["asc", "desc"] as const;

export const paginationSchema = z.object({
  page: z
    .union([z.string(), z.number()])
    .default(DEFAULT_PAGE)
    .transform((value) => Number(value)),
  pageSize: z
    .union([z.string(), z.number().max(DEFAULT_PAGE_SIZE)])
    .default(DEFAULT_PAGE_SIZE)
    .transform((value: any) => Number(value)),
});

export const qSchema = z.object({
  q: z.string().optional(),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;
export type QSchema = z.infer<typeof qSchema>;

export function defaultCollectionParams(query: { [key: string]: string }) {
  const pagination = paginationSchema.parse(query);
  const { q } = qSchema.parse(query);
  return {
    pagination,
    take: pagination.pageSize,
    skip: pagination.pageSize * (pagination.page - 1),
    q,
  };
}