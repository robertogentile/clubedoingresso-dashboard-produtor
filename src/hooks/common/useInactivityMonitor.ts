import { useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/stores/authStore";

// Função debounce para evitar muitas atualizações
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function useInactivityMonitor() {
  const { isAuthenticated, updateLastActivity, checkInactivity } =
    useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Debounce para evitar muitas atualizações (1 segundo)
    const debouncedUpdate = debounce(() => {
      updateLastActivity();
    }, 1000);

    // Função para verificar inatividade
    const checkActivity = () => {
      const wasInactive = checkInactivity();
      if (wasInactive) {
        console.log("Usuário foi desconectado por inatividade");
      }
    };

    // Apenas eventos essenciais (reduzido de 7 para 4)
    const activityEvents = [
      "mousedown",
      "keypress",
      "click",
      "touchstart",
      "scroll",
    ];

    // Adicionar listeners para eventos de atividade
    activityEvents.forEach((event) => {
      document.addEventListener(event, debouncedUpdate, true);
    });

    // Verificar inatividade a cada 5 minutos (reduzido de 1 para 5 minutos)
    intervalRef.current = setInterval(checkActivity, 5 * 60 * 1000);

    // Cleanup
    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, debouncedUpdate, true);
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
