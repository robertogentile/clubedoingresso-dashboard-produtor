import axios, { AxiosInstance, AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ROUTES } from "@/lib/config/routes";
import { authActions } from "@/lib/stores/authActions";
import { extractErrorMessage } from "@/lib/utils/errorUtils";
import { cookies } from "next/headers";
import { refreshTokenAction } from "@/lib/actions/auth/refresh";

// Tipos para as respostas da API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  status?: number;
}

// Configuração base do cliente
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor para adicionar token de autenticação
  client.interceptors.request.use(
    async (config) => {
      // Buscar token apenas de cookies httpOnly (servidor)
      let token: string | null = null;

      if (typeof window === "undefined") {
        // Servidor: usar cookies httpOnly
        try {
          const cookieStore = await cookies();
          token = cookieStore.get("auth-token")?.value || null;
        } catch (error) {
          console.error("Error getting auth token from cookies:", error);
        }
      }
      // Cliente: não acessar tokens - apenas cookies httpOnly

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para tratar respostas
  client.interceptors.response.use(
    (response) => {
      if (response.data && typeof response.data.success === "boolean") {
        if (!response.data.success) {
          const error = new Error(
            response.data.message || "Erro na requisição"
          );
          return Promise.reject(error);
        }
        return response.data;
      }

      return response.data;
    },
    async (error: AxiosError<ApiError>) => {
      // Só executar lógica específica do cliente se estivermos no browser
      if (typeof window !== "undefined") {
        if (error.response) {
          const { status } = error.response;

          switch (status) {
            case 401:
              // Tentar refresh token uma vez
              try {
                const refreshResult = await refreshTokenAction();
                if (refreshResult.success) {
                  // Se refresh deu certo, refazer a requisição original
                  const originalRequest = error.config;
                  if (originalRequest) {
                    // Buscar novo token dos cookies
                    const cookieStore = await cookies();
                    const newToken = cookieStore.get("auth-token")?.value;
                    if (newToken) {
                      originalRequest.headers.Authorization = `Bearer ${newToken}`;
                      return client(originalRequest);
                    }
                  }
                }
              } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
              }

              // Se refresh falhou ou não foi possível refazer requisição
              authActions.clearTokens();
              window.location.href = ROUTES.REDIRECTS.LOGIN;
              toast.error("Sessão expirada. Faça login novamente.");
              break;

            case 403:
              toast.error("Acesso negado. Verifique suas permissões.");
              break;

            case 429:
              toast.error("Muitas requisições. Aguarde um momento.");
              break;

            case 500:
              toast.error("Erro interno do servidor. Tente novamente.");
              break;

            default:
              const errorMessage = extractErrorMessage(error);
              toast.error(errorMessage);
          }
        } else if (error.request) {
          toast.error("Erro de conexão. Verifique sua internet.");
        } else {
          toast.error("Erro na configuração da requisição.");
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

// Funções específicas do cliente (só executam no browser)
export const logout = () => {
  if (typeof window !== "undefined") {
    authActions.clearTokens();
    authActions.broadcastLogout();
    window.location.href = ROUTES.REDIRECTS.LOGIN;
  }
};

const SESSION_TIMEOUT_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_SESSION_TIMEOUT_MINUTES || "30",
  10
);
let sessionTimeoutId: ReturnType<typeof setTimeout> | null = null;

function resetSessionTimeout() {
  if (sessionTimeoutId) clearTimeout(sessionTimeoutId);
  if (typeof window !== "undefined") {
    sessionTimeoutId = setTimeout(() => {
      authActions.clearTokens();
      authActions.broadcastLogout();
      window.location.href = ROUTES.REDIRECTS.LOGIN;
    }, SESSION_TIMEOUT_MINUTES * 60 * 1000);
  }
}

// Event listeners só no cliente
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "auth-token" && !e.newValue) {
      window.location.href = ROUTES.REDIRECTS.LOGIN;
    }
  });

  const bc = new BroadcastChannel("auth");
  bc.onmessage = (event) => {
    if (event.data?.type === "logout") {
      authActions.clearTokens();
      window.location.href = ROUTES.REDIRECTS.LOGIN;
    }
    if (event.data?.type === "login") {
      resetSessionTimeout();
    }
  };

  ["click", "keydown", "mousemove", "scroll", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, resetSessionTimeout);
  });
}
