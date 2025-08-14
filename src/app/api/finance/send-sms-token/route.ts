import { NextRequest, NextResponse } from "next/server";
import { getApiServer } from "@/lib/api/server";
import { sendSmsTokenResponseSchema } from "@/features/finance/schema";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const producerId = searchParams.get("producerId");
    const type = searchParams.get("type") || undefined;
    if (!producerId) {
      return NextResponse.json(
        { success: false, error: "producerId é obrigatório" },
        { status: 400 }
      );
    }

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
