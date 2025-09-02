import { z } from "zod";

export const createNotificationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  type: z.enum(["BOOKING_CONFIRMATION", "BOOKING_REMINDER", "BOOKING_CANCELLATION", "PAYMENT_CONFIRMATION", "SYSTEM_UPDATE"]),
  data: z.record(z.string(), z.any()).optional(),
});

export const updateNotificationSchema = z.object({
  id: z.string().min(1, "Notification ID is required"),
  title: z.string().min(1, "Title is required").optional(),
  message: z.string().min(1, "Message is required").optional(),
  isRead: z.boolean().optional(),
  data: z.record(z.string(), z.any()).optional(),
});

export const getNotificationsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  userId: z.string().optional(),
  type: z.enum(["BOOKING_CONFIRMATION", "BOOKING_REMINDER", "BOOKING_CANCELLATION", "PAYMENT_CONFIRMATION", "SYSTEM_UPDATE"]).optional(),
  isRead: z.boolean().optional(),
  sortBy: z.enum(["createdAt", "title", "type"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
export type GetNotificationsInput = z.infer<typeof getNotificationsSchema>;
