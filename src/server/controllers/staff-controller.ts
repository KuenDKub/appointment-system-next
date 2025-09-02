import { prisma } from "@/server/lib/prisma";
import { withErrorHandler } from "@/server/helpers/error-handler";
import {
  createStaffSchema,
  updateStaffSchema,
  getStaffSchema,
} from "@/schemas/server/staff-schema";
import {
  CreateStaffInput,
  UpdateStaffInput,
  GetStaffInput,
} from "@/schemas/server/staff-schema";

export class StaffController {
  static createStaff = withErrorHandler(async (data: CreateStaffInput) => {
    const validatedData = createStaffSchema.parse(data);

    const staff = await prisma.staff.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        position: validatedData.position,
        bio: validatedData.bio,
        avatar: validatedData.avatar,
        isActive: validatedData.isActive,
        user: {
          create: {
            email: `${validatedData.firstName.toLowerCase()}.${validatedData.lastName.toLowerCase()}@staff.com`,
            password: "temporary_password", // TODO: Generate secure password
            role: "STAFF",
          },
        },
      },
      include: {
        user: true,
      },
    });

    return { success: true, staff };
  });

  static updateStaff = withErrorHandler(async (data: UpdateStaffInput) => {
    const validatedData = updateStaffSchema.parse(data);

    const staff = await prisma.staff.update({
      where: { id: validatedData.id },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        position: validatedData.position,
        bio: validatedData.bio,
        avatar: validatedData.avatar,
        isActive: validatedData.isActive,
      },
      include: {
        user: true,
      },
    });

    return { success: true, staff };
  });

  static getStaff = withErrorHandler(async (params: GetStaffInput) => {
    const validatedParams = getStaffSchema.parse(params);

    const where: any = {};
    if (validatedParams.search) {
      where.OR = [
        {
          firstName: { contains: validatedParams.search, mode: "insensitive" },
        },
        { lastName: { contains: validatedParams.search, mode: "insensitive" } },
        { position: { contains: validatedParams.search, mode: "insensitive" } },
      ];
    }
    if (validatedParams.position) {
      where.position = validatedParams.position;
    }
    if (validatedParams.isActive !== undefined) {
      where.isActive = validatedParams.isActive;
    }

    const [staff, total] = await Promise.all([
      prisma.staff.findMany({
        where,
        orderBy: { [validatedParams.sortBy]: validatedParams.sortOrder },
        skip: (validatedParams.page - 1) * validatedParams.limit,
        take: validatedParams.limit,
        include: {
          user: true,
          staffServices: {
            include: {
              service: true,
            },
          },
        },
      }),
      prisma.staff.count({ where }),
    ]);

    return {
      success: true,
      staff,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        totalPages: Math.ceil(total / validatedParams.limit),
      },
    };
  });

  static deleteStaff = withErrorHandler(async (id: string) => {
    await prisma.staff.delete({
      where: { id },
    });

    return { success: true };
  });

  static toggleStaffStatus = withErrorHandler(async (id: string) => {
    const staff = await prisma.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      throw new Error("Staff not found");
    }

    const updatedStaff = await prisma.staff.update({
      where: { id },
      data: { isActive: !staff.isActive },
    });

    return { success: true, staff: updatedStaff };
  });
}
