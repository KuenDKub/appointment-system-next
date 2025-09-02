import { prisma } from "@/server/lib/prisma";
import { withErrorHandler } from "@/server/helpers/error-handler";
import { dashboardStatsSchema, revenueStatsSchema, bookingStatsSchema, customerStatsSchema } from "@/schemas/server/dashboard-schema";

export class DashboardController {
  static getDashboardStats = withErrorHandler(async (dateFrom?: Date, dateTo?: Date) => {
    const where: any = {};
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = dateFrom;
      }
      if (dateTo) {
        where.createdAt.lte = dateTo;
      }
    }

    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalCustomers,
      totalRevenue,
      totalServices,
      totalStaff,
    ] = await Promise.all([
      prisma.booking.count({ where }),
      prisma.booking.count({ where: { ...where, status: "PENDING" } }),
      prisma.booking.count({ where: { ...where, status: "CONFIRMED" } }),
      prisma.booking.count({ where: { ...where, status: "COMPLETED" } }),
      prisma.booking.count({ where: { ...where, status: "CANCELLED" } }),
      prisma.customer.count(),
      prisma.booking.aggregate({
        where: { ...where, status: "COMPLETED" },
        _sum: { totalPrice: true },
      }),
      prisma.service.count({ where: { isActive: true } }),
      prisma.staff.count({ where: { isActive: true } }),
    ]);

    const stats = {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalCustomers,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      totalServices,
      totalStaff,
      completionRate: totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0,
      cancellationRate: totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0,
    };

    const validatedStats = dashboardStatsSchema.parse(stats);
    return { success: true, stats: validatedStats };
  });

  static getRevenueStats = withErrorHandler(async (dateFrom?: Date, dateTo?: Date, groupBy: "day" | "week" | "month" = "month") => {
    const where: any = { status: "COMPLETED" };
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = dateFrom;
      }
      if (dateTo) {
        where.createdAt.lte = dateTo;
      }
    }

    let groupByFormat: string;
    switch (groupBy) {
      case "day":
        groupByFormat = "YYYY-MM-DD";
        break;
      case "week":
        groupByFormat = "YYYY-WW";
        break;
      case "month":
        groupByFormat = "YYYY-MM";
        break;
      default:
        groupByFormat = "YYYY-MM";
    }

    const revenueData = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC(${groupBy}, "createdAt") as period,
        SUM("totalPrice") as revenue,
        COUNT(*) as bookings
      FROM "Booking"
      WHERE "status" = 'COMPLETED'
        ${dateFrom ? `AND "createdAt" >= ${dateFrom}` : ""}
        ${dateTo ? `AND "createdAt" <= ${dateTo}` : ""}
      GROUP BY DATE_TRUNC(${groupBy}, "createdAt")
      ORDER BY period
    `;

    const stats = {
      totalRevenue: 0,
      totalBookings: 0,
      averageRevenue: 0,
      revenueData: revenueData as any[],
    };

    if (revenueData && Array.isArray(revenueData) && revenueData.length > 0) {
      stats.totalRevenue = revenueData.reduce((sum: number, item: any) => sum + Number(item.revenue), 0);
      stats.totalBookings = revenueData.reduce((sum: number, item: any) => sum + Number(item.bookings), 0);
      stats.averageRevenue = stats.totalBookings > 0 ? stats.totalRevenue / stats.totalBookings : 0;
    }

    const validatedStats = revenueStatsSchema.parse(stats);
    return { success: true, stats: validatedStats };
  });

  static getBookingStats = withErrorHandler(async (dateFrom?: Date, dateTo?: Date) => {
    const where: any = {};
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = dateFrom;
      }
      if (dateTo) {
        where.createdAt.lte = dateTo;
      }
    }

    const [statusStats, serviceStats, staffStats] = await Promise.all([
      prisma.booking.groupBy({
        by: ["status"],
        where,
        _count: { id: true },
      }),
      prisma.booking.groupBy({
        by: ["serviceId"],
        where,
        _count: { id: true },
        _sum: { totalPrice: true },
      }),
      prisma.booking.groupBy({
        by: ["staffId"],
        where,
        _count: { id: true },
      }),
    ]);

    // Get service and staff details
    const serviceIds = serviceStats.map(s => s.serviceId).filter(Boolean);
    const staffIds = staffStats.map(s => s.staffId).filter(Boolean);

    const [services, staff] = await Promise.all([
      prisma.service.findMany({
        where: { id: { in: serviceIds } },
        select: { id: true, name: true },
      }),
      prisma.staff.findMany({
        where: { id: { in: staffIds } },
        select: { id: true, firstName: true, lastName: true },
      }),
    ]);

    const stats = {
      statusDistribution: statusStats.map(s => ({
        status: s.status,
        count: s._count.id,
      })),
      serviceDistribution: serviceStats.map(s => ({
        serviceId: s.serviceId,
        serviceName: services.find(service => service.id === s.serviceId)?.name || "Unknown",
        count: s._count.id,
        revenue: s._sum.totalPrice || 0,
      })),
      staffDistribution: staffStats.map(s => ({
        staffId: s.staffId,
        staffName: staff.find(staffMember => staffMember.id === s.staffId) 
          ? `${staff.find(staffMember => staffMember.id === s.staffId)?.firstName} ${staff.find(staffMember => staffMember.id === s.staffId)?.lastName}`
          : "Unknown",
        count: s._count.id,
      })),
    };

    const validatedStats = bookingStatsSchema.parse(stats);
    return { success: true, stats: validatedStats };
  });

  static getCustomerStats = withErrorHandler(async (dateFrom?: Date, dateTo?: Date) => {
    const where: any = {};
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = dateFrom;
      }
      if (dateTo) {
        where.createdAt.lte = dateTo;
      }
    }

    const [newCustomers, totalCustomers, customerBookings, customerRevenue] = await Promise.all([
      prisma.customer.count({ where }),
      prisma.customer.count(),
      prisma.booking.groupBy({
        by: ["customerId"],
        where,
        _count: { id: true },
        _sum: { totalPrice: true },
      }),
      prisma.booking.aggregate({
        where: { ...where, status: "COMPLETED" },
        _sum: { totalPrice: true },
      }),
    ]);

    const stats = {
      newCustomers,
      totalCustomers,
      totalRevenue: customerRevenue._sum.totalPrice || 0,
      averageBookingsPerCustomer: customerBookings.length > 0 
        ? customerBookings.reduce((sum, c) => sum + c._count.id, 0) / customerBookings.length 
        : 0,
      topCustomers: customerBookings
        .sort((a, b) => (b._count.id || 0) - (a._count.id || 0))
        .slice(0, 10)
        .map(c => ({
          customerId: c.customerId,
          totalBookings: c._count.id,
          totalSpent: c._sum.totalPrice || 0,
        })),
    };

    const validatedStats = customerStatsSchema.parse(stats);
    return { success: true, stats: validatedStats };
  });
}
