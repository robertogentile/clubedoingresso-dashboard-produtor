"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelectedEvent } from "@/features/events/hooks/useSelectedEvent";
import { ROUTES } from "@/lib/config/routes";

interface EventGuardProps {
  children: React.ReactNode;
}

export default function EventGuard({ children }: EventGuardProps) {
  const { hasSelectedEvent } = useSelectedEvent();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirecionamento para home se não há evento selecionado
  useEffect(() => {
    if (!hasSelectedEvent) {
      setIsRedirecting(true);
      router.push(ROUTES.REDIRECTS.HOME);
    }
  }, [hasSelectedEvent, router]);

  // Mostrar loading durante redirecionamento
  if (isRedirecting || !hasSelectedEvent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
