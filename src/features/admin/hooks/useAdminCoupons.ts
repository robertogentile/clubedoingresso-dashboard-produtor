"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson, resolveEventId } from "@/lib/utils";
import type { AdminCouponItem } from "@/features/admin/types";

export function useAdminCoupons(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["admin", "coupons", eid],
    queryFn: async (): Promise<AdminCouponItem[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{
        success: boolean;
        data: AdminCouponItem[];
      }>(`/api/admin/coupons${query}`);
      return res.data ?? [];
    },
    retry: 1,
  });
}

export function useInvalidateAdminCoupons() {
  const queryClient = useQueryClient();

  return {
    invalidateCoupons: (eventId?: string | number | null) => {
      const eid = resolveEventId(eventId);
      return queryClient.invalidateQueries({
        queryKey: ["admin", "coupons", eid],
      });
    },
  };
}
