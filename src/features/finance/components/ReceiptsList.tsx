"use client";
import { useReceipts } from "@/features/finance/hooks/useReceipts";
import { Button, Text } from "@/components";

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
      <div className="bg-white border border-lightGray rounded-lg p-4">
        <Text size="14px" color="error">
          Falha ao carregar recibos.
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
        Nenhum recibo encontrado.
      </Text>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const hasReceipt = Boolean(item.receipt && String(item.receipt).trim());
        return (
          <div
            key={item.id}
            className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full"
          >
            <div className="p-4 md:p-5">
              <div className="flex items-start justify-between gap-4">
                <Text size="24-28-34" weight="700" color="primary">
                  {item.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
                <Text size="12-16" color="primary">
                  {item.date}
                </Text>
              </div>
              <Text size="16-20" className="mt-2 text-primary">
                {item.description}
              </Text>
              {hasReceipt && (
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() =>
                      window.open(
                        String(item.receipt),
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    Ver comprovante
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
