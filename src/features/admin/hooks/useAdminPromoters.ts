"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson, resolveEventId } from "@/lib/utils";
import type { AdminPromoterItem } from "@/features/admin/types";

export function useAdminPromoters(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["admin", "promoters", eid],
    queryFn: async (): Promise<AdminPromoterItem[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{
        success: boolean;
        data: AdminPromoterItem[];
      }>(`/api/admin/promoters${query}`);
      return res.data ?? [];
    },
    retry: 1,
  });
}

export function useInvalidateAdminPromoters() {
  const queryClient = useQueryClient();

  return {
    invalidatePromoters: (eventId?: string | number | null) => {
      const eid = resolveEventId(eventId);
      return queryClient.invalidateQueries({
        queryKey: ["admin", "promoters", eid],
      });
    },
  };
}
