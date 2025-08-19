"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveProducerId } from "@/lib/utils";
import type { PixKey } from "@/features/finance/types";

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
    retry: 1,
  });
}

export function useInvalidatePix() {
  const queryClient = useQueryClient();

  return {
    invalidatePix: (producerId?: string | number | null) => {
      const pid = resolveProducerId(producerId);
      return queryClient.invalidateQueries({
        queryKey: ["finance", "pix", pid],
      });
    },
  };
}
