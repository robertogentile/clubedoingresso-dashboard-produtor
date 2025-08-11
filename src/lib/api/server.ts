import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import {
  ApiErrorSchema,
  type ApiErrorResponse,
} from "@/lib/validations/errorSchema";

export const getApiServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const api = axios.create({ baseURL: process.env.API_URL });
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return api;
};

// Helper central para requisições no servidor com validação do erro
export async function serverRequest<TResponse = unknown>(
  request: (api: Awaited<ReturnType<typeof getApiServer>>) => Promise<unknown>
): Promise<TResponse> {
  const api = await getApiServer();
  try {
    const response = (await request(api)) as unknown as { data?: unknown };
    const payload = Object.prototype.hasOwnProperty.call(response, "data")
      ? (response as { data: unknown }).data
      : (response as unknown);
    return payload as TResponse;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const data = error.response?.data;
    if (data) {
      const parsed = ApiErrorSchema.safeParse(data);
      if (parsed.success) {
        throw new Error(parsed.data.error.message);
      }
      const maybeMessage = (data as unknown as { message?: string }).message;
      if (typeof maybeMessage === "string") {
        throw new Error(maybeMessage);
      }
    }
    throw new Error("Erro na requisição ao servidor");
  }
}
