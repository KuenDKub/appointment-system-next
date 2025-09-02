"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Chip } from "@heroui/react";

interface ToastData {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastData>) => {
      const toast = event.detail;
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration || 5000);
    };

    window.addEventListener("show-toast" as any, handleToast);
    return () => window.removeEventListener("show-toast" as any, handleToast);
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Chip
          key={toast.id}
          color={
            toast.type === "success"
              ? "success"
              : toast.type === "error"
              ? "danger"
              : toast.type === "warning"
              ? "warning"
              : "primary"
          }
          variant="flat"
          className="min-w-[300px] text-white"
        >
          {toast.message}
        </Chip>
      ))}
    </div>,
    document.body
  );
}
