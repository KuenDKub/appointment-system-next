import { z } from "zod";

export const createPaymentSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  amount: z.number().min(0, "Amount must be positive"),
  method: z.enum(["CASH", "CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "E_WALLET"]),
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "REFUNDED"]).default("PENDING"),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export const updatePaymentSchema = z.object({
  id: z.string().min(1, "Payment ID is required"),
  amount: z.number().min(0, "Amount must be positive").optional(),
  method: z.enum(["CASH", "CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "E_WALLET"]).optional(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "REFUNDED"]).optional(),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export const getPaymentsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  bookingId: z.string().optional(),
  method: z.enum(["CASH", "CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "E_WALLET"]).optional(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "REFUNDED"]).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(["createdAt", "amount", "status"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
export type GetPaymentsInput = z.infer<typeof getPaymentsSchema>;
