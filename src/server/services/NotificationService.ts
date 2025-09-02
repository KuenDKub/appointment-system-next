import { prisma } from "@/server/lib/prisma";

export interface NotificationData {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "BOOKING_CONFIRMATION" | "BOOKING_REMINDER" | "BOOKING_CANCELLATION" | "PAYMENT_CONFIRMATION" | "SYSTEM_UPDATE";
  isRead: boolean;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

export class NotificationService {
  /**
   * Create a new notification
   */
  static async createNotification(
    data: Omit<NotificationData, "id" | "createdAt" | "updatedAt">
  ): Promise<NotificationData> {
    return await prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        isRead: data.isRead,
        data: data.data,
      },
    });
  }

  /**
   * Get notifications for a specific user
   */
  static async getUserNotifications(
    userId: string,
    limit: number = 50
  ): Promise<NotificationData[]> {
    return await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  /**
   * Get unread notifications count for a user
   */
  static async getUnreadCount(userId: string): Promise<number> {
    return await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<void> {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  /**
   * Send booking confirmation notification
   */
  static async sendBookingConfirmation(
    bookingId: string,
    userId: string
  ): Promise<void> {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true, customer: true },
    });

    if (!booking) return;

    await this.createNotification({
      userId,
      title: "การจองได้รับการยืนยัน",
      message: `การจองบริการ ${booking.service.name} ได้รับการยืนยันแล้ว`,
      type: "BOOKING_CONFIRMATION",
      data: { bookingId },
      isRead: false,
    });
  }

  /**
   * Send reminder notification
   */
  static async sendReminder(bookingId: string, userId: string): Promise<void> {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true, customer: true },
    });

    if (!booking) return;

    await this.createNotification({
      userId,
      title: "เตือนการจอง",
      message: `อย่าลืมการจองบริการ ${booking.service.name}`,
      type: "BOOKING_REMINDER",
      data: { bookingId },
      isRead: false,
    });
  }

  /**
   * Send cancellation notification
   */
  static async sendCancellation(bookingId: string, userId: string): Promise<void> {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true, customer: true },
    });

    if (!booking) return;

    await this.createNotification({
      userId,
      title: "การจองถูกยกเลิก",
      message: `การจองบริการ ${booking.service.name} ถูกยกเลิกแล้ว`,
      type: "BOOKING_CANCELLATION",
      data: { bookingId },
      isRead: false,
    });
  }

  /**
   * Send promotion notification to all customers
   */
  static async sendPromotion(
    title: string,
    message: string
  ): Promise<void> {
    const customers = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
    });

    const notifications = customers.map((customer) => ({
      userId: customer.id,
      title,
      message,
      type: "SYSTEM_UPDATE" as const,
      data: { type: "promotion" },
      isRead: false,
    }));

    await prisma.notification.createMany({
      data: notifications,
    });
  }

  /**
   * Send system notification
   */
  static async sendSystemNotification(
    userId: string,
    title: string,
    message: string,
    data?: Record<string, any>
  ): Promise<void> {
    await this.createNotification({
      userId,
      title,
      message,
      type: "SYSTEM_UPDATE",
      data,
      isRead: false,
    });
  }

  /**
   * Clean up old notifications (older than 30 days)
   */
  static async cleanupOldNotifications(): Promise<void> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await prisma.notification.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
        isRead: true,
      },
    });
  }

  /**
   * Get notification statistics
   */
  static async getStats(): Promise<{
    total: number;
    unread: number;
    read: number;
  }> {
    const [total, unread, read] = await Promise.all([
      prisma.notification.count(),
      prisma.notification.count({ where: { isRead: false } }),
      prisma.notification.count({ where: { isRead: true } }),
    ]);

    return { total, unread, read };
  }
}
