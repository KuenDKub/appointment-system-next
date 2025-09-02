import { prisma } from "@/server/lib/prisma";
import { withErrorHandler } from "@/server/helpers/error-handler";
import { createNotificationSchema, updateNotificationSchema, getNotificationsSchema } from "@/schemas/server/notification-schema";
import { CreateNotificationInput, UpdateNotificationInput, GetNotificationsInput } from "@/schemas/server/notification-schema";

export class NotificationController {
  static createNotification = withErrorHandler(async (data: CreateNotificationInput) => {
    const validatedData = createNotificationSchema.parse(data);

    const notification = await prisma.notification.create({
      data: {
        userId: validatedData.userId,
        type: validatedData.type,
        title: validatedData.title,
        message: validatedData.message,
        data: validatedData.data as any,
        isRead: false,
      },
    });

    return { success: true, notification };
  });

  static updateNotification = withErrorHandler(async (data: UpdateNotificationInput) => {
    const validatedData = updateNotificationSchema.parse(data);

    const notification = await prisma.notification.update({
      where: { id: validatedData.id },
      data: {
        title: validatedData.title,
        message: validatedData.message,
        data: validatedData.data as any,
        isRead: validatedData.isRead,
      },
    });

    return { success: true, notification };
  });

  static getNotifications = withErrorHandler(async (params: GetNotificationsInput) => {
    const validatedParams = getNotificationsSchema.parse(params);

    const where: any = { userId: validatedParams.userId };
    if (validatedParams.type) {
      where.type = validatedParams.type;
    }
    if (validatedParams.isRead !== undefined) {
      where.isRead = validatedParams.isRead;
    }

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (validatedParams.page - 1) * validatedParams.limit,
        take: validatedParams.limit,
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      success: true,
      notifications,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        totalPages: Math.ceil(total / validatedParams.limit),
      },
    };
  });

  static markAsRead = withErrorHandler(async (id: string) => {
    const notification = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return { success: true, notification };
  });

  static markAllAsRead = withErrorHandler(async (userId: string) => {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    return { success: true };
  });

  static deleteNotification = withErrorHandler(async (id: string) => {
    await prisma.notification.delete({
      where: { id },
    });

    return { success: true };
  });

  static getUnreadCount = withErrorHandler(async (userId: string) => {
    const count = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    return { success: true, count };
  });

  static sendBookingConfirmation = withErrorHandler(async (userId: string, bookingId: string) => {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "BOOKING_CONFIRMATION",
        title: "ยืนยันการจอง",
        message: "การจองของคุณได้รับการยืนยันแล้ว",
        data: { bookingId },
        isRead: false,
      },
    });

    return { success: true, notification };
  });

  static sendReminder = withErrorHandler(async (userId: string, bookingId: string) => {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "BOOKING_REMINDER",
        title: "เตือนการนัดหมาย",
        message: "คุณมีการนัดหมายในวันพรุ่งนี้",
        data: { bookingId },
        isRead: false,
      },
    });

    return { success: true, notification };
  });

  static sendCancellation = withErrorHandler(async (userId: string, bookingId: string) => {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "BOOKING_CANCELLATION",
        title: "ยกเลิกการจอง",
        message: "การจองของคุณได้รับการยกเลิกแล้ว",
        data: { bookingId },
        isRead: false,
      },
    });

    return { success: true, notification };
  });

  static sendPromotion = withErrorHandler(async (userId: string, promotionData: any) => {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "SYSTEM_UPDATE",
        title: "โปรโมชั่นพิเศษ",
        message: "มีโปรโมชั่นใหม่สำหรับคุณ",
        data: { type: "promotion", ...promotionData },
        isRead: false,
      },
    });

    return { success: true, notification };
  });

  static sendSystemNotification = withErrorHandler(async (userId: string, title: string, message: string, data?: any) => {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "SYSTEM_UPDATE",
        title,
        message,
        data: data || {},
        isRead: false,
      },
    });

    return { success: true, notification };
  });
}
