import { useCallback } from "react";

import { ZodError } from "zod";

import { useToast } from "./ui/useToast";

// Error types สำหรับ client
export enum ClientErrorType {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  AUTH_ERROR = "AUTH_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

// Error codes สำหรับ client
export enum ClientErrorCode {
  // Validation errors
  INVALID_INPUT = "INVALID_INPUT",
  MISSING_FIELD = "MISSING_FIELD",
  INVALID_FORMAT = "INVALID_FORMAT",

  // Network errors
  CONNECTION_FAILED = "CONNECTION_FAILED",
  TIMEOUT = "TIMEOUT",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  // Server errors
  SERVER_ERROR = "SERVER_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  UPLOAD_ERROR = "UPLOAD_ERROR",

  // Auth errors
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  SESSION_EXPIRED = "SESSION_EXPIRED",

  // Unknown errors
  UNKNOWN = "UNKNOWN",
}

// Client error class
export class ClientError extends Error {
  public readonly type: ClientErrorType;
  public readonly code: ClientErrorCode;
  public readonly field?: string;
  public readonly details?: Record<string, any>;

  constructor(
    type: ClientErrorType,
    code: ClientErrorCode,
    message: string,
    field?: string,
    details?: Record<string, any>
  ) {
    super(message);
    this.name = "ClientError";
    this.type = type;
    this.code = code;
    this.field = field;
    this.details = details;
  }
}

// Error messages สำหรับ client (ภาษาไทย)
const CLIENT_ERROR_MESSAGES_TH: Record<ClientErrorCode, string> = {
  // Validation errors
  [ClientErrorCode.INVALID_INPUT]: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง",
  [ClientErrorCode.MISSING_FIELD]: "กรุณากรอกข้อมูลที่จำเป็น",
  [ClientErrorCode.INVALID_FORMAT]: "รูปแบบข้อมูลไม่ถูกต้อง",

  // Network errors
  [ClientErrorCode.CONNECTION_FAILED]: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
  [ClientErrorCode.TIMEOUT]: "การเชื่อมต่อใช้เวลานานเกินไป",
  [ClientErrorCode.SERVICE_UNAVAILABLE]: "บริการไม่พร้อมใช้งาน",

  // Server errors
  [ClientErrorCode.SERVER_ERROR]: "เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง",
  [ClientErrorCode.DATABASE_ERROR]: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล",
  [ClientErrorCode.UPLOAD_ERROR]: "เกิดข้อผิดพลาดในการอัปโหลดไฟล์",

  // Auth errors
  [ClientErrorCode.UNAUTHORIZED]: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
  [ClientErrorCode.FORBIDDEN]: "คุณไม่มีสิทธิ์ในการดำเนินการนี้",
  [ClientErrorCode.SESSION_EXPIRED]: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่",

  // Unknown errors
  [ClientErrorCode.UNKNOWN]: "เกิดข้อผิดพลาดที่ไม่คาดคิด",
};

// Error messages สำหรับ client (ภาษาอังกฤษ)
const CLIENT_ERROR_MESSAGES_EN: Record<ClientErrorCode, string> = {
  // Validation errors
  [ClientErrorCode.INVALID_INPUT]: "Invalid input data. Please check and try again",
  [ClientErrorCode.MISSING_FIELD]: "Please fill in required fields",
  [ClientErrorCode.INVALID_FORMAT]: "Invalid data format",

  // Network errors
  [ClientErrorCode.CONNECTION_FAILED]: "Cannot connect to server",
  [ClientErrorCode.TIMEOUT]: "Connection timeout",
  [ClientErrorCode.SERVICE_UNAVAILABLE]: "Service unavailable",

  // Server errors
  [ClientErrorCode.SERVER_ERROR]: "System error occurred. Please try again",
  [ClientErrorCode.DATABASE_ERROR]: "Database connection error",
  [ClientErrorCode.UPLOAD_ERROR]: "File upload error",

  // Auth errors
  [ClientErrorCode.UNAUTHORIZED]: "You don't have permission to access this page",
  [ClientErrorCode.FORBIDDEN]: "You don't have permission to perform this action",
  [ClientErrorCode.SESSION_EXPIRED]: "Session expired. Please sign in again",

  // Unknown errors
  [ClientErrorCode.UNKNOWN]: "An unexpected error occurred",
};

// Helper function สำหรับสร้าง client error
export function createClientError(
  type: ClientErrorType,
  code: ClientErrorCode,
  customMessage?: string,
  field?: string,
  details?: Record<string, any>
): ClientError {
  const message = customMessage || CLIENT_ERROR_MESSAGES_TH[code];
  return new ClientError(type, code, message, field, details);
}

// Helper function สำหรับแปลง server error เป็น client error
export function convertServerErrorToClientError(error: unknown): ClientError {
  // Handle TemplateError from server
  if (error && typeof error === "object" && "type" in error && "code" in error) {
    const serverError = error as any;

    // Map server error types to client error types
    switch (serverError.type) {
      case "VALIDATION_ERROR":
        return createClientError(
          ClientErrorType.VALIDATION_ERROR,
          ClientErrorCode.INVALID_INPUT,
          serverError.message,
          serverError.field
        );
      case "AUTHENTICATION_ERROR":
        return createClientError(ClientErrorType.AUTH_ERROR, ClientErrorCode.UNAUTHORIZED, serverError.message);
      case "AUTHORIZATION_ERROR":
        return createClientError(ClientErrorType.AUTH_ERROR, ClientErrorCode.FORBIDDEN, serverError.message);
      case "DATABASE_ERROR":
        return createClientError(ClientErrorType.SERVER_ERROR, ClientErrorCode.DATABASE_ERROR, serverError.message);
      case "UPLOAD_ERROR":
        return createClientError(ClientErrorType.SERVER_ERROR, ClientErrorCode.UPLOAD_ERROR, serverError.message);
      case "NETWORK_ERROR":
        return createClientError(
          ClientErrorType.NETWORK_ERROR,
          ClientErrorCode.SERVICE_UNAVAILABLE,
          serverError.message
        );
      default:
        return createClientError(ClientErrorType.SERVER_ERROR, ClientErrorCode.SERVER_ERROR, serverError.message);
    }
  }

  // Handle ZodError
  if (error instanceof ZodError) {
    const flattened = error.flatten();
    const fields = Object.keys(flattened.fieldErrors);
    const firstField = fields[0] || "unknown";
    const fieldErrors = flattened.fieldErrors[firstField as keyof typeof flattened.fieldErrors];
    const errorMessage = Array.isArray(fieldErrors) ? fieldErrors[0] : "ข้อมูลไม่ถูกต้อง";

    return createClientError(ClientErrorType.VALIDATION_ERROR, ClientErrorCode.INVALID_INPUT, errorMessage, firstField);
  }

  // Handle generic Error
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes("Network Error") || error.message.includes("fetch")) {
      return createClientError(ClientErrorType.NETWORK_ERROR, ClientErrorCode.CONNECTION_FAILED);
    }

