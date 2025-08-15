import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { EventsResponseSchema } from "@/features/events/schema";

const querySchema = z.object({
  producerId: z.coerce
    .number()
    .int()
    .positive("producerId deve ser um número positivo."),
  search: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      producerId: searchParams.get("producerId"),
      search: searchParams.get("search") ?? undefined,
    });
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: z.flattenError(parsed.error).fieldErrors },
        { status: 400 }
      );
    }

    const { producerId, search } = parsed.data;

    const api = getApiServer();
    const response = await api.get("/producer/events", {
      params: {
        producerId,
        ...(search ? { search } : {}),
      },
    });
    const parsedResponse = EventsResponseSchema.parse(response.data);

    return NextResponse.json({ success: true, data: parsedResponse.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao buscar os eventos no servidor." },
      { status: 500 }
    );
  }
}
