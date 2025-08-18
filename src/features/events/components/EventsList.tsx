"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input, EventCard } from "@/components";
import type { Event } from "@/features/events/schema";

async function fetchEvents(producerId: string, search?: string) {
  const params = new URLSearchParams({ producerId });
  if (search && search.trim().length > 0) {
    params.set("search", search.trim());
  }
  const res = await fetch(`/api/events?${params.toString()}`);
  if (!res.ok)
    throw new Error("Falha ao buscar eventos através do nosso servidor.");
  const json = await res.json();
  if (!json.success)
    throw new Error(json.error || "Um erro ocorreu no servidor.");
  return json.data as { upcoming: Event[]; past: Event[] };
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
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", producerId, searchParam],
    queryFn: () => fetchEvents(producerId, searchParam),
    initialData: initialEvents,
    enabled: !!producerId,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const currentEvents = useMemo(
    () => (activeTab === "upcoming" ? events?.upcoming : events?.past) || [],
    [activeTab, events]
  );

  const submitSearch = useCallback(() => {
    setSearchParam(searchInput.trim());
  }, [searchInput]);

  const handleBlurSearch = useCallback(() => {
    setSearchParam(searchInput.trim());
  }, [searchInput]);

  return (
    <div>
      {/* Busca */}
      <div className="mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitSearch();
          }}
        >
          <Input
            name="search"
            placeholder="Buscar evento ou local"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={handleBlurSearch}
            leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            inputSize="sm"
          />
        </form>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 w-full">
        <nav className="-mb-px grid grid-cols-2 w-full">
          <button
            className={`w-full text-center border-b-2 py-2 px-1 text-base md:text-lg font-semibold tracking-wide uppercase focus:outline-none ${
              activeTab === "upcoming"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            PRÓXIMOS
          </button>
          <button
            className={`w-full text-center border-b-2 py-2 px-1 text-base md:text-lg font-semibold tracking-wide uppercase focus:outline-none ${
              activeTab === "past"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("past")}
          >
            PASSADOS
          </button>
        </nav>
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <div className="text-center text-gray-500">Carregando...</div>
      ) : error ? (
        <div className="text-center text-red-500">Erro: {error.message}</div>
      ) : currentEvents.length === 0 ? (
        <div className="text-center text-gray-500">
          Nenhum evento encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
