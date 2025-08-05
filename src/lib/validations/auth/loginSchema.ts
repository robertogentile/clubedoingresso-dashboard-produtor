import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const LoginResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.string(),
    email: z.string().email(),
    phone: z.string(),
    contact: z.string(),
    fantasy_name: z.string(),
    permissions: z.record(z.string(), z.string()),
    features: z.record(z.string(), z.string()),
    app_permission: z.string(),
    current_status: z.string(),
    access_token: z.string().min(1, "Token de acesso é obrigatório"),
    refresh_token: z.string().min(1, "Token de refresh é obrigatório"),
  }),
});

export const RefreshTokenRequestSchema = z.object({
  refresh_token: z.string().min(1, "Refresh token é obrigatório"),
});

export const RefreshTokenResponseSchema = z.object({
  message: z.string(),
  data: z.record(z.string(), z.unknown()), // data: {} vazio
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
