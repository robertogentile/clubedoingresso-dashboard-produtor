import { extractErrorMessage } from "@/lib/utils/errorUtils";

export function buildQuery(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    let message = "Erro na requisição";
    try {
      const data = await res.json();
      message = data?.error || data?.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export function normalizeBffError(error: unknown): string {
  return extractErrorMessage(error);
}
