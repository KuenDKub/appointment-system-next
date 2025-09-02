import { useCallback } from "react";

import { addToast } from "@heroui/toast";

export type ToastType = "success" | "danger" | "warning" | "default";

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export function useToast() {
  const showToast = useCallback((type: ToastType, options: ToastOptions = {}) => {
    const { title, description, duration } = options;

    const defaultMessages = {
      success: {
        title: "สำเร็จ!",
        description: "ดำเนินการเสร็จสิ้น",
      },
      danger: {
        title: "เกิดข้อผิดพลาด!",
        description: "กรุณาลองใหม่อีกครั้ง",
      },
      warning: {
        title: "คำเตือน",
        description: "กรุณาตรวจสอบข้อมูล",
      },
      default: {
        title: "ข้อมูล",
        description: "ข้อมูลเพิ่มเติม",
      },
    };

    const message = defaultMessages[type];

    addToast({
      title: title || message.title,
      description: description || message.description,
      color: type,
    });
  }, []);

  const success = useCallback((options?: ToastOptions) => showToast("success", options), [showToast]);

  const error = useCallback((options?: ToastOptions) => showToast("danger", options), [showToast]);

  const warning = useCallback((options?: ToastOptions) => showToast("warning", options), [showToast]);

  const info = useCallback((options?: ToastOptions) => showToast("default", options), [showToast]);

  return {
    showToast,
    success,
    error,
    warning,
    info,
  };
}
