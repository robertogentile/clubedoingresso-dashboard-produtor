"use server";
import { revalidatePath } from "next/cache";
import { getApiServer } from "@/lib/api/server";
import {
  adminChangeBatchQuantitySchema,
  adminChangeBatchSchema,
  adminChangeCouponSchema,
  adminChangePromoterSchema,
  adminCreateCourtesySchema,
  adminEndSaleSchema,
  adminUpdateGoogleAnalyticsSchema,
  adminUpdateMetaSchema,
} from "./schema";
import { z } from "zod";

interface ActionState {
  message: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

function validationError(error: z.ZodError): ActionState {
  const formatted = error.format() as unknown as Record<
    string,
    { _errors?: string[] }
  >;
  const fieldErrors: Record<string, string[]> = {};
  for (const key of Object.keys(formatted)) {
    const entry = formatted[key];
    if (entry && Array.isArray(entry._errors) && entry._errors.length) {
      fieldErrors[key] = entry._errors;
    }
  }
  return { message: "Erro de validação.", success: false, errors: fieldErrors };
}

export async function adminChangePromoterAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    promoterId: Number(formData.get("promoterId")),
    eventId: Number(formData.get("eventId")),
    status: String(formData.get("status") ?? ""),
  };
  const parsed = adminChangePromoterSchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.patch(`/admin/promoters/change`, parsed.data);
  } catch {
    return { message: "Erro ao alterar promoter.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Promoter atualizado!", success: true };
}

export async function adminChangeCouponAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    couponId: Number(formData.get("couponId")),
    eventId: Number(formData.get("eventId")),
    status: String(formData.get("status") ?? ""),
  };
  const parsed = adminChangeCouponSchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.patch(`/admin/coupons/change`, parsed.data);
  } catch {
    return { message: "Erro ao alterar cupom.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Cupom atualizado!", success: true };
}

export async function adminChangeBatchAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    batchId: Number(formData.get("batchId")),
    producerId: Number(formData.get("producerId")),
    eventId: Number(formData.get("eventId")),
    status: String(formData.get("status") ?? ""),
  };
  const parsed = adminChangeBatchSchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.patch(`/admin/batches/change`, parsed.data);
  } catch {
    return { message: "Erro ao alterar lote.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Lote atualizado!", success: true };
}

export async function adminChangeBatchQuantityAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    batchId: Number(formData.get("batchId")),
    producerId: Number(formData.get("producerId")),
    eventId: Number(formData.get("eventId")),
    quantity: Number(formData.get("quantity")),
  };
  const parsed = adminChangeBatchQuantitySchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.patch(`/admin/batches/change-quantity`, parsed.data);
  } catch {
    return { message: "Erro ao alterar quantidade do lote.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Quantidade atualizada!", success: true };
}

export async function adminCreateCourtesyAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    eventId: Number(formData.get("eventId")),
    producerId: Number(formData.get("producerId")),
    email: String(formData.get("email") ?? ""),
    cart: JSON.parse(String(formData.get("cart") ?? "[]")) as Array<{
      batchId: number;
      quantity: number;
    }>,
  };
  const parsed = adminCreateCourtesySchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.post(`/admin/courtesies`, parsed.data);
  } catch {
    return { message: "Erro ao gerar cortesia.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Cortesia criada!", success: true };
}

export async function adminUpdateMetaAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    eventId: Number(formData.get("eventId")),
    producerId: Number(formData.get("producerId")),
    metaPixel: String(formData.get("metaPixel") ?? ""),
    metaToken: String(formData.get("metaToken") ?? ""),
  };
  const parsed = adminUpdateMetaSchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.patch(`/admin/settings/update-meta`, parsed.data);
  } catch {
    return { message: "Erro ao salvar Meta Pixel.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Configurações Meta atualizadas!", success: true };
}

export async function adminUpdateGoogleAnalyticsAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    eventId: Number(formData.get("eventId")),
    producerId: Number(formData.get("producerId")),
    gaId: String(formData.get("gaId") ?? ""),
    gaSecret: String(formData.get("gaSecret") ?? ""),
    measurementId: String(formData.get("measurementId") ?? ""),
    gtmId: String(formData.get("gtmId") ?? ""),
  };
  const parsed = adminUpdateGoogleAnalyticsSchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.patch(`/admin/settings/update-google-analytics`, parsed.data);
  } catch {
    return { message: "Erro ao salvar Google Analytics/ADs.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Configurações Google atualizadas!", success: true };
}

export async function adminEndSaleAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const api = getApiServer();
  const raw = {
    eventId: Number(formData.get("eventId")),
    producerId: Number(formData.get("producerId")),
  };
  const parsed = adminEndSaleSchema.safeParse(raw);
  if (!parsed.success) return validationError(parsed.error);
  try {
    await api.patch(`/admin/settings/end-sale`, parsed.data);
  } catch {
    return { message: "Erro ao encerrar venda.", success: false };
  }
  revalidatePath("/administracao");
  return { message: "Venda encerrada!", success: true };
}
