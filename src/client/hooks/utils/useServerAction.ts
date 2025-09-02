import { useCallback, useState } from "react";

import { useToast } from "@/client/hooks/ui/useToast";
import { useErrorHandler } from "@/client/hooks/useErrorHandler";

// Response type สำหรับ server actions
export interface ServerActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    type: string;
    code: string;
    message: string;
    field?: string;
    details?: Record<string, any>;
  };
}

// Options สำหรับ useServerAction
export interface UseServerActionOptions<T = any> {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  locale?: "th" | "en";
}

// Hook สำหรับ server actions
export function useServerAction<T = any>(
  serverAction: (...args: any[]) => Promise<ServerActionResponse<T>>,
  options: UseServerActionOptions<T> = {}
) {
  const {
    showSuccessToast = true,
    showErrorToast = true,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    locale = "th",
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  const { success: showSuccessToastFn, error: showErrorToastFn } = useToast();
  const { handleError } = useErrorHandler({
    showToast: showErrorToast,
    locale,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<ServerActionResponse<T>> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await serverAction(...args);

        if (result.success) {
          setData(result.data || null);

          if (showSuccessToast && successMessage) {
            showSuccessToastFn({
              description: successMessage,
            });
          }

          onSuccess?.(result.data as T);
        } else {
          const error = result.error || {
            type: "UNKNOWN_ERROR",
            code: "UNKNOWN",
            message: errorMessage || "เกิดข้อผิดพลาดที่ไม่คาดคิด",
          };

          setError(error);

          if (showErrorToast) {
            handleError(error, errorMessage);
          }

          onError?.(error);
        }

        return result;
      } catch (err) {
        const clientError = handleError(err, errorMessage);
        setError(clientError);
        onError?.(clientError);

        return {
          success: false,
          error: {
            type: clientError.type,
            code: clientError.code,
            message: clientError.message,
            field: clientError.field,
            details: clientError.details,
          },
        };
      } finally {
        setIsLoading(false);
      }
    },
    [
      serverAction,
      showSuccessToast,
      showErrorToast,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
      showSuccessToastFn,
      handleError,
      locale,
    ]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    isLoading,
    error,
    data,
    reset,
  };
}

// Hook สำหรับ form server actions
export interface UseFormServerActionOptions<T = any> extends UseServerActionOptions<T> {
  onFormSuccess?: (data: T) => void;
  onFormError?: (error: any) => void;
}

export function useFormServerAction<T = any>(
  serverAction: (formData: FormData) => Promise<ServerActionResponse<T>>,
  options: UseFormServerActionOptions<T> = {}
) {
  const {
    showSuccessToast = true,
    showErrorToast = true,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    onFormSuccess,
    onFormError,
    locale = "th",
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  const { success: showSuccessToastFn, error: showErrorToastFn } = useToast();
  const { handleError } = useErrorHandler({
    showToast: showErrorToast,
    locale,
  });

  const submitForm = useCallback(
    async (formData: FormData, onSuccessCallback?: (data: T) => void): Promise<ServerActionResponse<T>> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await serverAction(formData);

        if (result.success) {
          setData(result.data || null);

          if (showSuccessToast && successMessage) {
            showSuccessToastFn({
              description: successMessage,
            });
          }

          onSuccess?.(result.data as T);
          onFormSuccess?.(result.data as T);
          onSuccessCallback?.(result.data as T);
        } else {
          const error = result.error || {
            type: "UNKNOWN_ERROR",
            code: "UNKNOWN",
            message: errorMessage || "เกิดข้อผิดพลาดที่ไม่คาดคิด",
          };

          setError(error);

          if (showErrorToast) {
            handleError(error, errorMessage);
          }

          onError?.(error);
          onFormError?.(error);
        }

        return result;
      } catch (err) {
        const clientError = handleError(err, errorMessage);
        setError(clientError);
        onError?.(clientError);
        onFormError?.(clientError);

        return {
          success: false,
          error: {
            type: clientError.type,
            code: clientError.code,
            message: clientError.message,
            field: clientError.field,
            details: clientError.details,
          },
        };
      } finally {
        setIsLoading(false);
      }
    },
    [
      serverAction,
      showSuccessToast,
      showErrorToast,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
      onFormSuccess,
      onFormError,
      showSuccessToastFn,
      handleError,
      locale,
    ]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    submitForm,
    isLoading,
    error,
    data,
    reset,
  };
}

// Hook สำหรับ async operations ที่ใช้งานง่าย
export interface UseAsyncOperationOptions<T = any> extends UseServerActionOptions<T> {
  operation: (...args: any[]) => Promise<T>;
}

export function useAsyncOperation<T = any>(
  operation: (...args: any[]) => Promise<T>,
  options: Omit<UseAsyncOperationOptions<T>, "operation"> = {}
) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    locale = "th",
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  const { success: showSuccessToastFn, error: showErrorToastFn } = useToast();
  const { handleError } = useErrorHandler({
    showToast: showErrorToast,
    locale,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await operation(...args);
        setData(result);

        if (showSuccessToast && successMessage) {
          showSuccessToastFn({
            description: successMessage,
          });
        }

        onSuccess?.(result);
        return result;
      } catch (err) {
        const clientError = handleError(err, errorMessage);
        setError(clientError);
        onError?.(clientError);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [
      operation,
      showSuccessToast,
      showErrorToast,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
      showSuccessToastFn,
      handleError,
      locale,
    ]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    isLoading,
    error,
    data,
    reset,
  };
}
