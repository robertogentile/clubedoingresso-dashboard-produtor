import { z } from "zod";
import { accountSchema, createAccountSchema } from "./schema";

export type Account = z.infer<typeof accountSchema>;
export type CreateAccountPayload = z.infer<typeof createAccountSchema>;
