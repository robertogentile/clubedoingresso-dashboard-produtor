"use client";
import { useState } from "react";
import { Button, Input, Switch, Text } from "@/components";
import {
  useAdminBatches,
  useInvalidateAdminBatches,
} from "@/features/admin/hooks/useAdminBatches";
import { useAuthStore } from "@/lib/stores/authStore";
import {
  adminChangeBatchAction,
  adminChangeBatchQuantityAction,
} from "@/features/admin/actions";

export function BatchesAdmin() {
  const selectedEventId = useAuthStore((s) => s.selectedEvent?.id);
  const effectiveEventId = Number(selectedEventId ?? 0);

  const { data, isLoading, error } = useAdminBatches(effectiveEventId);
  const [pendingQty, setPendingQty] = useState<Record<number, string>>({});
  const { invalidateBatches } = useInvalidateAdminBatches();

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
          Nenhum lote encontrado.
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full">
      <div className="bg-primary text-white px-6 py-4">
        <Text size="16-20" weight="700" color="white">
          Habilitar/Desabilitar Lotes
        </Text>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-lightGray">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome do Lote
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-lightGray">
            {(data ?? []).map((b) => {
              const isActive = String(b.status).toLowerCase() === "ativo";
              const qty = pendingQty[b.id] ?? String(b.quantity ?? "");
              return (
                <tr key={b.id}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-primary">
                    {b.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-primary">
                    <div className="flex items-center gap-2 justify-center">
                      <Input
                        inputSize="sm"
                        value={qty}
                        onChange={(e) =>
                          setPendingQty((p) => ({
                            ...p,
                            [b.id]: e.target.value,
                          }))
                        }
                        style={{ width: 100 }}
                        aria-label={`Quantidade do lote ${b.name}`}
                      />
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          const fd = new FormData();
                          fd.set("batchId", String(b.id));
                          fd.set("producerId", String(0));
                          fd.set("eventId", String(effectiveEventId));
                          fd.set("quantity", String(Number(qty || 0)));
                          adminChangeBatchQuantityAction(
                            { message: "", success: false },
                            fd
                          ).then(() => {
                            // Invalidar o cache para atualizar a lista
                            invalidateBatches(effectiveEventId);
                            // Limpar o campo pendente
                            setPendingQty((p) => {
                              const newP = { ...p };
                              delete newP[b.id];
                              return newP;
                            });
                          });
                        }}
                      >
                        Salvar
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-primary text-center">
                    <Switch
                      checked={isActive}
                      onChange={(checked) => {
                        const fd = new FormData();
                        fd.set("batchId", String(b.id));
                        fd.set("producerId", String(0));
                        fd.set("eventId", String(effectiveEventId));
                        fd.set("status", checked ? "ativo" : "inativo");
                        adminChangeBatchAction(
                          { message: "", success: false },
                          fd
                        ).then(() => {
                          // Invalidar o cache para atualizar a lista
                          invalidateBatches(effectiveEventId);
                        });
                      }}
                      aria-label={`Alterar status do lote ${b.name}`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
