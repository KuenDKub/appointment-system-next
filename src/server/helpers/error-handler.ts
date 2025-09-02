export enum ErrorType {
  VALIDATION = "VALIDATION",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL = "INTERNAL",
}

export enum ErrorCode {
  INVALID_INPUT = "INVALID_INPUT",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  BOOKING_NOT_FOUND = "BOOKING_NOT_FOUND",
  SERVICE_NOT_FOUND = "SERVICE_NOT_FOUND",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
  DATABASE_ERROR = "DATABASE_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export class AppointmentError extends Error {
  constructor(
    public type: ErrorType,
    public code: ErrorCode,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = "AppointmentError";
  }
}

export function createError(
  type: ErrorType,
  code: ErrorCode,
  message: string,
  details?: any
): AppointmentError {
  return new AppointmentError(type, code, message, details);
}

export function withErrorHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AppointmentError) {
        throw error;
      }

      console.error("Unexpected error:", error);
      throw createError(
        ErrorType.INTERNAL,
        ErrorCode.UNKNOWN_ERROR,
        "เกิดข้อผิดพลาดที่ไม่คาดคิด"
      );
    }
  };
}

export function errorToResponse(error: unknown) {
  if (error instanceof AppointmentError) {
    return {
      success: false,
      error: {
        type: error.type,
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };
  }

  return {
    success: false,
    error: {
      type: ErrorType.INTERNAL,
      code: ErrorCode.UNKNOWN_ERROR,
      message: "เกิดข้อผิดพลาดที่ไม่คาดคิด",
    },
  };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppointmentError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "เกิดข้อผิดพลาดที่ไม่คาดคิด";
}
