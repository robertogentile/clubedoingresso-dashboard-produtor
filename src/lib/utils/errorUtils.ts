import { ApiErrorResponse } from "@/lib/validations/errorSchema";

interface ApiError {
  response?: {
    data?: {
      error?: {
        message?: string;
      };
      message?: string;
    };
  };
  message?: string;
}

export function extractErrorMessage(error: unknown): string {
  try {
    const apiError = error as ApiError;

    if (apiError?.response?.data) {
      const data = apiError.response.data;
      if (data?.error?.message) {
        return data.error.message;
      }

      if (data?.message) {
        return data.message;
      }

      if (typeof data?.error === "string") {
        return data.error;
      }
    }

    if (typeof error === "string") {
      return error;
    }

    if (apiError?.message) {
      return apiError.message;
    }

    return "Erro na requisição";
  } catch {
    return "Erro na requisição";
  }
}

export function isApiError(
  error: unknown
): error is { response: { data: ApiErrorResponse } } {
  const apiError = error as ApiError;
  return apiError?.response?.data?.error?.message !== undefined;
}
