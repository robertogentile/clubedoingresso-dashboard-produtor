import { NextRequest, NextResponse } from "next/server";
import { getApiServer } from "@/lib/api/server";
import { checkPaymentAvailabilityResponseSchema } from "@/features/finance/schema";

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
    const { data: apiResponse } = await api.get(
      "/producer/check-payment-availability",
      {
        params: { producerId },
      }
    );

    const validation = checkPaymentAvailabilityResponseSchema.safeParse(
      apiResponse.data
    );
    if (!validation.success) {
      console.error(
        "Erro de validação Zod (GET /api/finance/check-payment-availability):",
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
      {
        success: false,
        error: "Falha ao verificar disponibilidade de pagamento.",
      },
      { status: 500 }
    );
  }
}
