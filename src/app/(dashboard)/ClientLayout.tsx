"use client";

import { useEffect, useState } from "react";
import { Sidebar, Header } from "@/components";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRef } from "react";
import type { Producer } from "@/lib/stores/types";

interface ClientLayoutProps {
  children: React.ReactNode;
  initialProducer: Producer | null;
}

export default function ClientLayout({
  children,
  initialProducer,
}: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { syncWithCookies, hydrate, selectedEvent, producer } = useAuthStore();

  // Monitoramento de inatividade (inlined)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!useAuthStore.getState().isAuthenticated) return;

    function debounce<T extends (...args: unknown[]) => void>(
      func: T,
      wait: number
    ) {
      let timeout: ReturnType<typeof setTimeout>;
      return function executedFunction(...args: Parameters<T>) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    const debouncedUpdate = debounce(() => {
      useAuthStore.getState().updateLastActivity();
    }, 1000);

    const checkActivity = () => {
      const wasInactive = useAuthStore.getState().checkInactivity();
      if (wasInactive) {
        // handled by store logout flow
      }
    };

    const activityEvents = [
      "mousedown",
      "keypress",
      "click",
      "touchstart",
      "scroll",
    ];
    activityEvents.forEach((event) => {
      document.addEventListener(event, debouncedUpdate, true);
    });

    intervalRef.current = setInterval(checkActivity, 5 * 60 * 1000);

    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, debouncedUpdate, true);
      });
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Hidratar Zustand com dados do servidor
    if (initialProducer) {
      hydrate(initialProducer);
    }

    // Sincronizar demais dados persistidos
    syncWithCookies();

    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [hydrate, initialProducer, syncWithCookies]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-4 md:p-8 bg-gray-background">
            <div className="max-w-[1150px] mx-auto">
              <div className="lg:hidden">
                {selectedEvent ? (
                  <div className=" rounded-lg mb-4">
                    <h2 className="text-base font-semibold text-primary truncate">
                      {selectedEvent.name}
                    </h2>
                    <p className="text-sm text-secondary">
                      {formatDate(selectedEvent.date)}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg mb-4">
                    <p className="text-base text-primary">
                      Olá, {producer?.fantasy_name || "Usuário"}!
                    </p>
                  </div>
                )}
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
