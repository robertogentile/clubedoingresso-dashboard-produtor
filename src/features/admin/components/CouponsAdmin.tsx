"use client";
import {
  useAdminCoupons,
  useInvalidateAdminCoupons,
} from "@/features/admin/hooks/useAdminCoupons";
import { useAuthStore } from "@/lib/stores/authStore";
import { adminChangeCouponAction } from "@/features/admin/actions";
import { Switch, Text } from "@/components";

export function CouponsAdmin() {
  const { data, isLoading, error } = useAdminCoupons();
  const selectedEventId = useAuthStore((s) => s.selectedEvent?.id);
  const effectiveEventId = Number(selectedEventId ?? 0);
  const { invalidateCoupons } = useInvalidateAdminCoupons();

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
          Falha ao carregar cupons.
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
          Nenhum cupom encontrado.
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full">
      <div className="bg-primary text-white px-6 py-4">
        <Text size="16-20" weight="700" color="white">
          Cupons de Desconto
        </Text>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-lightGray">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-lightGray">
            {(data ?? []).map((c) => {
              const isActive = String(c.status).toLowerCase() === "ativo";
              return (
                <tr key={c.id}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-primary">
                    {c.description}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-primary font-mono">
                    {c.code}
                  </td>
                  <td className="px-6 py-3 text-sm text-primary text-center">
                    <Switch
                      checked={isActive}
                      onChange={(checked) => {
                        const fd = new FormData();
                        fd.set("couponId", String(c.id));
                        fd.set("eventId", String(effectiveEventId));
                        fd.set("status", checked ? "ativo" : "inativo");
                        adminChangeCouponAction(
                          { message: "", success: false },
                          fd
                        ).then(() => {
                          // Invalidar o cache para atualizar a lista
                          invalidateCoupons(effectiveEventId);
                        });
                      }}
                      aria-label={`Alterar status do cupom ${c.code}`}
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
