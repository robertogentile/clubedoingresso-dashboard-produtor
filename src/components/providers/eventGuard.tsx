"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelectedEvent } from "@/hooks/common";
import { ROUTES } from "@/lib/config/routes";

interface EventGuardProps {
  children: React.ReactNode;
}

export default function EventGuard({ children }: EventGuardProps) {
  const { hasSelectedEvent } = useSelectedEvent();
  const router = useRouter();

  useEffect(() => {
    if (!hasSelectedEvent) {
      router.push(ROUTES.REDIRECTS.HOME);
    }
  }, [hasSelectedEvent, router]);

  if (!hasSelectedEvent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Selecione um evento primeiro</div>
          <button
            onClick={() => router.push(ROUTES.REDIRECTS.HOME)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ir para Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
