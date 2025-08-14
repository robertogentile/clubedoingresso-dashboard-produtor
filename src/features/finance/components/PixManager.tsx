"use client";
import {
  usePix,
  useCreatePix,
  useDeletePix,
} from "@/features/finance/hooks/usePix";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Text from "@/components/ui/Text/Text";
import { FormEvent, useState } from "react";

export function PixManager({
  producerId,
}: {
  producerId?: string | number | null;
}) {
  const { data, isLoading, error } = usePix(producerId);
  const createPix = useCreatePix();
  const deletePix = useDeletePix();
  const [form, setForm] = useState({ name: "", type: "CPF/CNPJ", key: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!producerId) return;
    createPix.mutate({ producerId: Number(producerId), ...form });
    setForm({ name: "", type: "CPF/CNPJ", key: "" });
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="bg-white p-4 rounded-lg shadow">
        <Text size="16px" weight="600">
          Cadastrar chave PIX
        </Text>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <Input
            name="name"
            label="Descrição"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            name="type"
            label="Tipo"
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          />
          <Input
            name="key"
            label="Chave"
            value={form.key}
            onChange={(e) => setForm((f) => ({ ...f, key: e.target.value }))}
          />
          <Button type="submit" loading={createPix.isPending}>
            Salvar
          </Button>
        </form>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Text size="16px" weight="600">
          Chaves cadastradas
        </Text>
        {isLoading && (
          <Text size="14px" color="gray">
            Carregando...
          </Text>
        )}
        {error && (
          <div className="bg-white border border-lightGray rounded-lg p-4 mt-3">
            <Text size="14px" color="error">
              Falha ao carregar chaves PIX.
            </Text>
            <div className="mt-3">
              <button
                className="text-blue underline"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}
        {!isLoading && !error && (
          <ul className="divide-y divide-lightGray mt-3">
            {(data ?? []).map((k) => (
              <li key={k.id} className="flex items-center justify-between py-2">
                <div>
                  <Text size="12px" className="text-darkGray">
                    {k.name} • {k.type}
                  </Text>
                  <Text size="12px">{k.value}</Text>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    deletePix.mutate({
                      producerId: String(producerId || ""),
                      pixId: String(k.id),
                    })
                  }
                  loading={deletePix.isPending}
                >
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
