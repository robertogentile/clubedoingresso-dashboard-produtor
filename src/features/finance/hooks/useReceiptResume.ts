"use client";
import { useQuery } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveEventId } from "@/lib/utils";
import type { ReceiptResume } from "@/features/finance/types";

export function useReceiptResume(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["finance", "receipt-resume", eid],
    queryFn: async (): Promise<ReceiptResume> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{ success: boolean; data: ReceiptResume }>(
        `/api/finance/receipt-resume${query}`
      );
      return res.data as ReceiptResume;
    },
    retry: 1,
  });
}
