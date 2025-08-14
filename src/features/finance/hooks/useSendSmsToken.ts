"use client";
import { useMutation } from "@tanstack/react-query";
import { buildQuery, fetchJson, normalizeBffError } from "@/lib/utils";
import { resolveProducerId } from "@/lib/utils";
import type { SmsToken } from "@/features/finance/types";

export function useSendSmsToken() {
  return useMutation({
    mutationFn: async ({
      producerId,
      type,
    }: {
      producerId?: string | number | null;
      type?: "sms" | "email";
    }) => {
      const pid = resolveProducerId(producerId);
      const query = buildQuery({ producerId: pid, type });
      const res = await fetchJson<{ success: boolean; data: SmsToken }>(
        `/api/finance/send-sms-token${query}`,
        { method: "GET" }
      );
      return res.data;
    },
    onError: (error) => {
      throw new Error(normalizeBffError(error));
    },
  });
}
