import { useAuthStore } from "@/lib/stores/auth-store";

export function useSelectedEvent() {
  const { selectedEvent, setSelectedEvent } = useAuthStore();

  return {
    selectedEvent,
    setSelectedEvent,
    hasSelectedEvent: !!selectedEvent,
  };
}
