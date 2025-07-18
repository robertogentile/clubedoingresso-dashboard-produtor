import { Sidebar, Header } from "@/components";

export default function RelatorioPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Nome do show, espetáculo, peça, evento e etc.
              </h1>
              <p className="text-gray-600">10/03/2025</p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Relatório de vendas
              </h2>

              {/* Filtros */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
                    Total
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                    7 dias
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                    Hoje
                  </button>
                </div>
              </div>

              {/* Cards de Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-90">
                      Total vendido
                    </p>
                    <p className="text-3xl font-bold">R$ 10.000,00</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">👥</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Ingressos
                      </p>
                      <p className="text-2xl font-bold text-gray-900">2246</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Detalhes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex space-x-8">
                    <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-2">
                      Detalhada por lote
                    </button>
                    <button className="text-sm font-medium text-gray-500 pb-2">
                      Detalhada por canal
                    </button>
                    <button className="text-sm font-medium text-gray-500 pb-2">
                      Detalhada por lote
                    </button>
                    <button className="text-sm font-medium text-gray-500 pb-2">
                      Por tipo
                    </button>
                    <button className="text-sm font-medium text-gray-500 pb-2">
                      Por setor
                    </button>
                    <button className="text-sm font-medium text-gray-500 pb-2">
                      Por grupo
                    </button>
                    <button className="text-sm font-medium text-gray-500 pb-2">
                      Lugares vendidos
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lote
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unitário
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Qtde
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(7)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                              <div className="text-sm text-gray-900">
                                1º - Lote com Taxa Site e Pdv com enquete
                                dropdown
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            R$ 10,00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            201
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
