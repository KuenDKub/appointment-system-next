"use client";

import { NotificationController } from "@/server/controllers/notification-controller";
import {
  CreateNotificationInput,
  UpdateNotificationInput,
  GetNotificationsInput,
} from "@/schemas/server/notification-schema";

export const createNotificationAction = async (
  data: CreateNotificationInput
) => {
  try {
    const result = await NotificationController.createNotification(data);
    return result;
  } catch (error) {
    console.error("Error creating notification:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการสร้างการแจ้งเตือน" };
  }
};

export const updateNotificationAction = async (
  data: UpdateNotificationInput
) => {
  try {
    const result = await NotificationController.updateNotification(data);
    return result;
  } catch (error) {
    console.error("Error updating notification:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการอัปเดตการแจ้งเตือน" };
  }
};

export const getNotificationsAction = async (params: GetNotificationsInput) => {
  try {
    const result = await NotificationController.getNotifications(params);
    return result;
  } catch (error) {
    console.error("Error getting notifications:", error);
    return {
      success: false,
      error: "เกิดข้อผิดพลาดในการดึงข้อมูลการแจ้งเตือน",
    };
  }
};

export const markAsReadAction = async (id: string) => {
  try {
    const result = await NotificationController.markAsRead(id);
    return result;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return {
      success: false,
      error: "เกิดข้อผิดพลาดในการทำเครื่องหมายว่าอ่านแล้ว",
    };
  }
};

export const markAllAsReadAction = async (userId: string) => {
  try {
    const result = await NotificationController.markAllAsRead(userId);
    return result;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return {
      success: false,
      error: "เกิดข้อผิดพลาดในการทำเครื่องหมายว่าอ่านแล้วทั้งหมด",
    };
  }
};

export const deleteNotificationAction = async (id: string) => {
  try {
    const result = await NotificationController.deleteNotification(id);
    return result;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการลบการแจ้งเตือน" };
  }
};

export const getUnreadCountAction = async (userId: string) => {
  try {
    const result = await NotificationController.getUnreadCount(userId);
    return result;
  } catch (error) {
    console.error("Error getting unread count:", error);
    return {
      success: false,
      error: "เกิดข้อผิดพลาดในการดึงจำนวนที่ยังไม่ได้อ่าน",
    };
  }
};

export const sendBookingConfirmationAction = async (
  userId: string,
  bookingId: string
) => {
  try {
    const result = await NotificationController.sendBookingConfirmation(
      userId,
      bookingId
    );
    return result;
  } catch (error) {
    console.error("Error sending booking confirmation:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการส่งการยืนยันการจอง" };
  }
};

export const sendReminderAction = async (userId: string, bookingId: string) => {
  try {
    const result = await NotificationController.sendReminder(userId, bookingId);
    return result;
  } catch (error) {
    console.error("Error sending reminder:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการส่งการเตือน" };
  }
};

export const sendCancellationAction = async (
  userId: string,
  bookingId: string
) => {
  try {
    const result = await NotificationController.sendCancellation(
      userId,
      bookingId
    );
    return result;
  } catch (error) {
    console.error("Error sending cancellation:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการส่งการยกเลิก" };
  }
};

export const sendPromotionAction = async (
  userId: string,
  promotionData: any
) => {
  try {
    const result = await NotificationController.sendPromotion(
      userId,
      promotionData
    );
    return result;
  } catch (error) {
    console.error("Error sending promotion:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการส่งโปรโมชั่น" };
  }
};

export const sendSystemNotificationAction = async (
  userId: string,
  title: string,
  message: string,
  data?: any
) => {
  try {
    const result = await NotificationController.sendSystemNotification(
      userId,
      title,
      message,
      data
    );
    return result;
  } catch (error) {
    console.error("Error sending system notification:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการส่งการแจ้งเตือนระบบ" };
  }
};
