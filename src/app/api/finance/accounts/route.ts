import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import {
  accountsResponseSchema,
  createAccountSchema,
  deleteAccountParamsSchema,
} from "@/features/finance/schema";

const queryParamsSchema = z.object({
  producerId: z.coerce
    .number()
    .int()
    .positive("producerId deve ser um número positivo."),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paramsValidation = queryParamsSchema.safeParse({
      producerId: searchParams.get("producerId"),
    });
    if (!paramsValidation.success) {
      return NextResponse.json(
        {
          success: false,
          error: z.flattenError(paramsValidation.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    const { producerId } = paramsValidation.data;

    const api = getApiServer();
    const { data: apiResponse } = await api.get("/producer/accounts", {
      params: { producerId },
    });

    const validation = accountsResponseSchema.safeParse(apiResponse.data);
    if (!validation.success) {
      console.error(
        "Erro de validação Zod (GET /api/finance/accounts):",
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
      { success: false, error: "Falha ao buscar as contas bancárias." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createAccountSchema.safeParse(body);
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
    const { data } = await api.post("/producer/account", parsed.data);
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao criar a conta bancária." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = {
      producerId: searchParams.get("producerId") ?? "",
      accountId: searchParams.get("accountId") ?? "",
    };
    const parsed = deleteAccountParamsSchema.safeParse(params);
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
    const { data } = await api.delete("/producer/account", {
      params: parsed.data,
    });
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao remover a conta bancária." },
      { status: 500 }
    );
  }
}
