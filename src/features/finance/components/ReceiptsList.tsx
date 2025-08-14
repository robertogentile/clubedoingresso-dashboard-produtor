"use client";
import { useReceipts } from "@/features/finance/hooks/useReceipts";
import Text from "@/components/ui/Text/Text";

export function ReceiptsList({
  eventId,
}: {
  eventId?: string | number | null;
}) {
  const { data, isLoading, error } = useReceipts(eventId);

  if (isLoading) {
    return (
      <Text size="14px" color="gray">
        Carregando recibos...
      </Text>
    );
  }

  if (error) {
    return (
      <Text size="14px" color="error">
        Erro ao carregar recibos.
      </Text>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Text size="14px" color="gray">
        Nenhum recibo encontrado.
      </Text>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-lightGray bg-white">
      <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-100">
        <Text size="12px" weight="600">
          Data
        </Text>
        <Text size="12px" weight="600">
          Descrição
        </Text>
        <Text size="12px" weight="600">
          Valor
        </Text>
        <Text size="12px" weight="600">
          Comprovante
        </Text>
      </div>
      <ul className="divide-y divide-lightGray">
        {data.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-3"
          >
            <Text size="12px" className="md:col-span-1">
              {item.date}
            </Text>
            <Text size="12px" className="md:col-span-1">
              {item.description}
            </Text>
            <Text size="12px" className="md:col-span-1">
              {item.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
            <Text size="12px" className="md:col-span-1">
              {item.receipt ? "Disponível" : "-"}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
