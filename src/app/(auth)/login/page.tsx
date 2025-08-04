"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthLogin } from "@/hooks/api/auth/useLogin";
import { Input, Button, Text, Link } from "@/components";
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
      router.replace("/home");
    } catch (err) {
      const errorMsg =
        err instanceof Error && err.message
          ? err.message
          : "Erro ao fazer login. Verifique suas credenciais.";
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <Text
        typeElement="h1"
        color="secondary"
        weight="700"
        size="34px"
        align="center"
        className="mb-8"
      >
        Área do produtor
      </Text>

      <Text
        color="secondary"
        weight="bold"
        size="16px"
        align="center"
        className="mb-2 tracking-wider uppercase"
      >
        Atenção
      </Text>
      <Text color="secondary" align="center" size="16px" className="mb-10">
        Este acesso é destinado a produtores do Clube do Ingresso.
      </Text>

      {/* Formulário */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-lightGray p-8">
        <Text color="primary" weight="500" size="20px" className="mb-6">
          Identifique-se
        </Text>

        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
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
            leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            error={fieldError.password}
            leftIcon={<FontAwesomeIcon icon={faLock} />}
          />

          {error && (
            <Text
              color="error"
              align="center"
              size="14px"
              className="mt-4"
              typeElement="div"
            >
              {error}
            </Text>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
            className="mt-6"
          >
            {loginMutation.isPending ? "Entrando..." : "Acessar"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/esqueci-senha"
            variant="secondary"
            size="sm"
            underline="none"
          >
            Perdeu a senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
