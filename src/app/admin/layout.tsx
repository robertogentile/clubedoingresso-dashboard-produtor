"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Header } from "@/components";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, producer } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se há token no localStorage como fallback
    const hasToken =
      typeof window !== "undefined" && localStorage.getItem("auth-token");

    // Se não está autenticado no Zustand mas tem token, aguarda um pouco
    if (!isAuthenticated && hasToken) {
      // Aguarda o Zustand carregar ou o token ser validado
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Se não está autenticado e não tem token, redireciona
    if (!isAuthenticated && !hasToken) {
      // Limpa qualquer token residual
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("refresh-token");
        document.cookie =
          "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      router.push("/auth/login");
    }

    setIsLoading(false);
  }, [isAuthenticated, producer, router]);

  // Se está carregando, mostra loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não renderiza nada
  if (!isAuthenticated || !producer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main Content com limite de largura e centralização */}
          <main className="flex-1 p-8 bg-gray-background">
            <div className="max-w-[1150px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
