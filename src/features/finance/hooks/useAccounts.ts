"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson, normalizeBffError } from "@/lib/utils";
import { resolveProducerId } from "@/lib/utils";
import type {
  Account,
  CreateAccountPayload,
  DeleteAccountParams,
} from "@/features/finance/types";

export function useAccounts(producerId?: string | number | null) {
  const pid = resolveProducerId(producerId);
  return useQuery({
    queryKey: ["finance", "accounts", pid],
    queryFn: async (): Promise<Account[]> => {
      const query = buildQuery({ producerId: pid });
      const res = await fetchJson<{ success: boolean; data: Account[] }>(
        `/api/finance/accounts${query}`
      );
      return res.data ?? [];
    },
    retry: 1,
  });
}

export function useCreateAccount() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateAccountPayload) => {
      const res = await fetchJson<{ success: boolean; data: Account }>(
        `/api/finance/accounts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      return res.data;
    },
    onSuccess: (_data, payload) => {
      client.invalidateQueries({
        queryKey: ["finance", "accounts", String(payload.producerId)],
      });
    },
    onError: (error) => {
      throw new Error(normalizeBffError(error));
    },
  });
}

export function useDeleteAccount() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (params: DeleteAccountParams) => {
      const query = buildQuery(params);
      const res = await fetchJson<{
        success: boolean;
        data: { id: number; producerId: number };
      }>(`/api/finance/accounts${query}`, { method: "DELETE" });
      return res.data;
    },
    onSuccess: (_data, params) => {
      client.invalidateQueries({
        queryKey: ["finance", "accounts", String(params.producerId)],
      });
    },
    onError: (error) => {
      throw new Error(normalizeBffError(error));
    },
  });
}
