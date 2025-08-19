import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { adminCourtesyBatchesResponseSchema } from "@/features/admin/schema";

const querySchema = z.object({
  eventId: z.coerce.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      eventId: searchParams.get("eventId"),
    });
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: z.flattenError(parsed.error).fieldErrors },
        { status: 400 }
      );
    }
    const api = getApiServer();
    const { data: apiResponse } = await api.get(
      "/producer/admin/batches-courtesy",
      { params: { eventId: parsed.data.eventId } }
    );
    const validation = adminCourtesyBatchesResponseSchema.safeParse(
      apiResponse.data
    );
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Formato inválido da API externa" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data: validation.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao listar lotes de cortesia" },
      { status: 500 }
    );
  }
}
