import { useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/stores/authStore";

// Configuração de timeout (em minutos)
const INACTIVITY_TIMEOUT_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_INACTIVITY_TIMEOUT_MINUTES || "30",
  10
);

export function useInactivityMonitor() {
  const { isAuthenticated, updateLastActivity, checkInactivity } =
    useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Função para atualizar atividade
    const updateActivity = () => {
      updateLastActivity();
    };

    // Função para verificar inatividade
    const checkActivity = () => {
      const wasInactive = checkInactivity();
      if (wasInactive) {
        console.log("Usuário foi desconectado por inatividade");
      }
    };

    // Eventos que indicam atividade do usuário
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
      "keydown",
    ];

    // Adicionar listeners para eventos de atividade
    activityEvents.forEach((event) => {
      document.addEventListener(event, updateActivity, true);
    });

    // Verificar inatividade a cada minuto
    intervalRef.current = setInterval(checkActivity, 60 * 1000);

    // Cleanup
    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, updateActivity, true);
      });

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, updateLastActivity, checkInactivity]);

  return {
    isMonitoring: isAuthenticated,
  };
}
