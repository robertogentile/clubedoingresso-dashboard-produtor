import { QueryClient } from "@tanstack/react-query";

function getErrorStatus(error: unknown): number | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { status?: number } }).response ===
      "object" &&
    (error as { response?: { status?: number } }).response !== null &&
    "status" in (error as { response?: { status?: number } }).response!
  ) {
    return (error as { response: { status?: number } }).response.status;
  }
  return undefined;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error: unknown) => {
        const status = getErrorStatus(error);
        if (status && status >= 400 && status < 500 && status !== 429) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error: unknown) => {
        const status = getErrorStatus(error);
        if (status && status >= 400) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});
