"use client";
import { Text } from "@/components";
import { usePromoters } from "@/features/finance/hooks/usePromoters";

export function Promoters() {
  const { data, isLoading, error } = usePromoters();

  if (isLoading) {
    return (
      <Text size="14px" color="gray">
        Carregando promoters...
      </Text>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-lightGray rounded-lg p-4">
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
      <Text size="16px" color="primary" className="text-center p-4">
        Nenhum promoter encontrado.
      </Text>
    );
  }

  return (
    <div className="space-y-5 mb-6 md:mb-12">
      {data.map((p, idx) => (
        <div
          key={`${p.promoter_id}-${idx}`}
          className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4 md:p-5">
              <Text size="16-20" color="primary" className="mb-2" weight="700">
                Promoter: <span className="font-normal">{p.name}</span>
              </Text>
              <Text size="16-20" color="primary" className="mb-2" weight="700">
                URL: <span className="font-normal">{p.slug}</span>
              </Text>
              <Text size="16-20" color="primary" className="mb-2" weight="700">
                Lote: <span className="font-normal">{p.batch_name}</span>
              </Text>
            </div>
            <div className="bg-[#E8EDF6] flex items-center justify-around p-6">
              <div className="text-center">
                <Text
                  size="16-20"
                  color="primary"
                  weight="700"
                  className="mb-2"
                >
                  Qtde.
                </Text>
                <Text size="24-28-34" color="primary" weight="700">
                  {p.total_tickets}
                </Text>
              </div>
              <div className="text-center">
                <Text
                  size="16-20"
                  color="primary"
                  weight="700"
                  className="mb-2"
                >
                  Valor (R$)
                </Text>
                <Text size="24-28-34" color="primary" weight="700">
                  {Number(p.total)
                    .toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                    .replace("R$", "")}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
