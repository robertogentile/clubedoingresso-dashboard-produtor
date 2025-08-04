//TODO: Ajustar schema conforme detalhes do endpoint futuramente
import { z } from "zod";

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
    access_token: z.string(),
    refresh_token: z.string(),
  }),
});
