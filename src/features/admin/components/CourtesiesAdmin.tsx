"use client";
import { useState } from "react";
import { Button, Input, Select, Text } from "@/components";
import {
  useAdminCourtesyBatches,
  useInvalidateAdminCourtesy,
} from "@/features/admin/hooks/useAdminCourtesy";
import { useAuthStore } from "@/lib/stores/authStore";
import { adminCreateCourtesyAction } from "@/features/admin/actions";

export function CourtesiesAdmin() {
  const selectedEventId = useAuthStore((s) => s.selectedEvent?.id);
  const effectiveEventId = Number(selectedEventId ?? 0);

  const { data, isLoading, error } = useAdminCourtesyBatches(effectiveEventId);

  const [email, setEmail] = useState("");
  const [batchId, setBatchId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const { invalidateCourtesy } = useInvalidateAdminCourtesy();

  function submit() {
    if (!batchId || !email) return;
    const fd = new FormData();
    fd.set("eventId", String(effectiveEventId));
    fd.set("producerId", String(0));
    fd.set("email", email);
    fd.set(
      "cart",
      JSON.stringify([
        { batchId: Number(batchId), quantity: Number(quantity || 1) },
      ])
    );
    adminCreateCourtesyAction({ message: "", success: false }, fd).then(() => {
      // Invalidar o cache para atualizar a lista
      invalidateCourtesy(effectiveEventId);
      // Limpar o formulário
      setEmail("");
      setBatchId("");
      setQuantity("1");
    });
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full p-4">
        <Text size="14px" color="gray">
          Carregando...
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full p-4">
        <Text size="14px" color="error">
          Falha ao carregar lotes.
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
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full p-4">
        <Text size="14px" color="gray">
          Nenhum lote disponível para cortesia.
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full">
      <div className="bg-primary text-white px-6 py-4">
        <Text size="16-20" weight="700" color="white">
          Cortesias
        </Text>
      </div>
      <div className="p-4 space-y-4">
        <Input
          name="email"
          label="E-mail do beneficiário"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Select
          name="batchId"
          label="Lote"
          placeholder="Selecione um lote"
          options={data.map((b) => ({
            value: String(b.id),
            label: b.name,
          }))}
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          required
        />
        <Input
          name="quantity"
          label="Quantidade"
          placeholder="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          min="1"
          required
        />
        <div className="pt-2">
          <Button variant="primary" onClick={submit}>
            Gerar Cortesia
          </Button>
        </div>
      </div>
    </div>
  );
}
