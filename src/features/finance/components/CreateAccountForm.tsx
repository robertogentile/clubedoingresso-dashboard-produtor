"use client";
import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createAccountAction } from "../actions";
import { Input, Button, Select } from "@/components";
import { useAuthStore } from "@/lib/stores/authStore";
import { faUser, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";

import {
  faMoneyBill1,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { banksList } from "@/lib/helpers/banks";
import { useModal } from "@/components/providers/ModalProvider";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="primary"
      size="lg"
      type="submit"
      loading={pending}
      disabled={pending}
      className="w-full md:w-auto px-8"
      leftIcon={<FontAwesomeIcon icon={faBuildingColumns} />}
    >
      {pending ? "Salvando..." : "Cadastrar conta corrente"}
    </Button>
  );
}

interface FormState {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
}

export function CreateAccountForm(/*{ producerId }: { producerId: number }*/) {
  const initialState: FormState = {
    message: "",
    errors: {},
    success: false,
  };
  const [state, formAction] = useActionState<FormState, FormData>(
    createAccountAction as unknown as (
      prevState: FormState,
      formData: FormData
    ) => Promise<FormState>,
    initialState
  );
  const storeProducerId = useAuthStore((s) => s.producer?.id);
  const effectiveProducerId = Number(storeProducerId ?? 0);
  const formRef = useRef<HTMLFormElement>(null);
  const { showAlert } = useModal();

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      showAlert({
        type: "success",
        title: "Sucesso!",
        description: "Conta corrente cadastrada com sucesso!",
      });
    } else if (state.message && !state.success) {
      showAlert({
        type: "error",
        title: "Erro",
        description: state.message,
      });
    }
  }, [state.success, state.message, showAlert]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 mb-12 max-w-[600px]"
    >
      <input type="hidden" name="producerId" value={effectiveProducerId} />

      <Input
        name="name"
        label="Razão social ou nome completo do titular"
        placeholder="Razão social ou nome"
        leftIcon={<FontAwesomeIcon icon={faUser} />}
        required
        autoComplete="name"
        autoFocus
        error={state.errors?.name?.[0]}
      />
      <Input
        name="document"
        label="CPF ou CNPJ"
        placeholder="Informe CPF ou CNPJ"
        leftIcon={<FontAwesomeIcon icon={faCircleUser} />}
        mask="cpfCnpj"
        error={state.errors?.document?.[0]}
        required
      />
      <Select
        name="bank"
        label="Banco"
        placeholder="Selecione um banco"
        options={banksList}
        defaultValue={""}
        required
      />
      <Input
        name="agency"
        label="Agência"
        placeholder="Número da agência"
        leftIcon={<FontAwesomeIcon icon={faBuildingColumns} />}
        error={state.errors?.agency?.[0]}
        required
        autoComplete="agency"
      />
      <Input
        name="account"
        label="Conta corrente"
        placeholder="Número da conta corrente"
        leftIcon={<FontAwesomeIcon icon={faMoneyBill1} />}
        error={state.errors?.account?.[0]}
        required
        autoComplete="account"
        className="mb-8"
      />

      <SubmitButton />
    </form>
  );
}