    if (error.message.includes("timeout")) {
      return createClientError(ClientErrorType.NETWORK_ERROR, ClientErrorCode.TIMEOUT);
    }

    if (error.message.includes("upload") || error.message.includes("file")) {
      return createClientError(ClientErrorType.SERVER_ERROR, ClientErrorCode.UPLOAD_ERROR);
    }

    if (error.message.includes("Unauthorized") || error.message.includes("401")) {
      return createClientError(ClientErrorType.AUTH_ERROR, ClientErrorCode.UNAUTHORIZED);
    }

    if (error.message.includes("Forbidden") || error.message.includes("403")) {
      return createClientError(ClientErrorType.AUTH_ERROR, ClientErrorCode.FORBIDDEN);
    }

    // If it's already a user-friendly message, use it
    if (error.message.includes("กรุณา") || error.message.includes("ไม่สามารถ")) {
      return createClientError(ClientErrorType.UNKNOWN_ERROR, ClientErrorCode.UNKNOWN, error.message);
    }

    // Default to unknown error
    return createClientError(ClientErrorType.UNKNOWN_ERROR, ClientErrorCode.UNKNOWN);
  }

  // Handle any other error type
  return createClientError(ClientErrorType.UNKNOWN_ERROR, ClientErrorCode.UNKNOWN);
}

// Client error handler hook
export interface ClientErrorHandlerOptions {
  showToast?: boolean;
  defaultMessage?: string;
  onError?: (error: ClientError) => void;
  locale?: "th" | "en";
}

