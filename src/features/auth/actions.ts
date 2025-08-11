"use server";

import {
  LoginRequestSchema,
  LoginResponseSchema,
} from "@/features/auth/schema";
import { serverRequest } from "@/lib/api/server";
import { ROUTES } from "@/lib/config/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const responsePayload = await serverRequest((api) =>
      api.post("/producer/login", validatedFields.data)
    );

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
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("producer-id", producerData.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
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
