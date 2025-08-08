"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/actions/auth/login";
import { Input, Button, Text, Link } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "@/lib/config/routes";
import { useAuthStore } from "@/lib/stores/authStore";

const initialState = {
  message: null,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      fullWidth
      loading={pending}
      disabled={pending}
      className="mt-4 md:mt-6"
    >
      {pending ? "Entrando..." : "Acessar"}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // Atualizar Zustand e redirecionar quando login for bem-sucedido
  useEffect(() => {
    if (state.success && state.data) {
      // Atualizar Zustand com os dados do login
      login(state.data);

      // Redirecionar para home
      router.replace(ROUTES.REDIRECTS.HOME);
    }
  }, [state.success, state.data, login, router]);

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
        Área do produtor
      </Text>

      <Text
        color="secondary"
        weight="bold"
        size="12-16"
        align="center"
        className="mb-2 tracking-wider uppercase"
      >
        Atenção
      </Text>
      <Text
        color="secondary"
        align="center"
        size="12-16"
        className="mb-4 md:mb-10"
      >
        Este acesso é destinado a produtores do Clube do Ingresso.
      </Text>

      {/* Formulário */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-lightGray p-6 md:p-8">
        <Text color="primary" weight="500" size="16-20" className="mb-6">
          Identifique-se
        </Text>

        <form className="space-y-4" action={formAction} autoComplete="off">
          <Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="exemplo@site.com"
            required
            autoFocus
            autoComplete="username"
            error={state.errors?.email?.[0]}
            leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            placeholder="********"
            required
            autoComplete="current-password"
            error={state.errors?.password?.[0]}
            leftIcon={<FontAwesomeIcon icon={faLock} />}
          />

          {state.message && (
            <Text
              color="error"
              align="center"
              size="14px"
              className="mt-4"
              typeElement="div"
            >
              {state.message}
            </Text>
          )}

          <SubmitButton />
        </form>

        <div className="text-center mt-4">
          <Link
            href={ROUTES.REDIRECTS.ESQUECI_SENHA}
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
