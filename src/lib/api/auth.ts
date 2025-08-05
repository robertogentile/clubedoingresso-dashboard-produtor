import { apiClient } from "./client";
import { authActions } from "@/lib/stores/authActions";
import { RefreshTokenRequestSchema } from "@/lib/validations/auth/loginSchema";

export const refreshTokenRequest = async (): Promise<boolean> => {
  try {
    const refreshTokenValue =
      typeof window !== "undefined"
        ? localStorage.getItem("refresh-token")
        : null;

    const accessTokenValue =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

    if (!refreshTokenValue || !accessTokenValue) {
      return false;
    }

    // Valida o request
    const requestData = { refresh_token: refreshTokenValue };
    RefreshTokenRequestSchema.parse(requestData);

    const response = await apiClient.post(
      "/producer/refresh-token",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenValue}`,
        },
      }
    );

    // A API retorna data: {} vazio, então não precisamos atualizar tokens
    // Apenas verificamos se a requisição foi bem-sucedida
    return response && response.status === 201;
  } catch (error) {
    console.log("Refresh token failed:", error);
    authActions.clearTokens();
    return false;
  }
};
