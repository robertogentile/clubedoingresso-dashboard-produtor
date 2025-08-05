import { useApiMutation } from "../useApiMutation";
import { LoginResponseSchema } from "@/lib/validations/auth/loginSchema";
import { useAuthStore } from "@/lib/stores/authStore";
import { extractErrorMessage } from "@/lib/utils/errorUtils";

export function useAuthLogin() {
  const login = useAuthStore((state) => state.login);

  return useApiMutation({
    endpoint: "/producer/login",
    method: "POST",
    schema: LoginResponseSchema,
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        login(data.data);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
}

export function useLoginErrorHandler() {
  return {
    extractLoginError: (error: unknown): string => {
      return extractErrorMessage(error);
    },
  };
}
