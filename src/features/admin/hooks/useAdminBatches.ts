"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson, resolveEventId } from "@/lib/utils";
import type { AdminBatchItem } from "@/features/admin/types";

export function useAdminBatches(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["admin", "batches", eid],
    queryFn: async (): Promise<AdminBatchItem[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{
        success: boolean;
        data: AdminBatchItem[];
      }>(`/api/admin/batches${query}`);
      return res.data ?? [];
    },
    retry: 1,
  });
}

export function useInvalidateAdminBatches() {
  const queryClient = useQueryClient();

  return {
    invalidateBatches: (eventId?: string | number | null) => {
      const eid = resolveEventId(eventId);
      return queryClient.invalidateQueries({
        queryKey: ["admin", "batches", eid],
      });
    },
  };
}
