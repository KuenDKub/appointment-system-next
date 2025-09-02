import { z } from "zod";

export const dashboardStatsSchema = z.object({
  period: z.enum(["today", "week", "month", "year"]).default("month"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const revenueStatsSchema = z.object({
  period: z.enum(["daily", "weekly", "monthly", "yearly"]).default("monthly"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  groupBy: z.enum(["service", "staff", "customer"]).optional(),
});

export const bookingStatsSchema = z.object({
  period: z.enum(["daily", "weekly", "monthly", "yearly"]).default("monthly"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"]).optional(),
  serviceId: z.string().optional(),
  staffId: z.string().optional(),
});

export const customerStatsSchema = z.object({
  period: z.enum(["daily", "weekly", "monthly", "yearly"]).default("monthly"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  groupBy: z.enum(["age", "location", "preferences"]).optional(),
});

export type DashboardStatsInput = z.infer<typeof dashboardStatsSchema>;
export type RevenueStatsInput = z.infer<typeof revenueStatsSchema>;
export type BookingStatsInput = z.infer<typeof bookingStatsSchema>;
export type CustomerStatsInput = z.infer<typeof customerStatsSchema>;
