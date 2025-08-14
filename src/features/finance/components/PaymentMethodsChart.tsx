"use client";
import { usePaymentMethodsResume } from "@/features/finance/hooks/usePaymentMethodsResume";
import Text from "@/components/ui/Text/Text";

export function PaymentMethodsChart({
  eventId,
}: {
  eventId?: string | number | null;
}) {
  const { data, isLoading, error } = usePaymentMethodsResume(eventId);

  if (isLoading)
    return (
      <Text size="14px" color="gray">
        Carregando formas de pagamento...
      </Text>
    );
  if (error)
    return (
      <Text size="14px" color="error">
        Erro ao carregar as formas de pagamento.
      </Text>
    );
  if (!data || data.length === 0)
    return (
      <Text size="14px" color="gray">
        Nenhum dado disponível.
      </Text>
    );

  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div
          key={`${item.payment_method}-${idx}`}
          className="flex items-center gap-3"
        >
          <div className="w-24">
            <Text size="12px" className="truncate">
              {item.payment_method}
            </Text>
          </div>
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue"
              style={{
                width: `${Math.min(100, Math.max(0, item.percentage))}%`,
              }}
            />
          </div>
          <div className="w-16 text-right">
            <Text size="12px">{item.percentage.toFixed(0)}%</Text>
          </div>
        </div>
      ))}
    </div>
  );
}
