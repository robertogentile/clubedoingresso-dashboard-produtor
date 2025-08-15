import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { checkPaymentAvailabilityResponseSchema } from "@/features/finance/schema";

const querySchema = z.object({
  producerId: z.coerce
    .number()
    .int()
    .positive("producerId deve ser um número positivo."),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      producerId: searchParams.get("producerId"),
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

    const { producerId } = parsed.data;

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
