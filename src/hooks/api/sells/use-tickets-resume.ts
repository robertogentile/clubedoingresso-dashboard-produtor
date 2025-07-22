//TODO: Ajustar conforme detalhes do endpoint futuramente
import { useApiQuery } from "../use-api-query";
// import { TicketsResumeSchema } from "@/lib/validations/sells/tickets-resume-schema";
// import { adaptTicketsResume } from "@/lib/adapters/sells/tickets-resume-adapter";

export function useSellsTicketsResume(params: {
  eventId: string;
  period?: string;
  initialDate?: string;
  finalDate?: string;
}) {
  return useApiQuery(["tickets-resume", params], {
    endpoint: "/producer/tickets-resume",
    params,
    // schema: TicketsResumeSchema,
    // select: adaptTicketsResume,
  });
}
