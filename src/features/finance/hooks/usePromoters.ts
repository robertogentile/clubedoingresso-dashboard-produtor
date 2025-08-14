"use client";
import { useQuery } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveEventId } from "@/lib/utils";
import type { PromoterItem } from "@/features/finance/types";

export function usePromoters(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["finance", "promoters", eid],
    queryFn: async (): Promise<PromoterItem[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{ success: boolean; data: PromoterItem[] }>(
        `/api/finance/promoters${query}`
      );
      return res.data ?? [];
    },
  });
}
