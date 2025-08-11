"use server";

import { serverRequest } from "@/lib/api/server";
import { EventsResponseSchema } from "@/features/events/schema";

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getEventsAction(
  producerId: string
): Promise<
  ActionResult<ReturnType<typeof EventsResponseSchema.shape.data._type>>
> {
  try {
    const response = await serverRequest((api) =>
      api.get("/producer/events", { params: { producerId } })
    );
    const validatedData = EventsResponseSchema.parse(response);
    return { success: true, data: validatedData.data };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
}
