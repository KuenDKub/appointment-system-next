"use client";

import { BookingController } from "@/server/controllers/booking-controller";
import {
  CreateBookingInput,
  UpdateBookingInput,
  GetBookingsInput,
} from "@/schemas/server/booking-schema";

export const createBookingAction = async (data: CreateBookingInput) => {
  try {
    const result = await BookingController.createBooking(data);
    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการสร้างการจอง" };
  }
};

export const updateBookingAction = async (data: UpdateBookingInput) => {
  try {
    const result = await BookingController.updateBooking(data);
    return result;
  } catch (error) {
    console.error("Error updating booking:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการอัปเดตการจอง" };
  }
};

export const getBookingsAction = async (params: GetBookingsInput) => {
  try {
    const result = await BookingController.getBookings(params);
    return result;
  } catch (error) {
    console.error("Error getting bookings:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลการจอง" };
  }
};

export const cancelBookingAction = async (id: string) => {
  try {
    const result = await BookingController.cancelBooking(id);
    return result;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการยกเลิกการจอง" };
  }
};

export const confirmBookingAction = async (id: string) => {
  try {
    const result = await BookingController.confirmBooking(id);
    return result;
  } catch (error) {
    console.error("Error confirming booking:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการยืนยันการจอง" };
  }
};

export const completeBookingAction = async (id: string) => {
  try {
    const result = await BookingController.completeBooking(id);
    return result;
  } catch (error) {
    console.error("Error completing booking:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการเสร็จสิ้นการจอง" };
  }
};
