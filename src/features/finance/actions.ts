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
  const rawData = {
    name: formData.get("name"),
    document: formData.get("document"),
    bank: formData.get("bank"),
    agency: formData.get("agency"),
    account: formData.get("account"),
    producerId: Number(formData.get("producerId")),
  };

  const validatedFields = createAccountSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      message: "Erro de validação. Por favor, corrija os campos destacados.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const api = getApiServer();
    await api.post("/producer/account", validatedFields.data);
    revalidatePath("/financeiro");
    return {
      message: "Conta bancária criada com sucesso!",
      success: true,
      errors: {},
    };
  } catch {
    return {
      message: "Ocorreu uma falha no servidor ao tentar criar a conta.",
      success: false,
    };
  }
}
