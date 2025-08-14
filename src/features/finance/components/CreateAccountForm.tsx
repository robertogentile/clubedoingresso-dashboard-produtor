"use client";
import { useFormState, useFormStatus } from "react-dom";
import { createAccountAction } from "../actions";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/lib/stores/authStore";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} disabled={pending}>
      {pending ? "Salvando..." : "Salvar conta"}
    </Button>
  );
}

interface FormState {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
}

export function CreateAccountForm({ producerId }: { producerId: number }) {
  const initialState: FormState = { message: "", success: false };
  const [state, formAction] = useFormState(createAccountAction, initialState);
  const storeProducerId = useAuthStore((s) => s.producer?.id);
  const effectiveProducerId = Number(storeProducerId ?? producerId ?? 0);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="producerId" value={effectiveProducerId} />

      <Input
        name="name"
        label="Titular"
        placeholder="Nome do titular"
        error={state.errors?.name?.[0]}
      />
      <Input
        name="document"
        label="Documento (CPF/CNPJ)"
        placeholder="00000000000"
        error={state.errors?.document?.[0]}
      />
      <Input
        name="bank"
        label="Banco"
        placeholder="Itaú"
        error={state.errors?.bank?.[0]}
      />
      <Input
        name="agency"
        label="Agência"
        placeholder="0001"
        error={state.errors?.agency?.[0]}
      />
      <Input
        name="account"
        label="Conta"
        placeholder="123456"
        error={state.errors?.account?.[0]}
      />

      {state.message && (
        <p
          className={`text-sm ${state.success ? "text-success" : "text-error"}`}
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
