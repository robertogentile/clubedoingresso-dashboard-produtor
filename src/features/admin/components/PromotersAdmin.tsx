"use client";
import {
  useAdminPromoters,
  useInvalidateAdminPromoters,
} from "@/features/admin/hooks/useAdminPromoters";
import { useAuthStore } from "@/lib/stores/authStore";
import { adminChangePromoterAction } from "@/features/admin/actions";
import { Switch, Text } from "@/components";

export function PromotersAdmin() {
  const { data, isLoading, error } = useAdminPromoters();
  const selectedEventId = useAuthStore((s) => s.selectedEvent?.id);
  const effectiveEventId = Number(selectedEventId ?? 0);
  const { invalidatePromoters } = useInvalidateAdminPromoters();

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
          Falha ao carregar promoters.
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
          Nenhum promoter encontrado.
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full">
      <div className="px-4 py-3 border-b border-lightGray">
        <Text size="24-28-34" weight="700" color="primary">
          Cadastrar link de promoter
        </Text>
      </div>
      <div className="p-4">
        <div className="divide-y divide-lightGray">
          {(data ?? []).map((p) => (
            <div
              key={`${p.id}-${p.slug}`}
              className="grid grid-cols-3 gap-4 px-2 py-3"
            >
              <Text size="12-16" color="primary">
                {p.name}
              </Text>
              <Text size="12-16" color="primary">
                {p.slug}
              </Text>

              <Switch
                checked={String(p.status).toLowerCase() === "ativo"}
                onChange={(checked) => {
                  const fd = new FormData();
                  fd.set("promoterId", String(p.id));
                  fd.set("eventId", String(effectiveEventId));
                  fd.set("status", checked ? "ativo" : "inativo");
                  adminChangePromoterAction(
                    { message: "", success: false },
                    fd
                  ).then(() => {
                    // Invalidar o cache para atualizar a lista
                    invalidatePromoters(effectiveEventId);
                  });
                }}
                aria-label={`Alterar status de ${p.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
