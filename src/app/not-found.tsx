import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Página não encontrada
      </h1>
      <p className="text-gray-600 mb-8">
        O recurso que você procura não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
