"use client";

import { signIn, signOut } from "next-auth/react";

export const signInAction = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล");
      return { success: false, error: result.error };
    }

    console.log("เข้าสู่ระบบสำเร็จ");
    return { success: true };
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    return { success: false, error: "Unknown error" };
  }
};

export const signOutAction = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: "/" });
    console.log("ออกจากระบบสำเร็จ");
    return { success: true };
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    return { success: false, error: "Unknown error" };
  }
};

export const signUpAction = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.message || "สมัครสมาชิกไม่สำเร็จ");
      return { success: false, error: result.message };
    }

    console.log("สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ");
    return { success: true, user: result.user };
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    return { success: false, error: "Unknown error" };
  }
};
