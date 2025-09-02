"use client";

import { StaffController } from "@/server/controllers/staff-controller";
import {
  CreateStaffInput,
  UpdateStaffInput,
  GetStaffInput,
} from "@/schemas/server/staff-schema";

export const createStaffAction = async (data: CreateStaffInput) => {
  try {
    const result = await StaffController.createStaff(data);
    return result;
  } catch (error) {
    console.error("Error creating staff:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการสร้างพนักงาน" };
  }
};

export const updateStaffAction = async (data: UpdateStaffInput) => {
  try {
    const result = await StaffController.updateStaff(data);
    return result;
  } catch (error) {
    console.error("Error updating staff:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการอัปเดตพนักงาน" };
  }
};

export const getStaffAction = async (params: GetStaffInput) => {
  try {
    const result = await StaffController.getStaff(params);
    return result;
  } catch (error) {
    console.error("Error getting staff:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน" };
  }
};

export const deleteStaffAction = async (id: string) => {
  try {
    const result = await StaffController.deleteStaff(id);
    return result;
  } catch (error) {
    console.error("Error deleting staff:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการลบพนักงาน" };
  }
};

export const toggleStaffStatusAction = async (id: string) => {
  try {
    const result = await StaffController.toggleStaffStatus(id);
    return result;
  } catch (error) {
    console.error("Error toggling staff status:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการเปลี่ยนสถานะพนักงาน" };
  }
};
