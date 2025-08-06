"use client";
import { useState } from "react";
import { Input, Button, Text, Link } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "@/lib/config/routes";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    setIsLoading(true);

    try {
      // Simular envio de e-mail (substitua pela sua lógica de API)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError("Erro ao enviar instruções. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center px-4">
        <Text
          typeElement="h1"
          color="secondary"
          weight="700"
          align="center"
          className="mb-4 md:mb-8 sm:text-24px md:text-[28px] lg:text-34px"
        >
          E-mail enviado!
        </Text>

        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-lightGray p-6 md:p-8 text-center">
          <Text color="success" weight="500" size="16-20" className="mb-4">
            ✓ Instruções enviadas
          </Text>

          <Text color="secondary" size="14-16" className="mb-6">
            Enviamos as instruções de recuperação para <strong>{email}</strong>.
            Verifique sua caixa de entrada e spam.
          </Text>

          <Link
            href={ROUTES.REDIRECTS.LOGIN}
            variant="primary"
            size="md"
            className="inline-block"
            underline="none"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4">
      <Text
        typeElement="h1"
        color="secondary"
        weight="700"
        align="center"
        size="24-28-34"
        className="mb-4 md:mb-8"
      >
        Esqueci minha senha
      </Text>

      <Text
        color="secondary"
        align="center"
        size="12-16"
        className="max-w-md mb-4 md:mb-10"
      >
        Digite abaixo seu e-mail de cadastro para enviarmos um link para
        redefinir a nova senha
      </Text>

      {/* Formulário */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-lightGray p-6 md:p-8">
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
            error={error}
            leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            className="mt-4 md:mt-6"
          >
            {isLoading ? "Enviando..." : "Enviar instruções"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link
            href={ROUTES.REDIRECTS.LOGIN}
            variant="secondary"
            size="sm"
            underline="none"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
