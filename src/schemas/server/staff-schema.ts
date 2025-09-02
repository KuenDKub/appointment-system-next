import { z } from "zod";

export const createStaffSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  position: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const updateStaffSchema = z.object({
  id: z.string().min(1, "Staff ID is required"),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const getStaffSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().optional(),
  position: z.string().optional(),
  isActive: z.boolean().optional(),
  sortBy: z.enum(["firstName", "lastName", "position", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
export type GetStaffInput = z.infer<typeof getStaffSchema>;
