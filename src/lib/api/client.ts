import axios, { AxiosInstance, AxiosError } from "axios";
import { toast } from "react-hot-toast";

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
    (config) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth-token")
          : null;

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
        return response.data.data;
      }

      return response.data;
    },
    (error: AxiosError<ApiError>) => {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 401:
            if (typeof window !== "undefined") {
              localStorage.removeItem("auth-token");
              localStorage.removeItem("refresh-token");
              // Remove o cookie também
              document.cookie =
                "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              window.location.href = "/login";
            }
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
            const message = data?.message || "Erro na requisição";
            toast.error(message);
        }
      } else if (error.request) {
        toast.error("Erro de conexão. Verifique sua internet.");
      } else {
        toast.error("Erro na configuração da requisição.");
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshTokenValue =
      typeof window !== "undefined"
        ? localStorage.getItem("refresh-token")
        : null;

    if (!refreshTokenValue) {
      return null;
    }

    const response = await apiClient.post("/producer/refresh-token", {
      refreshToken: refreshTokenValue,
    });

    if (response && typeof window !== "undefined") {
      localStorage.setItem("auth-token", response.data.accessToken);
      if (response.data.refreshToken) {
        localStorage.setItem("refresh-token", response.data.refreshToken);
      }
      return response.data.accessToken;
    }

    return null;
  } catch (error) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");
    }
    console.log(error);
    return null;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("refresh-token");
    // Remove o cookie também
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
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
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");
      window.location.href = "/login";
      // Broadcast logout para outras abas
      const bc = new BroadcastChannel("auth");
      bc.postMessage({ type: "logout", reason: "timeout" });
      bc.close();
    }, SESSION_TIMEOUT_MINUTES * 60 * 1000);
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "auth-token" && !e.newValue) {
      window.location.href = "/login";
    }
  });
  // BroadcastChannel para logout global
  const bc = new BroadcastChannel("auth");
  bc.onmessage = (event) => {
    if (event.data?.type === "logout") {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");
      window.location.href = "/login";
    }
    if (event.data?.type === "login") {
      resetSessionTimeout();
    }
  };
  // Resetar timeout em qualquer interação
  ["click", "keydown", "mousemove", "scroll", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, resetSessionTimeout);
  });
  resetSessionTimeout();
}
