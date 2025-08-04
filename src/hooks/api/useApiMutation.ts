import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { z } from "zod";

// Tipos para o hook
interface UseApiMutationOptions<TData, TVariables, TError = unknown>
  extends Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn"> {
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  schema?: z.ZodSchema<TData>;
  invalidateQueries?: string[];
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
}

// Hook customizado para mutations
export function useApiMutation<
  TData = unknown,
  TVariables = unknown,
  TError = unknown
>(
  options: UseApiMutationOptions<TData, TVariables, TError>
): UseMutationResult<TData, TError, TVariables> {
  const {
    endpoint,
    method = "POST",
    schema,
    invalidateQueries = [],
    onSuccess,
    onError,
    ...mutationOptions
  } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      let response;

      switch (method) {
        case "POST":
          response = await apiClient.post(endpoint, variables);
          break;
        case "PUT":
          response = await apiClient.put(endpoint, variables);
          break;
        case "PATCH":
          response = await apiClient.patch(endpoint, variables);
          break;
        case "DELETE":
          response = await apiClient.delete(endpoint, { data: variables });
          break;
        default:
          response = await apiClient.post(endpoint, variables);
      }

      // Se tem schema, valida os dados
      if (schema) {
        const validatedData = schema.parse(response);
        return validatedData;
      }

      return response as TData;
    },
    onSuccess: (data, variables) => {
      // Invalida queries relacionadas
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });

      onSuccess?.(data, variables);
    },
    onError,
    ...mutationOptions,
  });
}
