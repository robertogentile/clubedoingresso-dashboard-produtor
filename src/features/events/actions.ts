"use server";

import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { EventsResponseSchema } from "@/features/events/schema";

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getEventsAction(
  producerId: string
): Promise<ActionResult<z.infer<typeof EventsResponseSchema>["data"]>> {
  try {
    const api = getApiServer();
    const response = await api.get("/producer/events", {
      params: { producerId },
    });
    const validatedData = EventsResponseSchema.parse(response.data);
    return { success: true, data: validatedData.data };
  } catch (e) {
    return { success: false, error: (e as Error).message } as ActionResult<
      z.infer<typeof EventsResponseSchema>["data"]
    >;
  }
}
