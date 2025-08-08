"use client";

import { useEffect, useState } from "react";
import { Sidebar, Header } from "@/components";
import { useAuthStore } from "@/lib/stores/authStore";
import { useInactivityMonitor } from "@/hooks/common/useInactivityMonitor";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, producer, syncWithCookies } = useAuthStore();

  // Monitoramento de inatividade
  useInactivityMonitor();

  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === "undefined") {
      return;
    }

    // Sincronizar Zustand com localStorage
    syncWithCookies();

    // Aguardar um pouco para a sincronização acontecer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [syncWithCookies]);

  // Mostrar loading enquanto verifica autenticação
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

  // Se não está autenticado, mostrar loading
  // O middleware já cuidará do redirecionamento
  if (!isAuthenticated || !producer) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
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
