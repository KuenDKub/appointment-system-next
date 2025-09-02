import { prisma } from "@/server/lib/prisma";
import { withErrorHandler } from "@/server/helpers/error-handler";
import { createCustomerSchema, updateCustomerSchema, getCustomersSchema } from "@/schemas/server/customer-schema";
import { CreateCustomerInput, UpdateCustomerInput, GetCustomersInput } from "@/schemas/server/customer-schema";

export class CustomerController {
  static createCustomer = withErrorHandler(async (data: CreateCustomerInput) => {
    const validatedData = createCustomerSchema.parse(data);

    const customer = await prisma.customer.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        address: validatedData.address,
        birthDate: validatedData.birthDate ? new Date(validatedData.birthDate) : null,
        preferences: validatedData.preferences || {},
        user: {
          create: {
            email: `${validatedData.firstName.toLowerCase()}.${validatedData.lastName.toLowerCase()}@customer.com`,
            password: "temporary_password", // TODO: Generate secure password
            role: "CUSTOMER",
          },
        },
      },
      include: {
        user: true,
      },
    });

    return { success: true, customer };
  });

  static updateCustomer = withErrorHandler(async (data: UpdateCustomerInput) => {
    const validatedData = updateCustomerSchema.parse(data);

    const customer = await prisma.customer.update({
      where: { id: validatedData.id },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        address: validatedData.address,
        birthDate: validatedData.birthDate ? new Date(validatedData.birthDate) : null,
        preferences: validatedData.preferences,
      },
      include: {
        user: true,
      },
    });

    return { success: true, customer };
  });

  static getCustomers = withErrorHandler(async (params: GetCustomersInput) => {
    const validatedParams = getCustomersSchema.parse(params);

    const where: any = {};
    if (validatedParams.search) {
      where.OR = [
        { firstName: { contains: validatedParams.search, mode: "insensitive" } },
        { lastName: { contains: validatedParams.search, mode: "insensitive" } },
        { phone: { contains: validatedParams.search, mode: "insensitive" } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy: { [validatedParams.sortBy]: validatedParams.sortOrder },
        skip: (validatedParams.page - 1) * validatedParams.limit,
        take: validatedParams.limit,
        include: {
          user: true,
          bookings: {
            include: {
              service: true,
              staff: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5, // Limit to last 5 bookings
          },
        },
      }),
      prisma.customer.count({ where }),
    ]);

    return {
      success: true,
      customers,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        totalPages: Math.ceil(total / validatedParams.limit),
      },
    };
  });

  static deleteCustomer = withErrorHandler(async (id: string) => {
    await prisma.customer.delete({
      where: { id },
    });

    return { success: true };
  });

  static getCustomerById = withErrorHandler(async (id: string) => {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        user: true,
        bookings: {
          include: {
            service: true,
            staff: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    return { success: true, customer };
  });

  static updateCustomerPreferences = withErrorHandler(async (id: string, preferences: Record<string, any>) => {
    const customer = await prisma.customer.update({
      where: { id },
      data: { preferences },
    });

    return { success: true, customer };
  });

  static getCustomerStats = withErrorHandler(async (customerId: string) => {
    const [totalBookings, completedBookings, totalSpent] = await Promise.all([
      prisma.booking.count({
        where: { customerId },
      }),
      prisma.booking.count({
        where: {
          customerId,
          status: "COMPLETED",
        },
      }),
      prisma.booking.aggregate({
        where: {
          customerId,
          status: "COMPLETED",
        },
        _sum: {
          totalPrice: true,
        },
      }),
    ]);

    return {
      success: true,
      stats: {
        totalBookings,
        completedBookings,
        totalSpent: totalSpent._sum.totalPrice || 0,
        completionRate: totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0,
      },
    };
  });
}
