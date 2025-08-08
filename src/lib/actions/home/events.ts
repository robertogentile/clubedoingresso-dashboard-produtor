"use server";

import { apiClient } from "@/lib/api/client";
import { EventsResponseSchema } from "@/lib/validations/home/eventsSchema";

export async function getEventsAction(producerId: string) {
  try {
    const response = await apiClient.get("/producer/events", {
      params: { producerId },
    });

    const validatedData = EventsResponseSchema.parse(response);

    return {
      success: true,
      data: validatedData.data,
    };
  } catch {
    return {
      success: false,
      data: null,
      error: "Erro ao carregar eventos",
    };
  }
}
