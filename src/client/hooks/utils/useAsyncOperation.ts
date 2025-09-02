import { useCallback, useState } from "react";

import { useErrorHandler } from "@/client/hooks/useErrorHandler";
import { addToast } from "@heroui/toast";

export interface AsyncOperationOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

export interface AsyncOperationResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useAsyncOperation<T>(
  operation: (...args: any[]) => Promise<T>,
  options: AsyncOperationOptions = {}
): AsyncOperationResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = "ดำเนินการสำเร็จ",
    errorMessage = "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    onSuccess,
    onError,
    onFinally,
  } = options;

  const { handleError } = useErrorHandler({
    showToast: showErrorToast,
    defaultMessage: errorMessage,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await operation(...args);
        setData(result);

        if (showSuccessToast) {
          addToast({
            title: "สำเร็จ!",
            description: successMessage,
            color: "success",
          });
        }

        onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMsg = handleError(err, errorMessage).message;
        setError(errorMsg);
        onError?.(err);
        return null;
      } finally {
        setIsLoading(false);
        onFinally?.();
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
      onFinally,
      handleError,
    ]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
}
