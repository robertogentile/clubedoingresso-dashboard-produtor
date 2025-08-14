"use client";
import { useQuery } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveEventId } from "@/lib/utils";
import type { CouponItem } from "@/features/finance/types";

export function useCoupons(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["finance", "coupons", eid],
    queryFn: async (): Promise<CouponItem[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{ success: boolean; data: CouponItem[] }>(
        `/api/finance/coupons${query}`
      );
      return res.data ?? [];
    },
  });
}
