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
      <div className="bg-primary text-white px-6 py-4">
        <Text size="16-20" weight="700" color="white">
          Promoters
        </Text>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-[1fr,1fr,80px] items-center gap-4 px-2 py-3 bg-gray-50 font-semibold text-sm">
          <div>Nome</div>
          <div>Slug</div>
          <div className="text-center">Status</div>
        </div>
        <div className="divide-y divide-lightGray">
          {(data ?? []).map((p) => (
            <div
              key={`${p.id}-${p.slug}`}
              className="grid grid-cols-[1fr,1fr,80px] items-center gap-4 px-2 py-3"
            >
              <div>
                <Text size="12-16" color="primary">
                  {p.name}
                </Text>
              </div>
              <div>
                <Text size="12-16" color="primary">
                  {p.slug}
                </Text>
              </div>
              <div className="flex justify-center">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
