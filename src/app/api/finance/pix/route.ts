import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import {
  pixResponseSchema,
  createPixSchema,
  deletePixParamsSchema,
} from "@/features/finance/schema";

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
    const { data: apiResponse } = await api.get("/producer/pix", {
      params: { producerId },
    });

    const validation = pixResponseSchema.safeParse(apiResponse.data);
    if (!validation.success) {
      console.error(
        "Erro de validação Zod (GET /api/finance/pix):",
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
      { success: false, error: "Falha ao buscar chaves PIX." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createPixSchema.safeParse(body);
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
    const { data } = await api.post("/producer/pix", parsed.data);
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao criar chave PIX." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = {
      producerId: searchParams.get("producerId") ?? "",
      pixId: searchParams.get("pixId") ?? "",
    };
    const parsed = deletePixParamsSchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Parâmetros inválidos",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 400 }
      );
    }
    const api = getApiServer();
    const { data } = await api.delete("/producer/pix", { params: parsed.data });
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao remover chave PIX." },
      { status: 500 }
    );
  }
}
