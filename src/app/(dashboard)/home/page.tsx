import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
// import EventsTabs from "./components/EventsTabs";
import EventsList from "@/features/events/components/EventsList";

// Busca inicial utilizando fetch do servidor com cache do Next.js
async function getEvents() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("accessToken")?.value ??
    cookieStore.get("auth-token")?.value;
  const producerId = cookieStore.get("producer-id")?.value;

  if (!token || !producerId) redirect(ROUTES.REDIRECTS.LOGIN);

  const response = await fetch(
    `${process.env.API_URL}/producer/events?producerId=${producerId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    return { upcoming: [], past: [] };
  }
  const json = await response.json();
  return json?.data ?? { upcoming: [], past: [] };
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const producerId = cookieStore.get("producer-id")?.value || "";
  const events = await getEvents();

  return (
    <div className="px-0 py-6">
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

      {/* Componente cliente hidratado com dados iniciais */}
      <EventsList initialEvents={events} producerId={producerId} />
    </div>
  );
}
