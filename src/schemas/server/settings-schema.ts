import { z } from "zod";

export const businessSettingsSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  website: z.string().url("Invalid website URL").optional(),
  logo: z.string().url("Invalid logo URL").optional(),
  settings: z.record(z.string(), z.any()).optional(),
});

export const notificationSettingsSchema = z.object({
  email: z.boolean().default(true),
  sms: z.boolean().default(false),
  push: z.boolean().default(true),
  bookingConfirmation: z.boolean().default(true),
  bookingReminder: z.boolean().default(true),
  bookingCancellation: z.boolean().default(true),
  paymentConfirmation: z.boolean().default(true),
  systemUpdates: z.boolean().default(true),
});

export const systemSettingsSchema = z.object({
  maintenanceMode: z.boolean().default(false),
  maxBookingsPerDay: z.number().min(1).default(50),
  bookingTimeLimit: z.number().min(1).default(30),
  autoConfirmBookings: z.boolean().default(false),
  timezone: z.string().default("Asia/Bangkok"),
  dateFormat: z.string().default("DD/MM/YYYY"),
  timeFormat: z.string().default("HH:mm"),
});

export const appearanceSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "auto"]).default("light"),
  primaryColor: z.string().default("#8B5CF6"),
  secondaryColor: z.string().default("#EC4899"),
  accentColor: z.string().default("#F59E0B"),
  fontFamily: z.string().default("Inter"),
  borderRadius: z.enum(["none", "sm", "md", "lg", "xl"]).default("lg"),
});

export type BusinessSettingsInput = z.infer<typeof businessSettingsSchema>;
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
export type SystemSettingsInput = z.infer<typeof systemSettingsSchema>;
export type AppearanceSettingsInput = z.infer<typeof appearanceSettingsSchema>;
