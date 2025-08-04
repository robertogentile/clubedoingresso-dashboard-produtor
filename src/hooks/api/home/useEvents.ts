import { useApiQuery } from "../useApiQuery";
import {
  EventsResponseSchema,
  Event,
} from "@/lib/validations/home/eventsSchema";

export function useHomeEvents(
  producerId: string,
  options?: { enabled?: boolean }
) {
  return useApiQuery(["events", producerId], {
    endpoint: "/producer/events",
    params: { producerId },
    schema: EventsResponseSchema,
    enabled: options?.enabled !== false && !!producerId,
  });
}

export type { Event };
