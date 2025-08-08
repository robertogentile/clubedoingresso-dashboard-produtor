"use server";

import {
  LoginRequestSchema,
  LoginResponseSchema,
} from "@/lib/validations/auth/loginSchema";
import { apiClient } from "@/lib/api/client";
import { cookies } from "next/headers";

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
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const response = await apiClient.post(
      "/producer/login",
      validatedFields.data
    );

    const validatedResponse = LoginResponseSchema.parse(response);
    const { access_token, refresh_token, ...producerData } =
      validatedResponse.data;

    if (!access_token || !refresh_token) {
      return {
        errors: {},
        message: "Tokens não recebidos da API.",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("auth-token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutos
    });

    cookieStore.set("refresh-token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    cookieStore.set("producer-id", producerData.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // Retornar dados para o cliente atualizar o Zustand
    return {
      success: true,
      data: {
        access_token,
        refresh_token,
        ...producerData,
      },
    };
  } catch (error: unknown) {
    console.error("Login error:", JSON.stringify(error, null, 2));

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
