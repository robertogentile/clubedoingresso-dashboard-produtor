"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/features/auth/actions";
import { Input, Button, Text, Link } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "@/lib/config/routes";

const initialState = {
  message: null as string | null,
  errors: {} as Record<string, string[]>,
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

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
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
  );
}
