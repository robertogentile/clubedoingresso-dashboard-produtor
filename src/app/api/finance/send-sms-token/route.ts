import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { sendSmsTokenResponseSchema } from "@/features/finance/schema";

const querySchema = z.object({
  producerId: z.coerce
    .number()
    .int()
    .positive("producerId deve ser um número positivo."),
  type: z.enum(["sms", "email"]).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      producerId: searchParams.get("producerId"),
      type: searchParams.get("type") || undefined,
    });
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { producerId, type } = parsed.data;

    const api = getApiServer();
    const { data: apiResponse } = await api.get("/producer/send-sms-token", {
      params: { producerId, type },
    });

    const validation = sendSmsTokenResponseSchema.safeParse(apiResponse.data);
    if (!validation.success) {
      console.error(
        "Erro de validação Zod (GET /api/finance/send-sms-token):",
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
      { success: false, error: "Falha ao enviar token por SMS/E-mail." },
      { status: 500 }
    );
  }
}
