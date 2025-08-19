"use server";
import { revalidatePath } from "next/cache";
import { getApiServer } from "@/lib/api/server";
import { z } from "zod";
import {
  createAccountSchema,
  createPixSchema,
  deletePixParamsSchema,
  deleteAccountParamsSchema,
  requestPaymentSchema,
} from "./schema";

interface FormState {
  message: string;
  errors?: Partial<Record<string, string[]>>;
  success: boolean;
}

export async function createAccountAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const api = getApiServer();
  const raw = {
    producerId: Number(formData.get("producerId")),
    name: String(formData.get("name") ?? ""),
    document: String(formData.get("document") ?? ""),
    bank: String(formData.get("bank") ?? ""),
    agency: String(formData.get("agency") ?? ""),
    account: String(formData.get("account") ?? ""),
  };
  const parsed = createAccountSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Erro de validação. Por favor, corrija os campos.",
      errors: z.flattenError(parsed.error).fieldErrors as unknown as Partial<
        Record<string, string[]>
      >,
      success: false,
    };
  }
  try {
    await api.post("/producer/account", parsed.data);
  } catch {
    return { message: "Erro ao cadastrar conta bancária.", success: false };
  }
  revalidatePath("/financeiro");
  return {
    message: "Conta bancária criada com sucesso!",
    success: true,
    errors: {},
  };
}

export async function deleteAccountAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const api = getApiServer();
  const raw = {
    producerId: String(formData.get("producerId") ?? ""),
    accountId: String(formData.get("accountId") ?? ""),
  };
  const parsed = deleteAccountParamsSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Parâmetros inválidos para exclusão.",
      success: false,
    };
  }
  try {
    await api.delete(
      `/producer/account?producerId=${raw.producerId}&accountId=${raw.accountId}`
    );
  } catch {
    return { message: "Erro ao excluir conta bancária.", success: false };
  }
  revalidatePath("/financeiro");
  return {
    message: "Conta bancária excluída com sucesso!",
    success: true,
  } as FormState;
}

export async function createPixAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const api = getApiServer();
  const raw = {
    producerId: Number(formData.get("producerId")),
    name: String(formData.get("name") ?? ""),
    type: String(formData.get("type") ?? ""),
    key: String(formData.get("key") ?? ""),
  };
  const parsed = createPixSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Erro de validação. Por favor, corrija os campos.",
      errors: z.flattenError(parsed.error).fieldErrors as unknown as Partial<
        Record<string, string[]>
      >,
      success: false,
    };
  }
  try {
    await api.post("/producer/pix", parsed.data);
  } catch {
    return { message: "Erro ao cadastrar chave PIX.", success: false };
  }
  revalidatePath("/financeiro");
  return {
    message: "Chave PIX criada com sucesso!",
    success: true,
    errors: {},
  };
}

export async function deletePixAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const api = getApiServer();
  const raw = {
    producerId: String(formData.get("producerId") ?? ""),
    pixId: String(formData.get("pixId") ?? ""),
  };
  const parsed = deletePixParamsSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Parâmetros inválidos para exclusão.",
      success: false,
    };
  }
  try {
    await api.delete(
      `/producer/pix?producerId=${raw.producerId}&pixId=${raw.pixId}`
    );
  } catch {
    return { message: "Erro ao excluir chave PIX.", success: false };
  }
  revalidatePath("/financeiro");
  return {
    message: "Chave PIX excluída com sucesso!",
    success: true,
  } as FormState;
}

export async function createRequestPaymentAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const api = getApiServer();
  const raw = {
    accountType: String(formData.get("accountType") ?? ""),
    producerId: Number(formData.get("producerId")),
    eventId: Number(formData.get("eventId")),
    producer: String(formData.get("producer") ?? ""),
    email: String(formData.get("email") ?? ""),
    event: String(formData.get("event") ?? ""),
    value: String(formData.get("value") ?? ""),
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    token: String(formData.get("token") ?? ""),
    // Campos específicos baseados no accountType
    ...(formData.get("accountType") === "account" && {
      document: String(formData.get("document") ?? ""),
      bank: String(formData.get("bank") ?? ""),
      agency: String(formData.get("agency") ?? ""),
      account: String(formData.get("account") ?? ""),
    }),
    ...(formData.get("accountType") === "pix" && {
      type: String(formData.get("type") ?? ""),
      key: String(formData.get("key") ?? ""),
    }),
    ...(formData.get("accountType") === "new" && {
      document: String(formData.get("document") ?? ""),
      bank: String(formData.get("bank") ?? ""),
      agency: String(formData.get("agency") ?? ""),
      account: String(formData.get("account") ?? ""),
      key: String(formData.get("key") ?? ""),
      type: String(formData.get("type") ?? ""),
    }),
  };

  const parsed = requestPaymentSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Erro de validação. Por favor, corrija os campos.",
      errors: z.flattenError(parsed.error).fieldErrors as unknown as Partial<
        Record<string, string[]>
      >,
      success: false,
    };
  }

  try {
    await api.post("/producer/create-request-payment", parsed.data);
  } catch {
    return { message: "Erro ao solicitar pagamento.", success: false };
  }

  revalidatePath("/financeiro");
  return {
    message: "Solicitação de pagamento criada com sucesso!",
    success: true,
    errors: {},
  };
}
