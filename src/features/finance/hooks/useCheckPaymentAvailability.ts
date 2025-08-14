"use client";
import { useQuery } from "@tanstack/react-query";
import { buildQuery, fetchJson } from "@/lib/utils";
import { resolveProducerId } from "@/lib/utils";
import type { CheckPaymentAvailability } from "@/features/finance/types";

export function useCheckPaymentAvailability(
  producerId?: string | number | null
) {
  const pid = resolveProducerId(producerId);
  return useQuery({
    queryKey: ["finance", "check-payment-availability", pid],
    queryFn: async (): Promise<CheckPaymentAvailability> => {
      const query = buildQuery({ producerId: pid });
      const res = await fetchJson<{
        success: boolean;
        data: CheckPaymentAvailability;
      }>(`/api/finance/check-payment-availability${query}`);
      return res.data as CheckPaymentAvailability;
    },
  });
}
