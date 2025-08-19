import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApiServer } from "@/lib/api/server";
import {
  adminPromotersResponseSchema,
  adminCreatePromoterSchema,
} from "@/features/admin/schema";

const querySchema = z.object({
  eventId: z.coerce.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      eventId: searchParams.get("eventId"),
    });
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: z.flattenError(parsed.error).fieldErrors },
        { status: 400 }
      );
    }

    const api = getApiServer();
    const { data: apiResponse } = await api.get("/producer/admin/promoters", {
      params: { eventId: parsed.data.eventId },
    });

    const validation = adminPromotersResponseSchema.safeParse(apiResponse.data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Formato inválido da API externa" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data: validation.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao listar promoters" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = adminCreatePromoterSchema.safeParse(body);
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
      "/producer/admin/create-promoter",
      parsed.data
    );
    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao criar promoter" },
      { status: 500 }
    );
  }
}
