"use client";
import { Text } from "@/components";
import { useCoupons } from "@/features/finance/hooks/useCoupons";

export function Coupons() {
  const { data, isLoading, error } = useCoupons();

  if (isLoading) {
    return (
      <Text size="14px" color="gray">
        Carregando cupons...
      </Text>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-lightGray rounded-lg p-4">
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
      <Text size="16px" color="primary" className="text-center p-4">
        Nenhum cupom encontrado.
      </Text>
    );
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-lightGray">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                Código
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                Cupons
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                Pedidos
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                Desconto
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-lightGray">
            {data.map((c) => (
              <tr key={`${c.coupon_id}-${c.code}`}>
                <td className="px-6 py-3 text-sm text-primary">{c.code}</td>
                <td className="px-6 py-3 text-sm text-primary">{c.qtd}</td>
                <td className="px-6 py-3 text-sm text-primary">{c.quantity}</td>
                <td className="px-6 py-3 text-sm text-primary whitespace-nowrap">
                  {Number(c.total_value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
