"use client";
import { useEffect, useState } from "react";
import { EventCard } from "@/components";
import { useHomeEvents, Event } from "@/hooks/api/home/use-events";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function HomePage() {
  const producerId = useAuthStore((s) => s.producer?.id);
  const { data, isLoading, error } = useHomeEvents(producerId ?? "", {
    enabled: !!producerId,
  });
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  useEffect(() => {
    setTab("upcoming");
  }, [producerId]);

  if (!producerId) {
    return (
      <div className="text-center text-gray-500">Carregando usuário...</div>
    );
  }

  const events: Event[] = data?.data?.[tab] || [];

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Meus eventos</h2>

        {/* Evento selecionado */}
        {/*selectedEvent && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">
                  Evento selecionado:
                </h3>
                <p className="text-blue-700">{selectedEvent.name}</p>
                <p className="text-sm text-blue-600">
                  {new Date(selectedEvent.date).toLocaleDateString("pt-BR")} •{" "}
                  {selectedEvent.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Limpar seleção
              </button>
            </div>
          </div>
        )*/}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Buscar evento ou local"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
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
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="text-center text-gray-500">Carregando eventos...</div>
      ) : error ? (
        <div className="text-center text-red-600">
          Erro ao carregar eventos.
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500">
          Nenhum evento encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
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
