"use server";

import { cookies } from "next/headers";
import { serverRequest } from "@/lib/api/server";
import { z } from "zod";

const RefreshResponseSchema = z.object({
  message: z.string(),
  data: z.object({ access_token: z.string().min(1) }),
});

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function refreshTokenAction(): Promise<
  ActionResult<{ message: string }>
> {
  try {
    const cookieStore = await cookies();
    const refreshToken =
      cookieStore.get("refreshToken")?.value ??
      cookieStore.get("refresh-token")?.value ??
      "";

    if (!refreshToken) {
      return { success: false, error: "Refresh token não encontrado" };
    }

    const payload = await serverRequest((api) =>
      api.post("/producer/refresh-token", { refresh_token: refreshToken })
    );
    const validated = RefreshResponseSchema.parse(payload);

    cookieStore.set("accessToken", validated.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return { success: true, data: { message: validated.message } };
  } catch (error: unknown) {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("producer-id");
    return {
      success: false,
      error: error instanceof Error ? error.message : "Falha ao renovar token",
    };
  }
}
