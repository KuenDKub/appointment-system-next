"use client";

import Image from "next/image";

// import { TEMPLATE_CONFIG } from "@/shared/constants/template-config";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

const logoSizes = {
  sm: { width: "w-24", height: "h-12" }, // 96px x 48px
  md: { width: "w-32", height: "h-16" }, // 128px x 64px
  lg: { width: "w-42", height: "h-16" }, // 168px x 64px (sidebar size)
  xl: { width: "w-48", height: "h-20" }, // 192px x 80px
};

export default function Logo({ size = "md", className = "", priority = false }: LogoProps) {
  const { width, height } = logoSizes[size];

  return (
    <div className={`relative ${width} ${height} ${className}`}>
      <Image
        src="/logo.png"
        alt="Appointment System Logo"
        priority={priority}
        fill
        sizes={`${parseInt(width.replace("w-", "")) * 4}px`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
