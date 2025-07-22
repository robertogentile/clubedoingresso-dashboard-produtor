import { useApiMutation } from "../use-api-mutation";
import { LoginResponseSchema } from "@/lib/validations/auth/login-schema";
import { useAuthStore } from "@/lib/stores/auth-store";

function setAuthCookie(token: string, isHttpOnly = false) {
  // Se a API suportar HttpOnly, o cookie deve ser setado pelo backend via Set-Cookie
  // Aqui setamos apenas para leitura do middleware (não HttpOnly)
  if (!isHttpOnly) {
    document.cookie = `auth-token=${token}; path=/; SameSite=Strict; Secure`;
  }
  // Se for HttpOnly, o backend deve setar: Set-Cookie: auth-token=...; HttpOnly; Secure; SameSite=Strict
}

export function useAuthLogin() {
  return useApiMutation({
    endpoint: "/producer/login",
    method: "POST",
    schema: LoginResponseSchema,
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        const { access_token, refresh_token, ...producerFields } = data.data;
        useAuthStore.getState().setProducer(producerFields);
        useAuthStore.getState().setTokens(access_token, refresh_token);
        useAuthStore.getState().updateLastActivity();
        setAuthCookie(access_token); // Cookie para SSR/SSG
        // Broadcast login para outras abas
        const bc = new BroadcastChannel("auth");
        bc.postMessage({ type: "login" });
        bc.close();
      }
    },
  });
}
