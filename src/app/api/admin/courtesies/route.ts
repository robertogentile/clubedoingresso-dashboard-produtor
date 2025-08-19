import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import { adminCreateCourtesySchema } from "@/features/admin/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = adminCreateCourtesySchema.safeParse(body);
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
      "/producer/admin/create-courtesy",
      parsed.data
    );
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao criar cortesia" },
      { status: 500 }
    );
  }
}
