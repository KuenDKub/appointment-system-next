"use client";

import { UserController } from "@/server/controllers/user-controller";
import {
  CreateUserInput,
  UpdateUserInput,
  ChangePasswordInput,
  GetUsersInput,
} from "@/schemas/server/user-schema";

export const createUserAction = async (data: CreateUserInput) => {
  try {
    const result = await UserController.createUser(data);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการสร้างผู้ใช้" };
  }
};

export const updateUserAction = async (data: UpdateUserInput) => {
  try {
    const result = await UserController.updateUser(data);
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการอัปเดตผู้ใช้" };
  }
};

export const changePasswordAction = async (data: ChangePasswordInput) => {
  try {
    const result = await UserController.changePassword(data);
    return result;
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน" };
  }
};

export const getUsersAction = async (params: GetUsersInput) => {
  try {
    const result = await UserController.getUsers(params);
    return result;
  } catch (error) {
    console.error("Error getting users:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้" };
  }
};

export const deleteUserAction = async (id: string) => {
  try {
    const result = await UserController.deleteUser(id);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการลบผู้ใช้" };
  }
};

export const getUserByIdAction = async (id: string) => {
  try {
    const result = await UserController.getUserById(id);
    return result;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้" };
  }
};

export const updateUserRoleAction = async (
  id: string,
  role: "ADMIN" | "STAFF" | "CUSTOMER"
) => {
  try {
    const result = await UserController.updateUserRole(id, role);
    return result;
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการอัปเดตบทบาทผู้ใช้" };
  }
};
