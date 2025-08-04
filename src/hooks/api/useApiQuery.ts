import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { z } from "zod";

// Tipos para o hook
interface UseApiQueryOptions<TData, TError = unknown>
  extends Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn"> {
  endpoint: string;
  params?: Record<string, unknown>;
  schema?: z.ZodSchema<TData>;
  enabled?: boolean;
}

// Hook customizado para queries
export function useApiQuery<TData = unknown, TError = unknown>(
  queryKey: string[],
  options: UseApiQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const { endpoint, params, schema, enabled = true, ...queryOptions } = options;

  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: async (): Promise<TData> => {
      const response = await apiClient.get(endpoint, { params });

      // Se tem schema, valida os dados
      if (schema) {
        const validatedData = schema.parse(response);
        return validatedData;
      }

      return response as TData;
    },
    enabled,
    ...queryOptions,
  });
}
