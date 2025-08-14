"use client";
import { useReceiptResume } from "@/features/finance/hooks/useReceiptResume";
import Text from "@/components/ui/Text/Text";

export function ReceiptResumeCards({
  eventId,
}: {
  eventId?: string | number | null;
}) {
  const { data, isLoading, error } = useReceiptResume(eventId);

  if (isLoading)
    return (
      <Text size="14px" color="gray">
        Carregando resumo...
      </Text>
    );
  if (error)
    return (
      <Text size="14px" color="error">
        Erro ao carregar resumo.
      </Text>
    );
  if (!data) return null;

  const items = [
    { label: "Total vendido", value: data.sells, color: "text-primary" },
    {
      label: "Pagos, efetuados",
      value: data.receipts,
      color: "text-secondary",
    },
    {
      label: "A receber do Clube",
      value: data.remaining,
      color: "text-danger",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {items.map((it) => (
        <div key={it.label} className="bg-white p-6 rounded-lg shadow">
          <Text size="12px" color="gray">
            {it.label}
          </Text>
          <Text size="24px" className={it.color}>
            {it.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </div>
      ))}
    </div>
  );
}
