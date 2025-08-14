"use client";
import { useMutation } from "@tanstack/react-query";
import { fetchJson, normalizeBffError } from "@/lib/utils";
import type { RequestPaymentPayload } from "@/features/finance/types";

export function useRequestPayment() {
  return useMutation({
    mutationFn: async (payload: RequestPaymentPayload) => {
      const res = await fetchJson<{ success: boolean; data?: unknown }>(
        `/api/finance/request-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      return res.data;
    },
    onError: (error) => {
      throw new Error(normalizeBffError(error));
    },
  });
}
