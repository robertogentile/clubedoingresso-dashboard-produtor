"use client";
import { useCreatePix } from "@/features/finance/hooks/usePix";
import { Input, Button, Select, Text } from "@/components";
import { pixTypes } from "@/lib/helpers/chavesPix";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { InputMaskName } from "@/lib/utils/masks";
import { inputMasks } from "@/lib/utils/masks";
import { useAuthStore } from "@/lib/stores/authStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPix } from "@fortawesome/free-brands-svg-icons";
import { useModal } from "@/components/providers/ModalProvider";

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button
      variant="primary"
      size="lg"
      type="submit"
      loading={isLoading}
      disabled={isLoading}
      className="w-full md:w-auto px-8"
      leftIcon={<FontAwesomeIcon icon={faPix} />}
    >
      {isLoading ? "Salvando..." : "Cadastrar chave PIX"}
    </Button>
  );
}

export function PixAdd() {
  const createPix = useCreatePix();
  const storeProducerId = useAuthStore((s) => s.producer?.id);
  const effectiveProducerId = Number(storeProducerId ?? 0);
  const { open, close } = useModal();
  const [form, setForm] = useState({
    name: "",
    type: "",
    key: "",
  });

  const keyMask: InputMaskName | undefined = useMemo(() => {
    switch (form.type) {
      case "CPF/CNPJ":
        return "cpfCnpj";
      case "Celular":
        return "phone";
      case "E-Mail":
        return "email";
      case "Chave Aleatória":
        return "alphanumeric";
      default:
        return undefined;
    }
  }, [form.type]);

  // Ao trocar o tipo, se houver valor digitado na chave, limpar o campo
  useEffect(() => {
    setForm((prev) => (prev.key ? { ...prev, key: "" } : prev));
  }, [form.type]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    createPix.mutate(
      {
        producerId: effectiveProducerId,
        name: form.name,
        type: form.type,
        key: form.key,
      },
      {
        onSuccess: () => {
          setForm({ name: "", type: "", key: "" });
          open(
            <div className="text-center">
              <Text size="18-20" weight="700" color="primary" className="mb-4">
                Sucesso!
              </Text>
              <Text size="14-16" color="primary" className="mb-6">
                Chave PIX cadastrada com sucesso!
              </Text>
              <Button variant="primary" onClick={close} className="px-8">
                OK
              </Button>
            </div>
          );
        },
        onError: (error) => {
          open(
            <div className="text-center">
              <Text size="18-20" weight="700" color="error" className="mb-4">
                Erro
              </Text>
              <Text size="14-16" color="primary" className="mb-6">
                Erro ao cadastrar chave PIX. Tente novamente.
              </Text>
              <Button variant="primary" onClick={close} className="px-8">
                OK
              </Button>
            </div>
          );
          console.error("Erro ao criar PIX:", error);
        },
      }
    );
  }

  return (
    <div className="p-4 ">
      <form onSubmit={onSubmit} className=" space-y-6">
        <Input
          name="name"
          label="Razão social ou nome completo do destinatário"
          placeholder="Razão social ou nome"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <Select
          name="type"
          label="Tipo de chave"
          placeholder="Escolha uma opção"
          options={pixTypes}
          value={form.type}
          onChange={(e) =>
            setForm((f) => ({ ...f, type: e.target.value, key: "" }))
          }
          required
        />
        <Input
          name="key"
          label="Chave"
          placeholder="Informe a chave"
          value={form.key}
          onChange={(e) => {
            let value = e.target.value;
            // Aplicar a máscara se existir
            if (keyMask && inputMasks[keyMask]) {
              value = inputMasks[keyMask](value);
            }
            setForm((f) => ({ ...f, key: value }));
          }}
          mask={keyMask}
          required
          className="mb-8 md:mb-12"
        />

        <SubmitButton isLoading={createPix.isPending} />
      </form>
    </div>
  );
}
