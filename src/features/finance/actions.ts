"use server";
import { revalidatePath } from "next/cache";
import { getApiServer } from "@/lib/api/server";
import { createAccountSchema } from "./schema";
import type { CreateAccountPayload } from "./types";

interface FormState {
  message: string;
  errors?: Partial<Record<keyof CreateAccountPayload, string[]>>;
  success: boolean;
}

export async function createAccountAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const api = getApiServer();

  const rawData = {
    producerId: Number(formData.get("producerId")),
    name: formData.get("name"),
    document: formData.get("document"),
    bank: formData.get("bank"),
    agency: formData.get("agency"),
    account: formData.get("account"),
  };

  const validatedFields = createAccountSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "Erro de validação. Por favor, corrija os campos.",
      errors: validatedFields.error.flatten().fieldErrors as Partial<
        Record<keyof CreateAccountPayload, string[]>
      >, // sinaliza falha
      success: false,
    };
  }

  try {
    await api.post("/producer/account", validatedFields.data);
  } catch {
    return {
      message: "Ocorreu um erro no servidor ao tentar criar a conta.",
      success: false,
    };
  }

  revalidatePath("/financeiro");
  return { message: "Conta criada com sucesso!", success: true, errors: {} };
}
