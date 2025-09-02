import { prisma } from "@/server/lib/prisma";
import { withErrorHandler } from "@/server/helpers/error-handler";
import { createUserSchema, updateUserSchema, changePasswordSchema, getUsersSchema } from "@/schemas/server/user-schema";
import { CreateUserInput, UpdateUserInput, ChangePasswordInput, GetUsersInput } from "@/schemas/server/user-schema";
import bcrypt from "bcryptjs";

export class UserController {
  static createUser = withErrorHandler(async (data: CreateUserInput) => {
    const validatedData = createUserSchema.parse(data);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          ...(validatedData.username ? [{ username: validatedData.username }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new Error("User with this email or username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
        role: validatedData.role,
      },
    });

    return { success: true, user };
  });

  static updateUser = withErrorHandler(async (data: UpdateUserInput) => {
    const validatedData = updateUserSchema.parse(data);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: validatedData.id },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Check if email/username is already taken by another user
    if (validatedData.email || validatedData.username) {
      const conflictingUser = await prisma.user.findFirst({
        where: {
          OR: [
            ...(validatedData.email ? [{ email: validatedData.email }] : []),
            ...(validatedData.username ? [{ username: validatedData.username }] : []),
          ],
          NOT: { id: validatedData.id },
        },
      });

      if (conflictingUser) {
        throw new Error("Email or username is already taken");
      }
    }

    const user = await prisma.user.update({
      where: { id: validatedData.id },
      data: {
        email: validatedData.email,
        username: validatedData.username,
        role: validatedData.role,
      },
    });

    return { success: true, user };
  });

  static changePassword = withErrorHandler(async (data: ChangePasswordInput) => {
    const validatedData = changePasswordSchema.parse(data);

    // Get user with current password
    const user = await prisma.user.findUnique({
      where: { id: validatedData.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: validatedData.id },
      data: { password: hashedNewPassword },
    });

    return { success: true };
  });

  static getUsers = withErrorHandler(async (params: GetUsersInput) => {
    const validatedParams = getUsersSchema.parse(params);

    const where: any = {};
    if (validatedParams.search) {
      where.OR = [
        { email: { contains: validatedParams.search, mode: "insensitive" } },
        { username: { contains: validatedParams.search, mode: "insensitive" } },
      ];
    }
    if (validatedParams.role) {
      where.role = validatedParams.role;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { [validatedParams.sortBy]: validatedParams.sortOrder },
        skip: (validatedParams.page - 1) * validatedParams.limit,
        take: validatedParams.limit,
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          emailVerified: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          staff: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              position: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      success: true,
      users,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        totalPages: Math.ceil(total / validatedParams.limit),
      },
    };
  });

  static deleteUser = withErrorHandler(async (id: string) => {
    await prisma.user.delete({
      where: { id },
    });

    return { success: true };
  });

  static getUserById = withErrorHandler(async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        customer: true,
        staff: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { success: true, user };
  });

  static updateUserRole = withErrorHandler(async (id: string, role: "ADMIN" | "STAFF" | "CUSTOMER") => {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return { success: true, user };
  });
}
