"use client";

import { CustomerController } from "@/server/controllers/customer-controller";
import {
  CreateCustomerInput,
  UpdateCustomerInput,
  GetCustomersInput,
} from "@/schemas/server/customer-schema";

export const createCustomerAction = async (data: CreateCustomerInput) => {
  try {
    const result = await CustomerController.createCustomer(data);
    return result;
  } catch (error) {
    console.error("Error creating customer:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการสร้างลูกค้า" };
  }
};

export const updateCustomerAction = async (data: UpdateCustomerInput) => {
  try {
    const result = await CustomerController.updateCustomer(data);
    return result;
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการอัปเดตลูกค้า" };
  }
};

export const getCustomersAction = async (params: GetCustomersInput) => {
  try {
    const result = await CustomerController.getCustomers(params);
    return result;
  } catch (error) {
    console.error("Error getting customers:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า" };
  }
};

export const deleteCustomerAction = async (id: string) => {
  try {
    const result = await CustomerController.deleteCustomer(id);
    return result;
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการลบลูกค้า" };
  }
};

export const getCustomerByIdAction = async (id: string) => {
  try {
    const result = await CustomerController.getCustomerById(id);
    return result;
  } catch (error) {
    console.error("Error getting customer by ID:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า" };
  }
};

export const updateCustomerPreferencesAction = async (
  id: string,
  preferences: Record<string, any>
) => {
  try {
    const result = await CustomerController.updateCustomerPreferences(
      id,
      preferences
    );
    return result;
  } catch (error) {
    console.error("Error updating customer preferences:", error);
    return {
      success: false,
      error: "เกิดข้อผิดพลาดในการอัปเดตความชอบของลูกค้า",
    };
  }
};

export const getCustomerStatsAction = async (customerId: string) => {
  try {
    const result = await CustomerController.getCustomerStats(customerId);
    return result;
  } catch (error) {
    console.error("Error getting customer stats:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงสถิติลูกค้า" };
  }
};
