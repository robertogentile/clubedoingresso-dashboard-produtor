"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { EventCard } from "@/components";
import { Event } from "@/hooks/api/home/useEvents";

// A função de fetch que o TanStack Query usará para refetch, etc.
const fetchEvents = async (producerId: string) => {
  const { data } = await apiClient.get("/producer/events", {
    params: { producerId },
  });
  return data;
};

interface EventsListProps {
  initialEvents: {
    upcoming: Event[];
    past: Event[];
  };
  producerId: string;
}

export default function EventsList({
  initialEvents,
  producerId,
}: EventsListProps) {
  const { data: events } = useQuery({
    queryKey: ["events", producerId],
    queryFn: () => fetchEvents(producerId),
    initialData: initialEvents, // Hidratação dos dados iniciais!
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events?.upcoming?.map((event: Event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.name}
          date={new Date(event.date).toLocaleDateString("pt-BR")}
          location={event.location}
          status={event.status as "Ativo" | "Oculto" | "Inativo"}
          imageUrl={event.banner ?? undefined}
        />
      ))}
    </div>
  );
}
