import { NextRequest, NextResponse } from "next/server";
import { getApiServer } from "@/lib/api/server";
import { requestPaymentSchema } from "@/features/finance/schema";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = requestPaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Payload inválido",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    const api = getApiServer();
    const { data } = await api.post(
      "/producer/create-request-payment",
      parsed.data
    );
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao solicitar pagamento." },
      { status: 500 }
    );
  }
}
