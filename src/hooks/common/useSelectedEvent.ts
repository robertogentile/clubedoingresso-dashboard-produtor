import { useAuthStore } from "@/lib/stores/authStore";

export function useSelectedEvent() {
  const { selectedEvent, setSelectedEvent } = useAuthStore();

  return {
    selectedEvent,
    setSelectedEvent,
    hasSelectedEvent: !!selectedEvent,
  };
}
