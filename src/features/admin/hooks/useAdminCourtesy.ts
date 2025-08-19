"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQuery, fetchJson, resolveEventId } from "@/lib/utils";
import type { AdminCourtesyBatchItem } from "@/features/admin/types";

export function useAdminCourtesyBatches(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["admin", "courtesy-batches", eid],
    queryFn: async (): Promise<AdminCourtesyBatchItem[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{
        success: boolean;
        data: AdminCourtesyBatchItem[];
      }>(`/api/admin/batches-courtesy${query}`);
      return res.data ?? [];
    },
    retry: 1,
  });
}

export function useInvalidateAdminCourtesy() {
  const queryClient = useQueryClient();

  return {
    invalidateCourtesy: (eventId?: string | number | null) => {
      const eid = resolveEventId(eventId);
      return queryClient.invalidateQueries({
        queryKey: ["admin", "courtesy-batches", eid],
      });
    },
  };
}
