import { getEventsAction } from "@/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import EventsTabs from "./components/EventsTabs";

// Função para buscar os dados no servidor
async function getEvents() {
  try {
    // Buscar producerId dos cookies httpOnly
    const cookieStore = await cookies();
    const producerId = cookieStore.get("producer-id")?.value;
    const authToken = cookieStore.get("auth-token")?.value;

    // Verificar autenticação
    if (!authToken || !producerId) {
      // Redirecionar para login se não estiver autenticado
      redirect(ROUTES.REDIRECTS.LOGIN);
    }

    const result = await getEventsAction(producerId);

    if (result.success && result.data) {
      return result.data;
    }

    return {
      upcoming: [],
      past: [],
    };
  } catch {
    return {
      upcoming: [],
      past: [],
    };
  }
}

export default async function HomePage() {
  // Buscar dados no servidor
  const events = await getEvents();

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Meus eventos</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Buscar evento ou local"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Componente cliente para tabs interativas */}
      <EventsTabs events={events} />
    </div>
  );
}
