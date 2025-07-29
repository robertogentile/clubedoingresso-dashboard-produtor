import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Producer {
  id: string;
  email: string;
  phone: string;
  contact: string;
  fantasy_name: string;
  permissions: Record<string, string>;
  features: Record<string, string>;
  app_permission: string;
  current_status: string;
}

interface SelectedEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  status: string;
}

interface AuthState {
  producer: Producer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedEvent: SelectedEvent | null;
  setProducer: (producer: Producer) => void;
  setSelectedEvent: (event: SelectedEvent | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  lastActivity: number | null;
  updateLastActivity: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      producer: null,
      isAuthenticated: false,
      isLoading: false,
      selectedEvent: null,
      lastActivity: null,
      setProducer: (producer) => set({ producer, isAuthenticated: true }),
      setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
      logout: () => {
        set({
          producer: null,
          isAuthenticated: false,
          lastActivity: null,
          selectedEvent: null,
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
          localStorage.removeItem("refresh-token");
          document.cookie =
            "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Remove cookie
          // Se for HttpOnly, o backend deve setar a expiração do cookie
        }
      },
      setLoading: (isLoading) => set({ isLoading }),
      setTokens: (accessToken, refreshToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", accessToken);
          localStorage.setItem("refresh-token", refreshToken);
          document.cookie = `auth-token=${accessToken}; path=/; SameSite=Strict; Secure`;
        }
      },
      clearTokens: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
          localStorage.removeItem("refresh-token");
          document.cookie =
            "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      },
      updateLastActivity: () => set({ lastActivity: Date.now() }),
    }),
    {
      name: "auth-store",
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
