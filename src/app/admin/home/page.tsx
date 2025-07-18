import { Sidebar, Header, EventCard } from "@/components";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1">
          {/* Header */}
          <Header showUserInfo={true} userName="Emerson" />

          {/* Main Content */}
          <main className="p-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Meus eventos
                </h2>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="max-w-md">
                    <input
                      type="text"
                      placeholder="Buscar evento ou local"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button className="border-b-2 border-indigo-500 py-2 px-1 text-sm font-medium text-indigo-600">
                      PRÓXIMOS
                    </button>
                    <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      PASSADOS
                    </button>
                  </nav>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <EventCard
                  title="Nome do show, espetáculo, peça, evento e etc."
                  date="10/03/2025"
                  location="Carioca Club Pinheiros"
                  status="active"
                />
                <EventCard
                  title="Nome do show, espetáculo, peça, evento e etc."
                  date="10/03/2025"
                  location="Carioca Club Pinheiros"
                  status="hidden"
                />
                <EventCard
                  title="Nome do show, espetáculo, peça, evento e etc."
                  date="10/03/2025"
                  location="Carioca Club Pinheiros"
                  status="hidden"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
