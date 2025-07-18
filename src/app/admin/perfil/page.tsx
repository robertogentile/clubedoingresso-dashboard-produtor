import { Header, Sidebar } from "@/components";

export default function PerfilPage() {
  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Perfil</h2>

        {/* Meus Dados */}
        <div className="bg-white p-8 rounded-lg shadow mb-8">
          <h3 className="text-xl font-medium text-gray-900 mb-6">Meus dados</h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Contato
                </span>
              </div>
              <p className="text-gray-900 ml-7">Clube do Ingresso</p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Nome fantasia
                </span>
              </div>
              <p className="text-gray-900 ml-7">
                Demonstração Clube do Ingresso
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Celular
                </span>
              </div>
              <p className="text-gray-900 ml-7">11 9000-0000</p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  E-mail
                </span>
              </div>
              <p className="text-gray-900 ml-7">
                demonstracao@clubedoingresso.com
              </p>
            </div>
          </div>
        </div>

        {/* Alterar Senha */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            Alterar senha
          </h3>

          <form className="space-y-6 max-w-md">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha atual
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="current-password"
                  name="current-password"
                  type="password"
                  placeholder="Senha atual"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nova senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  placeholder="Nova senha"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmar senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Nova senha"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
