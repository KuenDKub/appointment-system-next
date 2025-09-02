"use client";

import { DashboardController } from "@/server/controllers/dashboard-controller";

export const getDashboardStatsAction = async (
  dateFrom?: Date,
  dateTo?: Date
) => {
  try {
    const result = await DashboardController.getDashboardStats(
      dateFrom,
      dateTo
    );
    return result;
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงสถิติแดชบอร์ด" };
  }
};

export const getRevenueStatsAction = async (
  dateFrom?: Date,
  dateTo?: Date,
  groupBy: "day" | "week" | "month" = "month"
) => {
  try {
    const result = await DashboardController.getRevenueStats(
      dateFrom,
      dateTo,
      groupBy
    );
    return result;
  } catch (error) {
    console.error("Error getting revenue stats:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงสถิติรายได้" };
  }
};

export const getBookingStatsAction = async (dateFrom?: Date, dateTo?: Date) => {
  try {
    const result = await DashboardController.getBookingStats(dateFrom, dateTo);
    return result;
  } catch (error) {
    console.error("Error getting booking stats:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงสถิติการจอง" };
  }
};

export const getCustomerStatsAction = async (
  dateFrom?: Date,
  dateTo?: Date
) => {
  try {
    const result = await DashboardController.getCustomerStats(dateFrom, dateTo);
    return result;
  } catch (error) {
    console.error("Error getting customer stats:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงสถิติลูกค้า" };
  }
};
