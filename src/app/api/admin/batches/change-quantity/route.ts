import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { adminChangeBatchQuantitySchema } from "@/features/admin/schema";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = adminChangeBatchQuantitySchema.safeParse(body);
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
    const { data } = await api.patch(
      "/producer/admin/change-batch-quantity",
      parsed.data
    );
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao atualizar quantidade do lote" },
      { status: 500 }
    );
  }
}
