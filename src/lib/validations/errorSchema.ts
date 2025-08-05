import { z } from "zod";

export const ApiErrorSchema = z.object({
  timestamp: z.string(),
  path: z.string(),
  error: z.object({
    name: z.union([
      z.string(),
      z.object({
        message: z.string(),
        statusCode: z.number(),
      }),
    ]),
    message: z.string(),
  }),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorSchema>;
