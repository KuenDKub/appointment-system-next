import { z } from "zod";

export const createBookingSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  staffId: z.string().min(1, "Staff ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  notes: z.string().optional(),
  totalPrice: z.number().min(0, "Total price must be positive"),
});

export const updateBookingSchema = z.object({
  id: z.string().min(1, "Booking ID is required"),
  status: z
    .enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"])
    .optional(),
  notes: z.string().optional(),
  totalPrice: z.number().min(0, "Total price must be positive").optional(),
});

export const getBookingsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  status: z
    .enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"])
    .optional(),
  customerId: z.string().optional(),
  staffId: z.string().optional(),
  serviceId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
export type GetBookingsInput = z.infer<typeof getBookingsSchema>;
