import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authActions } from "./authActions";
import { Producer, SelectedEvent, LoginData } from "./types";

interface AuthState {
  producer: Producer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedEvent: SelectedEvent | null;
  lastActivity: number | null;
}

interface AuthActions {
  login: (data: LoginData) => void;
  logout: () => void;
  setSelectedEvent: (event: SelectedEvent | null) => void;
  setLoading: (loading: boolean) => void;
  updateLastActivity: () => void;
  checkInactivity: () => boolean;
  syncWithCookies: () => void;
  hydrate: (producer: Producer | null) => void;
}

// Configuração de timeout (em minutos)
const INACTIVITY_TIMEOUT_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_INACTIVITY_TIMEOUT_MINUTES || "30",
  10
);

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      producer: null,
      isAuthenticated: false,
      isLoading: false,
      selectedEvent: null,
      lastActivity: null,

      login: (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { access_token, refresh_token, ...producerFields } = data;
        set({
          producer: producerFields,
          isAuthenticated: true,
          lastActivity: Date.now(),
        });
        authActions.broadcastLogin();
      },

      logout: () => {
        set({
          producer: null,
          isAuthenticated: false,
          lastActivity: null,
          selectedEvent: null,
        });
        authActions.broadcastLogout();

        // O redirecionamento será feito pelo Server Action
        // Não redirecionar aqui para evitar conflitos
      },

      setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
      setLoading: (isLoading) => set({ isLoading }),
      updateLastActivity: () => set({ lastActivity: Date.now() }),

      syncWithCookies: () => {
        if (typeof window === "undefined") return;

        const state = get();
        if (state.isAuthenticated && state.producer) {
          return;
        }

        // Se não está autenticado no Zustand, verificar se há cookies
        // Como não podemos acessar cookies httpOnly no cliente,
        // vamos assumir que se não há dados no Zustand, não está autenticado
        if (!state.isAuthenticated || !state.producer) {
          // Limpar estado se não há dados
          set({
            producer: null,
            isAuthenticated: false,
            lastActivity: null,
            selectedEvent: null,
          });
        }
      },

      hydrate: (producer) => {
        if (producer) {
          set({ producer, isAuthenticated: true, lastActivity: Date.now() });
        } else {
          set({ producer: null, isAuthenticated: false });
        }
      },

      checkInactivity: () => {
        const state = get();
        if (!state.isAuthenticated || !state.lastActivity) {
          return false;
        }

        const now = Date.now();
        const timeSinceLastActivity = now - state.lastActivity;
        const timeoutMs = INACTIVITY_TIMEOUT_MINUTES * 60 * 1000;

        if (timeSinceLastActivity > timeoutMs) {
          // Auto logout por inatividade
          state.logout();
          if (typeof window !== "undefined") {
            // Usar o mesmo padrão do logout manual
            import("@/features/auth/actions").then(({ logoutAction }) => {
              logoutAction().then((result) => {
                if (result.success && result.redirectTo) {
                  window.location.href = result.redirectTo;
                }
              });
            });
          }
          return true;
        }

        return false;
      },
    }),
    {
      name: "authStore",
      partialize: (state) => ({
        producer: state.producer,
        isAuthenticated: state.isAuthenticated,
        lastActivity: state.lastActivity,
        selectedEvent: state.selectedEvent,
      }),
    }
  )
);

// Helpers para permissões/features
export function hasPermission(permission: string): boolean {
  const store = useAuthStore.getState();
  return (
    !!store.producer?.permissions?.[permission] &&
    store.producer.permissions[permission] === "active"
  );
}

export function hasFeature(feature: string): boolean {
  const store = useAuthStore.getState();
  return (
    !!store.producer?.features?.[feature] &&
    store.producer.features[feature] === "active"
  );
}
