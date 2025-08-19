import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { adminChangeCouponSchema } from "@/features/admin/schema";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = adminChangeCouponSchema.safeParse(body);
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
      "/producer/admin/change-coupon",
      parsed.data
    );
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao atualizar cupom" },
      { status: 500 }
    );
  }
}