export function useErrorHandler(options: ClientErrorHandlerOptions = {}) {
  const { showToast = true, defaultMessage = "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", onError, locale = "th" } = options;

  const { error: showErrorToast } = useToast();

  const handleError = useCallback(
    (error: unknown, customMessage?: string): ClientError => {
      console.error("Client error handler:", error);

      // Convert to ClientError
      const clientError = convertServerErrorToClientError(error);

      // Override message if custom message provided
      if (customMessage) {
        clientError.message = customMessage;
      }

      // Show toast if enabled
      if (showToast) {
        const messages = locale === "th" ? CLIENT_ERROR_MESSAGES_TH : CLIENT_ERROR_MESSAGES_EN;
        const toastMessage = customMessage || clientError.message || messages[clientError.code];

        showErrorToast({
          description: toastMessage,
        });
      }

      // Call custom error handler if provided
      onError?.(clientError);

      return clientError;
    },
    [showToast, defaultMessage, onError, showErrorToast, locale]
  );

  const handleValidationError = useCallback(
    (errors: Record<string, string[]>): ClientError => {
      const errorMessages = Object.entries(errors).map(([field, fieldErrors]) => {
        // Field name mapping to Thai
        const fieldMap: Record<string, string> = {
          licensePlate: "ป้ายทะเบียน",
          brandId: "ยี่ห้อ",
          modelId: "รุ่น",
          yearId: "ปี",
          colorId: "สี",
          provinceId: "จังหวัด",
          brokerId: "นายหน้า",
          purchaseDate: "วันที่ซื้อ",
          customReceivedDate: "วันที่ลูกค้าได้รับรถ",
          depositDate: "วันที่วางเงินดาวน์",
          deliveryDate: "วันที่ส่งมอบ",
          downPaymentDate: "วันที่ชำระดาวน์",
          depositPrice: "ราคาดาวน์",
          purchasePrice: "ราคาซื้อ",
          financePrice: "ราคาผ่อน",
          downPayment: "ราคาดาวน์",
          commission: "ค่าคอมมิชชัน",
          salePrice: "ราคาขาย",
          brokerPrice: "ราคานายหน้า",
          freelanceName: "ชื่อนายหน้าอิสระ",
          freelancePhone: "เบอร์โทรนายหน้าอิสระ",
          freelanceAddress: "ที่อยู่นายหน้าอิสระ",
          note: "หมายเหตุ",
          postSaleWarrantyDays: "วันรับประกันหลังขาย",
          name: "ชื่อ",
          email: "อีเมล",
          phone: "เบอร์โทร",
          address: "ที่อยู่",
          firstName: "ชื่อ",
          lastName: "นามสกุล",
          phoneNumber: "เบอร์โทรศัพท์",
          password: "รหัสผ่าน",
          confirmPassword: "ยืนยันรหัสผ่าน",
        };

        const thaiField = fieldMap[field] || field;
        const errorMessage = Array.isArray(fieldErrors) ? fieldErrors.join(", ") : "ข้อมูลไม่ถูกต้อง";
        return `${thaiField}: ${errorMessage}`;
      });

      const errorMessage = errorMessages.join(", ");
      const clientError = createClientError(
        ClientErrorType.VALIDATION_ERROR,
        ClientErrorCode.INVALID_INPUT,
        errorMessage
      );

      if (showToast) {
        showErrorToast({
          description: errorMessage,
        });
      }

      onError?.(clientError);

      return clientError;
    },
    [showToast, showErrorToast, onError]
  );

  return {
    handleError,
    handleValidationError,
    createClientError,
    convertServerErrorToClientError,
  };
}

// Helper function สำหรับแปลง error เป็น user-friendly message
export function getClientErrorMessage(error: unknown, locale: "th" | "en" = "th"): string {
  if (error instanceof ClientError) {
    const messages = locale === "th" ? CLIENT_ERROR_MESSAGES_TH : CLIENT_ERROR_MESSAGES_EN;
    return error.message || messages[error.code];
  }

  const clientError = convertServerErrorToClientError(error);
  const messages = locale === "th" ? CLIENT_ERROR_MESSAGES_TH : CLIENT_ERROR_MESSAGES_EN;
  return clientError.message || messages[clientError.code];
}
