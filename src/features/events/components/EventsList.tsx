"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";
import type { Event } from "@/features/events/schema";

async function fetchEvents(producerId: string) {
  const res = await fetch(`/api/events?producerId=${producerId}`);
  if (!res.ok) {
    throw new Error("Falha ao buscar eventos através do nosso servidor.");
  }
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error || "Um erro ocorreu no servidor.");
  }
  return json.data;
}

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
    initialData: initialEvents,
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
