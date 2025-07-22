//TODO: Ajustar conforme detalhes do endpoint futuramente
import { useApiQuery } from "../use-api-query";
// import { SellsAudienceSchema } from "@/lib/validations/audience/sells-audience-schema";
// import { adaptSellsAudience } from "@/lib/adapters/audience/sells-audience-adapter";

export function useAudienceSellsAudience(params: { eventId: string }) {
  return useApiQuery(["sells-audience", params], {
    endpoint: "/producer/sells-audience",
    params,
    // schema: SellsAudienceSchema,
    // select: adaptSellsAudience,
  });
}
