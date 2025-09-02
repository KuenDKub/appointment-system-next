"use client";

import { ReactNode } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-32 w-32",
  };

  return <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]} ${className}`} />;
}

interface PageLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function PageLoading({
  size = "xl",
  message = "กำลังโหลด...",
  fullScreen = true,
  className = "",
}: PageLoadingProps) {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={size} className="border-white" />
        {message && <p className="text-white text-lg font-medium">{message}</p>}
      </div>
    </div>
  );
}

interface InlineLoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export function InlineLoading({ size = "sm", message, className = "" }: InlineLoadingProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LoadingSpinner size={size} />
      {message && <span className="text-white">{message}</span>}
    </div>
  );
}

interface LoadingOverlayProps {
  children: ReactNode;
  isLoading: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({ children, isLoading, message = "กำลังโหลด...", className = "" }: LoadingOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-white font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
