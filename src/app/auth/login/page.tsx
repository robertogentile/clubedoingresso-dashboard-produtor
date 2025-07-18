export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Área do Produtor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entre com suas credenciais para acessar o dashboard
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Identifique-se
            </h3>
          </div>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="exemplo@site.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Acessar
              </button>
            </div>
          </form>
          <div className="text-center">
            <a
              href="/auth/esqueci-senha"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Perdeu a senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
