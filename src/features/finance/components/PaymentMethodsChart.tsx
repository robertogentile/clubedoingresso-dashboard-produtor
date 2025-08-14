"use client";
import { usePaymentMethodsResume } from "@/features/finance/hooks/usePaymentMethodsResume";
import Text from "@/components/ui/Text/Text";
import { VictoryPie } from "victory";
import {} from "react";

const PALETTE = [
  "#44266c", // purple
  "#ff8b8b", // light red / credit
  "#2ed352", // green
  "#477BFF", // blue
  "#ffcc01", // yellow
  "#a60000", // dark red
  "#1f2a37", // dark blue-gray
  "#fc8888", // secondary pink (last to reduce chance of adjacent duplication)
];

export function PaymentMethodsChart({
  eventId,
}: {
  eventId?: string | number | null;
}) {
  const { data, isLoading, error } = usePaymentMethodsResume(eventId);

  const sorted = [...(data ?? [])].sort(
    (a, b) => (b.total ?? 0) - (a.total ?? 0)
  );

  const pieData = sorted.map((item) => ({
    x: item.payment_method,
    y: Math.max(0, item.percentage),
  }));

  const uniqueMethods = Array.from(new Set(pieData.map((d) => d.x as string)));

  // Build map method -> color (no duplicates while palette allows)
  const colorMap: Record<string, string> = {};
  uniqueMethods.forEach((method, idx) => {
    colorMap[method] = PALETTE[idx % PALETTE.length];
  });

  const colors = pieData.map((d) => colorMap[d.x as string]);

  if (isLoading)
    return (
      <Text size="14px" color="gray">
        Carregando formas de pagamento...
      </Text>
    );
  if (error)
    return (
      <div className="bg-white border border-lightGray rounded-lg p-4">
        <Text size="14px" color="error">
          Falha ao carregar formas de pagamento.
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
  if (!data || data.length === 0)
    return (
      <Text size="14px" color="gray">
        Nenhum dado disponível.
      </Text>
    );

  return (
    <div className="bg-white rounded-[20px] p-4 md:p-6">
      <Text size="24px" weight="700" className="text-darkBlue ">
        Formas de pagamento
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-6 items-center">
        <div className="flex items-center justify-center">
          <VictoryPie
            data={pieData}
            colorScale={colors}
            width={300}
            height={300}
            padAngle={0}
            labels={() => ""}
          />
        </div>

        <div className="space-y-5">
          {sorted.map((item, idx) => {
            const color = colors[idx];
            return (
              <div
                key={`${item.payment_method}-${idx}`}
                className="flex items-center gap-4"
              >
                <span
                  className="inline-block rounded-full"
                  style={{ width: 18, height: 18, backgroundColor: color }}
                />
                <Text size="16px" className="text-darkBlue">
                  {`${item.payment_method} - Qtde.: ${
                    item.total
                  } - ${item.percentage.toFixed(0)}%`}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
