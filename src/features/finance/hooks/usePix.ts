"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson, normalizeBffError } from "@/lib/utils";
import { resolveProducerId } from "@/lib/utils";
import type {
  PixKey,
  CreatePixPayload,
  DeletePixParams,
} from "@/features/finance/types";

export function usePix(producerId?: string | number | null) {
  const pid = resolveProducerId(producerId);
  return useQuery({
    queryKey: ["finance", "pix", pid],
    queryFn: async (): Promise<PixKey[]> => {
      const query = buildQuery({ producerId: pid });
      const res = await fetchJson<{ success: boolean; data: PixKey[] }>(
        `/api/finance/pix${query}`
      );
      return res.data ?? [];
    },
  });
}

export function useCreatePix() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreatePixPayload) => {
      const res = await fetchJson<{ success: boolean; data: PixKey }>(
        `/api/finance/pix`,
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
        queryKey: ["finance", "pix", String(payload.producerId)],
      });
    },
    onError: (error) => {
      throw new Error(normalizeBffError(error));
    },
  });
}

export function useDeletePix() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (params: DeletePixParams) => {
      const query = buildQuery(params);
      const res = await fetchJson<{
        success: boolean;
        data: { id: number; producerId: number };
      }>(`/api/finance/pix${query}`, { method: "DELETE" });
      return res.data;
    },
    onSuccess: (_data, params) => {
      client.invalidateQueries({
        queryKey: ["finance", "pix", String(params.producerId)],
      });
    },
    onError: (error) => {
      throw new Error(normalizeBffError(error));
    },
  });
}
