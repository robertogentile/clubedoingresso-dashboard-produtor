"use client";

import { useState, useEffect } from "react";
import type { Event } from "@/features/events/schema";
import EventCard from "@/features/events/components/EventCard";

interface EventsTabsProps {
  events: {
    upcoming: Event[];
    past: Event[];
  };
}

export default function EventsTabs({ events }: EventsTabsProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [currentEvents, setCurrentEvents] = useState<Event[]>(events.upcoming);

  useEffect(() => {
    setCurrentEvents(tab === "upcoming" ? events.upcoming : events.past);
  }, [tab, events]);

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`border-b-2 py-2 px-1 text-sm font-medium focus:outline-none ${
              tab === "upcoming"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setTab("upcoming")}
          >
            PRÓXIMOS
          </button>
          <button
            className={`border-b-2 py-2 px-1 text-sm font-medium focus:outline-none ${
              tab === "past"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setTab("past")}
          >
            PASSADOS
          </button>
        </nav>
      </div>

      {/* Events Grid */}
      {currentEvents.length === 0 ? (
        <div className="text-center text-gray-500">
          Nenhum evento encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event) => (
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
      )}
    </div>
  );
}
