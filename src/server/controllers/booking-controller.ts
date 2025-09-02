import { prisma } from "@/server/lib/prisma";
import { withErrorHandler } from "@/server/helpers/error-handler";
import { createBookingSchema, updateBookingSchema, getBookingsSchema } from "@/schemas/server/booking-schema";
import { CreateBookingInput, UpdateBookingInput, GetBookingsInput } from "@/schemas/server/booking-schema";

export class BookingController {
  static createBooking = withErrorHandler(async (data: CreateBookingInput) => {
    const validatedData = createBookingSchema.parse(data);

    // Check if the time slot is available
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        staffId: validatedData.staffId,
        date: new Date(validatedData.date),
        startTime: new Date(validatedData.startTime),
        endTime: new Date(validatedData.endTime),
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
    });

    if (conflictingBooking) {
      throw new Error("This time slot is already booked");
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: validatedData.customerId,
        staffId: validatedData.staffId,
        serviceId: validatedData.serviceId,
        date: new Date(validatedData.date),
        startTime: new Date(validatedData.startTime),
        endTime: new Date(validatedData.endTime),
        notes: validatedData.notes,
        totalPrice: validatedData.totalPrice,
      },
      include: {
        customer: true,
        staff: true,
        service: true,
      },
    });

    return { success: true, booking };
  });

  static updateBooking = withErrorHandler(async (data: UpdateBookingInput) => {
    const validatedData = updateBookingSchema.parse(data);

    const booking = await prisma.booking.update({
      where: { id: validatedData.id },
      data: {
        status: validatedData.status,
        notes: validatedData.notes,
        totalPrice: validatedData.totalPrice,
      },
      include: {
        customer: true,
        staff: true,
        service: true,
      },
    });

    return { success: true, booking };
  });

  static getBookings = withErrorHandler(async (params: GetBookingsInput) => {
    const validatedParams = getBookingsSchema.parse(params);

    const where: any = {};
    if (validatedParams.status) {
      where.status = validatedParams.status;
    }
    if (validatedParams.customerId) {
      where.customerId = validatedParams.customerId;
    }
    if (validatedParams.staffId) {
      where.staffId = validatedParams.staffId;
    }
    if (validatedParams.serviceId) {
      where.serviceId = validatedParams.serviceId;
    }
    if (validatedParams.dateFrom || validatedParams.dateTo) {
      where.date = {};
      if (validatedParams.dateFrom) {
        where.date.gte = new Date(validatedParams.dateFrom);
      }
      if (validatedParams.dateTo) {
        where.date.lte = new Date(validatedParams.dateTo);
      }
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (validatedParams.page - 1) * validatedParams.limit,
        take: validatedParams.limit,
        include: {
          customer: true,
          staff: true,
          service: true,
        },
      }),
      prisma.booking.count({ where }),
    ]);

    return {
      success: true,
      bookings,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        totalPages: Math.ceil(total / validatedParams.limit),
      },
    };
  });

  static cancelBooking = withErrorHandler(async (id: string) => {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status === "CANCELLED") {
      throw new Error("Booking is already cancelled");
    }

    if (booking.status === "COMPLETED") {
      throw new Error("Cannot cancel completed booking");
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return { success: true, booking: updatedBooking };
  });

  static confirmBooking = withErrorHandler(async (id: string) => {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== "PENDING") {
      throw new Error("Only pending bookings can be confirmed");
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });

    return { success: true, booking: updatedBooking };
  });

  static completeBooking = withErrorHandler(async (id: string) => {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== "CONFIRMED") {
      throw new Error("Only confirmed bookings can be completed");
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: "COMPLETED" },
    });

    return { success: true, booking: updatedBooking };
  });
}
