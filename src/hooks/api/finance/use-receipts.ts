//TODO: Ajustar conforme detalhes do endpoint futuramente
import { useApiQuery } from "../use-api-query";
// import { ReceiptsSchema } from "@/lib/validations/finance/receipts-schema";
// import { adaptReceipts } from "@/lib/adapters/finance/receipts-adapter";

export function useFinanceReceipts(params: { eventId: string }) {
  return useApiQuery(["receipts", params], {
    endpoint: "/producer/receipts",
    params,
    // schema: ReceiptsSchema,
    // select: adaptReceipts,
  });
}
