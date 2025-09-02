import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().optional(),
  isActive: z.boolean().default(true),
  image: z.string().url().optional(),
});

export const updateServiceSchema = z.object({
  id: z.string().min(1, "Service ID is required"),
  name: z.string().min(1, "Service name is required").optional(),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute").optional(),
  price: z.number().min(0, "Price must be positive").optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  image: z.string().url().optional(),
});

export const getServicesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type GetServicesInput = z.infer<typeof getServicesSchema>;
