import { Sidebar, Header } from "@/components";

export default function CheckinPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Nome do show, espetáculo, peça, evento e etc.
              </h1>
              <p className="text-gray-600">10/03/2025</p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Check-in
              </h2>

              {/* Cards de Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Realizados
                  </h3>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* Círculo de progresso placeholder */}
                    <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                      <div
                        className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent"
                        style={{ transform: "rotate(18deg)" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            118
                          </div>
                          <div className="text-sm text-gray-600">5,6%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Restantes
                  </h3>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* Círculo de progresso placeholder */}
                    <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                      <div
                        className="absolute inset-0 rounded-full border-8 border-gray-800 border-t-transparent"
                        style={{ transform: "rotate(340deg)" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            1989
                          </div>
                          <div className="text-sm text-gray-600">94,4%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Senha de Validação */}
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Senha de validação:
                    </h3>
                    <p className="text-xl font-mono text-gray-700 mt-1">
                      testeclubedoingresso
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão de Exportar */}
              <div className="bg-white p-6 rounded-lg shadow">
                <button className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Exportar lista de participantes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
