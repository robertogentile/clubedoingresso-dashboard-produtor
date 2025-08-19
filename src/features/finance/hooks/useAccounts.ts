"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveProducerId } from "@/lib/utils";
import type { Account } from "@/features/finance/types";

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

export function useInvalidateAccounts() {
  const queryClient = useQueryClient();

  return {
    invalidateAccounts: (producerId?: string | number | null) => {
      const pid = resolveProducerId(producerId);
      return queryClient.invalidateQueries({
        queryKey: ["finance", "accounts", pid],
      });
    },
  };
}
