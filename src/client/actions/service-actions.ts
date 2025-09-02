"use client";

import { ServiceController } from "@/server/controllers/service-controller";
import {
  CreateServiceInput,
  UpdateServiceInput,
  GetServicesInput,
} from "@/schemas/server/service-schema";

export const createServiceAction = async (data: CreateServiceInput) => {
  try {
    const result = await ServiceController.createService(data);
    return result;
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการสร้างบริการ" };
  }
};

export const updateServiceAction = async (data: UpdateServiceInput) => {
  try {
    const result = await ServiceController.updateService(data);
    return result;
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการอัปเดตบริการ" };
  }
};

export const getServicesAction = async (params: GetServicesInput) => {
  try {
    const result = await ServiceController.getServices(params);
    return result;
  } catch (error) {
    console.error("Error getting services:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลบริการ" };
  }
};

export const deleteServiceAction = async (id: string) => {
  try {
    const result = await ServiceController.deleteService(id);
    return result;
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการลบบริการ" };
  }
};

export const toggleServiceStatusAction = async (id: string) => {
  try {
    const result = await ServiceController.toggleServiceStatus(id);
    return result;
  } catch (error) {
    console.error("Error toggling service status:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการเปลี่ยนสถานะบริการ" };
  }
};

export const assignStaffToServiceAction = async (
  serviceId: string,
  staffId: string
) => {
  try {
    const result = await ServiceController.assignStaffToService(
      serviceId,
      staffId
    );
    return result;
  } catch (error) {
    console.error("Error assigning staff to service:", error);
    return {
      success: false,
      error: "เกิดข้อผิดพลาดในการมอบหมายพนักงานให้บริการ",
    };
  }
};

export const removeStaffFromServiceAction = async (
  serviceId: string,
  staffId: string
) => {
  try {
    const result = await ServiceController.removeStaffFromService(
      serviceId,
      staffId
    );
    return result;
  } catch (error) {
    console.error("Error removing staff from service:", error);
    return {
      success: false,
      error: "เกิดข้อผิดพลาดในการลบพนักงานออกจากบริการ",
    };
  }
};
