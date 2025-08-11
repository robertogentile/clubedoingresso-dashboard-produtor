"use client";

import { useEffect, useState } from "react";
import { Sidebar, Header } from "@/components";
import { useAuthStore } from "@/lib/stores/authStore";
import { useInactivityMonitor } from "@/hooks/common/useInactivityMonitor";
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
  const { syncWithCookies, hydrate } = useAuthStore();

  // Monitoramento de inatividade
  useInactivityMonitor();

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-8 bg-gray-background">
            <div className="max-w-[1150px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
