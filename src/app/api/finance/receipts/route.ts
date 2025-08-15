import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { receiptsResponseSchema } from "@/features/finance/schema";

const querySchema = z.object({
  eventId: z.coerce
    .number()
    .int()
    .positive("eventId deve ser um número positivo."),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      eventId: searchParams.get("eventId"),
    });
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    const { eventId } = parsed.data;

    const api = getApiServer();
    const { data: apiResponse } = await api.get("/producer/receipts", {
      params: { eventId },
    });

    const validation = receiptsResponseSchema.safeParse(apiResponse.data);
    if (!validation.success) {
      console.error(
        "Erro de validação Zod (GET /api/finance/receipts):",
        validation.error
      );
      return NextResponse.json(
        {
          success: false,
          error: "Formato de dados da API externa é inválido.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: validation.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao buscar os recibos." },
      { status: 500 }
    );
  }
}
