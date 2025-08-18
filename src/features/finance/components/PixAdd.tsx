"use client";
import { useCreatePix } from "@/features/finance/hooks/usePix";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import { pixTypes } from "@/lib/helpers/chavesPix";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { InputMaskName } from "@/lib/utils/masks";
import { inputMasks } from "@/lib/utils/masks";
import { useAuthStore } from "@/lib/stores/authStore";

export function PixAdd() {
  const createPix = useCreatePix();
  const storeProducerId = useAuthStore((s) => s.producer?.id);
  const effectiveProducerId = Number(storeProducerId ?? 0);
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
    createPix.mutate({
      producerId: effectiveProducerId,
      name: form.name,
      type: form.type,
      key: form.key,
    });
    setForm({ name: "", type: "", key: "" });
  }

  return (
    <div className="p-4 ">
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
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
        />
        <Button type="submit" loading={createPix.isPending}>
          Cadastrar chave PIX
        </Button>
      </form>
    </div>
  );
}
