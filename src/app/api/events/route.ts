import { NextRequest, NextResponse } from "next/server";
import { getApiServer } from "@/lib/api/server";
import { EventsResponseSchema } from "@/features/events/schema";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const producerId = searchParams.get("producerId");

    if (!producerId) {
      return NextResponse.json(
        { success: false, error: "producerId é obrigatório" },
        { status: 400 }
      );
    }

    const api = getApiServer();
    const response = await api.get("/producer/events", {
      params: { producerId },
    });
    const parsed = EventsResponseSchema.parse(response.data);

    return NextResponse.json({ success: true, data: parsed.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Falha ao buscar os eventos no servidor." },
      { status: 500 }
    );
  }
}
