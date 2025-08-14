"use client";
import { useQuery } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveEventId } from "@/lib/utils";
import type { PaymentMethodItem } from "@/features/finance/types";

export function usePaymentMethodsResume(eventId?: string | number | null) {
  const eid = resolveEventId(eventId);
  return useQuery({
    queryKey: ["finance", "payment-methods-resume", eid],
    queryFn: async (): Promise<PaymentMethodItem[]> => {
      const query = buildQuery({ eventId: eid });
      const res = await fetchJson<{
        success: boolean;
        data: PaymentMethodItem[];
      }>(`/api/finance/payment-methods-resume${query}`);
      return res.data ?? [];
    },
    retry: 1,
  });
}
