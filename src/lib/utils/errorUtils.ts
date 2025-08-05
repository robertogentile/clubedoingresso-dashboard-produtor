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

    // Se o erro tem a estrutura padrão da API
    if (apiError?.response?.data) {
      const data = apiError.response.data;

      // Prioridade 1: error.error.message (formato mais específico)
      if (data?.error?.message) {
        return data.error.message;
      }

      // Prioridade 2: error.message (fallback)
      if (data?.message) {
        return data.message;
      }

      // Prioridade 3: error.error (se for string)
      if (typeof data?.error === "string") {
        return data.error;
      }
    }

    // Se o erro é uma string direta
    if (typeof error === "string") {
      return error;
    }

    // Se o erro tem message
    if (apiError?.message) {
      return apiError.message;
    }

    // Fallback genérico
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
