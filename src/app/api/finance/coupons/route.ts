import { NextRequest, NextResponse } from "next/server";
import { getApiServer } from "@/lib/api/server";
import { couponsResponseSchema } from "@/features/finance/schema";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    if (!eventId) {
      return NextResponse.json(
        { success: false, error: "eventId é obrigatório" },
        { status: 400 }
      );
    }

    const api = getApiServer();
    const { data: apiResponse } = await api.get("/producer/coupons", {
      params: { eventId },
    });

    const validation = couponsResponseSchema.safeParse(apiResponse.data);
    if (!validation.success) {
      console.error(
        "Erro de validação Zod (GET /api/finance/coupons):",
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
      { success: false, error: "Falha ao buscar cupons." },
      { status: 500 }
    );
  }
}
