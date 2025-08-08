"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api/client";

interface RefreshResponse {
  message: string;
  data: {
    access_token: string;
  };
}

export async function refreshTokenAction() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh-token")?.value;

    if (!refreshToken) {
      return {
        success: false,
        message: "Refresh token não encontrado",
      };
    }

    // Fazer requisição para refresh
    const response = await apiClient.post("/producer/refresh-token", {
      refresh_token: refreshToken,
    });

    const validatedResponse = response as RefreshResponse;

    if (!validatedResponse.data?.access_token) {
      return {
        success: false,
        message: "Novo token não recebido",
      };
    }

    // Atualizar apenas o auth-token (refresh-token permanece o mesmo)
    cookieStore.set("auth-token", validatedResponse.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutos
    });

    return {
      success: true,
      message: "Token renovado com sucesso",
    };
  } catch (error: unknown) {
    console.error("Refresh token error:", error);

    // Se falhou, limpar cookies e retornar erro
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    cookieStore.delete("refresh-token");
    cookieStore.delete("producer-id");

    return {
      success: false,
      message: "Falha ao renovar token",
    };
  }
}
