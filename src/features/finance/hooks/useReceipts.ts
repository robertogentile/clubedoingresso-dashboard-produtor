"use client";
import { useQuery } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveEventId } from "@/lib/utils";
import type { Receipt } from "@/features/finance/types";

export function useReceipts(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["finance", "receipts", eid],
    queryFn: async (): Promise<Receipt[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{ success: boolean; data: Receipt[] }>(
        `/api/finance/receipts${query}`
      );
      return res.data ?? [];
    },
  });
}
