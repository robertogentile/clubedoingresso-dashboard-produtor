import { Link } from "@/components";
import { ROUTES } from "@/lib/config/routes";

export default function EsqueciSenhaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Esqueci minha senha
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Digite seu e-mail para receber as instruções de recuperação
          </p>
        </div>
        <div className="mt-8 space-y-6">
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar instruções
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link
              href={ROUTES.REDIRECTS.LOGIN}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
