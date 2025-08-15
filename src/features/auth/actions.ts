"use server";

import {
  LoginRequestSchema,
  LoginResponseSchema,
} from "@/features/auth/schema";
import { getApiServer } from "@/lib/api/server";
import { ROUTES } from "@/lib/config/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

interface LoginState {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
  data?: {
    access_token: string;
    refresh_token: string;
    id: string;
    email: string;
    phone: string;
    contact: string;
    fantasy_name: string;
    permissions: Record<string, string>;
    features: Record<string, string>;
    app_permission: string;
    current_status: string;
  };
}

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const validatedFields = LoginRequestSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: null,
    };
  }

  try {
    const api = getApiServer();
    const response = await api.post("/producer/login", validatedFields.data);
    const responsePayload = response.data;

    const validatedResponse = LoginResponseSchema.parse(responsePayload);
    const { access_token, refresh_token, ...producerData } =
      validatedResponse.data;

    if (!access_token || !refresh_token) {
      return {
        errors: {},
        message: "Tokens não recebidos da API.",
      };
    }

    // Salvar tokens em cookies httpOnly com novos nomes
    const cookieStore = await cookies();

    cookieStore.set("accessToken", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutos
    });

    cookieStore.set("refreshToken", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });

    cookieStore.set("producer-id", producerData.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    // Disponibilizar dados públicos do produtor para hidratar o Zustand via layout do servidor
    try {
      const publicProducer = {
        id: producerData.id,
        email: producerData.email,
        phone: producerData.phone,
        contact: producerData.contact,
        fantasy_name: producerData.fantasy_name,
        permissions: producerData.permissions,
        features: producerData.features,
        app_permission: producerData.app_permission,
        current_status: producerData.current_status,
      };
      const encoded = Buffer.from(JSON.stringify(publicProducer)).toString(
        "base64"
      );
      // httpOnly porque será lido apenas no servidor e repassado via props ao cliente
      cookieStore.set("producer", encoded, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    } catch {
      // Se falhar a serialização, seguimos só com os demais cookies
    }

    // Retornar dados para o cliente atualizar o Zustand
    const result: LoginState = {
      success: true,
      data: {
        access_token,
        refresh_token,
        ...producerData,
      },
    };

    // Redirecionar após sucesso (lança internamente um RedirectError)
    redirect(ROUTES.REDIRECTS.HOME);
    return result; // unreachable
  } catch (error: unknown) {
    // Propagar o erro de redirect interno do Next (identificado pelo campo 'digest')
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: unknown }).digest === "string" &&
      String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Login error:", error);

    let errorMessage = "Erro ao fazer login. Tente novamente.";

    if (error && typeof error === "object" && "response" in error) {
      const apiError = error as {
        response?: {
          status?: number;
          data?: {
            message?: string;
            errors?: string[];
          };
        };
      };

      if (apiError.response?.data?.message) {
        errorMessage = apiError.response.data.message;
      } else if (
        apiError.response?.data?.errors &&
        apiError.response.data.errors.length > 0
      ) {
        errorMessage = apiError.response.data.errors[0];
      } else {
        switch (apiError.response?.status) {
          case 401:
            errorMessage = "E-mail ou senha incorretos.";
            break;
          case 403:
            errorMessage = "Acesso negado. Verifique suas permissões.";
            break;
          case 429:
            errorMessage = "Muitas tentativas. Aguarde um momento.";
            break;
          case 422:
            errorMessage = "Dados inválidos. Verifique suas informações.";
            break;
          case 500:
            errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            break;
          default:
            errorMessage = "Erro ao fazer login. Tente novamente.";
        }
      }
    }

    return {
      errors: {},
      message: errorMessage,
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  // Limpar todos os cookies de autenticação
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("auth-token");
  cookieStore.delete("refresh-token");
  cookieStore.delete("producer-id");
  cookieStore.delete("producer");

  // Retornar sucesso para o cliente redirecionar
  return {
    success: true,
    redirectTo: ROUTES.REDIRECTS.LOGIN,
  };
}

export async function refreshTokenAction(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    await logoutAction();
    return null;
  }

  try {
    const api = getApiServer();
    const response = await api.post("/producer/refresh-token", {
      refresh_token: refreshToken,
    });
    type RefreshPayload =
      | { accessToken: string; refreshToken: string }
      | { data: { access_token: string; refresh_token: string } };
    const data = response.data as RefreshPayload;
    const newAccessToken =
      "accessToken" in data
        ? data.accessToken
        : (data as { data: { access_token: string } }).data.access_token;
    const newRefreshToken =
      "refreshToken" in data
        ? data.refreshToken
        : (data as { data: { refresh_token: string } }).data.refresh_token;

    if (!newAccessToken || !newRefreshToken) {
      throw new Error("Tokens inválidos recebidos da API de refresh.");
    }

    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 15,
    });

    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return newAccessToken;
  } catch {
    try {
      await logoutAction();
    } catch {}
    return null;
  }
}
