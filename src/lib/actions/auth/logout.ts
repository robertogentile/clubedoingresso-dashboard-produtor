"use server";

import { cookies } from "next/headers";
import { ROUTES } from "@/lib/config/routes";

export async function logoutAction() {
  const cookieStore = await cookies();

  // Limpar todos os cookies de autenticação
  cookieStore.delete("auth-token");
  cookieStore.delete("refresh-token");
  cookieStore.delete("producer-id");

  // Retornar sucesso para o cliente redirecionar
  return {
    success: true,
    redirectTo: ROUTES.REDIRECTS.LOGIN,
  };
}
