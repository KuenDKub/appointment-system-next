import { prisma } from "@/server/lib/prisma";
import { withErrorHandler } from "@/server/helpers/error-handler";
import {
  createServiceSchema,
  updateServiceSchema,
  getServicesSchema,
} from "@/schemas/server/service-schema";
import {
  CreateServiceInput,
  UpdateServiceInput,
  GetServicesInput,
} from "@/schemas/server/service-schema";

export class ServiceController {
  static createService = withErrorHandler(async (data: CreateServiceInput) => {
    const validatedData = createServiceSchema.parse(data);

    const service = await prisma.service.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        duration: validatedData.duration,
        price: validatedData.price,
        category: validatedData.category,
        isActive: validatedData.isActive,
        image: validatedData.image,
      },
    });

    return { success: true, service };
  });

  static updateService = withErrorHandler(async (data: UpdateServiceInput) => {
    const validatedData = updateServiceSchema.parse(data);

    const service = await prisma.service.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        duration: validatedData.duration,
        price: validatedData.price,
        category: validatedData.category,
        isActive: validatedData.isActive,
        image: validatedData.image,
      },
    });

    return { success: true, service };
  });

  static getServices = withErrorHandler(async (params: GetServicesInput) => {
    const validatedParams = getServicesSchema.parse(params);

    const where: any = {};
    if (validatedParams.search) {
      where.OR = [
        { name: { contains: validatedParams.search, mode: "insensitive" } },
        {
          description: {
            contains: validatedParams.search,
            mode: "insensitive",
          },
        },
        { category: { contains: validatedParams.search, mode: "insensitive" } },
      ];
    }
    if (validatedParams.category) {
      where.category = validatedParams.category;
    }
    if (validatedParams.isActive !== undefined) {
      where.isActive = validatedParams.isActive;
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (validatedParams.page - 1) * validatedParams.limit,
        take: validatedParams.limit,
        include: {
          staffServices: {
            include: {
              staff: true,
            },
          },
          bookings: {
            where: {
              createdAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
              },
            },
          },
        },
      }),
      prisma.service.count({ where }),
    ]);

    return {
      success: true,
      services,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        totalPages: Math.ceil(total / validatedParams.limit),
      },
    };
  });

  static deleteService = withErrorHandler(async (id: string) => {
    await prisma.service.delete({
      where: { id },
    });

    return { success: true };
  });

  static toggleServiceStatus = withErrorHandler(async (id: string) => {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new Error("Service not found");
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: { isActive: !service.isActive },
    });

    return { success: true, service: updatedService };
  });

  static assignStaffToService = withErrorHandler(
    async (serviceId: string, staffId: string) => {
      const existingAssignment = await prisma.staffService.findUnique({
        where: {
          staffId_serviceId: {
            staffId,
            serviceId,
          },
        },
      });

      if (existingAssignment) {
        throw new Error("Staff is already assigned to this service");
      }

      const assignment = await prisma.staffService.create({
        data: {
          staffId,
          serviceId,
        },
        include: {
          staff: true,
          service: true,
        },
      });

      return { success: true, assignment };
    }
  );

  static removeStaffFromService = withErrorHandler(
    async (serviceId: string, staffId: string) => {
      await prisma.staffService.delete({
        where: {
          staffId_serviceId: {
            staffId,
            serviceId,
          },
        },
      });

      return { success: true };
    }
  );
}
