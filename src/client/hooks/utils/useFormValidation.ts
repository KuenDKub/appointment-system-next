import { useCallback, useState } from "react";

export interface ValidationRule<T> {
  validate: (value: T) => boolean | string;
  message?: string;
}

export interface ValidationRules<T> {
  [key: string]: ValidationRule<T>[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, any>>(rules: ValidationRules<T>) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback(
    (fieldName: string, value: any): string | null => {
      const fieldRules = rules[fieldName];
      if (!fieldRules) return null;

      for (const rule of fieldRules) {
        const result = rule.validate(value);
        if (result !== true) {
          return typeof result === "string" ? result : rule.message || "Invalid value";
        }
      }

      return null;
    },
    [rules]
  );

  const validateForm = useCallback(
    (data: T): boolean => {
      const newErrors: ValidationErrors = {};

      Object.keys(rules).forEach((fieldName) => {
        const error = validateField(fieldName, data[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [rules, validateField]
  );

  const setFieldError = useCallback((fieldName: string, error: string | null) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error || "",
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    validateField,
    validateForm,
    setFieldError,
    clearErrors,
    hasErrors,
  };
}

// Common validation rules
export const validationRules = {
  required: (message = "This field is required"): ValidationRule<any> => ({
    validate: (value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    },
    message,
  }),

  email: (message = "Invalid email format"): ValidationRule<string> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      return value.length >= min;
    },
    message: message || `Minimum length is ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      return value.length <= max;
    },
    message: message || `Maximum length is ${max} characters`,
  }),

  phone: (message = "Invalid phone number format"): ValidationRule<string> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      const phoneRegex = /^[0-9+\-\s()]+$/;
      return phoneRegex.test(value);
    },
    message,
  }),

  number: (message = "Must be a valid number"): ValidationRule<any> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      return !isNaN(Number(value));
    },
    message,
  }),

  positiveNumber: (message = "Must be a positive number"): ValidationRule<any> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
    message,
  }),
};
