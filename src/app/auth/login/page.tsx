"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthLogin } from "@/hooks/api/auth/use-login";
import Input from "@/components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();
  const loginMutation = useAuthLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldError({});
    let hasError = false;
    if (!validateEmail(email)) {
      setFieldError((prev) => ({ ...prev, email: "E-mail inválido." }));
      hasError = true;
    }
    if (!password || password.length < 6) {
      setFieldError((prev) => ({
        ...prev,
        password: "Senha deve ter pelo menos 6 caracteres.",
      }));
      hasError = true;
    }
    if (hasError) return;
    try {
      await loginMutation.mutateAsync({ email, password });
      router.replace("/admin/home");
    } catch (err) {
      const errorMsg =
        err instanceof Error && err.message
          ? err.message
          : "Erro ao fazer login. Verifique suas credenciais.";
      setError(errorMsg);
    }
  };

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
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Input
              label="E-mail"
              name="email"
              type="email"
              placeholder="exemplo@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="username"
              error={fieldError.email}
              leftIcon={
                <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
              }
            />
            <Input
              label="Senha"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              error={fieldError.password}
              leftIcon={
                <FontAwesomeIcon icon={faLock} className="text-primary" />
              }
            />
            {error && (
              <div className="text-red-600 text-sm text-center" role="alert">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
                disabled={loginMutation.isPending}
                aria-busy={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Entrando..." : "Acessar"}
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
