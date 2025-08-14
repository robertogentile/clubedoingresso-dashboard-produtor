import { useAuthStore } from "@/lib/stores/authStore";

function toStringId(value: string | number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str.length > 0 ? str : null;
}

export function resolveProducerId(input?: string | number | null): string {
  const direct = toStringId(input);
  if (direct) return direct;
  try {
    const fromStore = toStringId(useAuthStore.getState().producer?.id);
    if (fromStore) return fromStore;
  } catch {}
  throw new Error("producerId não encontrado");
}

export function resolveEventId(input?: string | number | null): string {
  const direct = toStringId(input);
  if (direct) return direct;
  try {
    const state = useAuthStore.getState();
    const fromStore = toStringId(state.selectedEvent?.id);
    if (fromStore) return fromStore;
  } catch {}
  throw new Error("eventId não encontrado");
}
