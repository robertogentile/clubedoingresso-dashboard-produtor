"use client";
import { useReceiptResume } from "@/features/finance/hooks/useReceiptResume";
import { Text } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTicket } from "@fortawesome/free-solid-svg-icons";

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
      <div className="bg-white border border-lightGray rounded-lg p-4">
        <Text size="14px" color="error">
          Falha ao carregar resumo.
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
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-6 rounded-[20px] shadow-xl text-white bg-gradient-to-br from-[#3a3d40] via-[#2b2d30] to-[#0f0f10]">
        <Text size="16px" className="text-gray-400">
          Total vendido
        </Text>
        <Text size="24px" className="text-white" weight="700">
          {data.sells.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </div>

      <div className="bg-white p-6 rounded-[20px] shadow">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md bg-gradient-to-br from-[#3a3d40] via-[#2b2d30] to-[#0f0f10]">
            <FontAwesomeIcon
              icon={faDollarSign}
              style={{ width: "24px", height: "24px" }}
            />
          </div>
          <div>
            <Text size="16px" color="secondary">
              Pgtos. efetuados
            </Text>
            <Text size="24px" color="gray800" weight="700">
              {data.receipts.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[20px] shadow">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md bg-gradient-to-br from-[#3a3d40] via-[#2b2d30] to-[#0f0f10]">
            <FontAwesomeIcon
              icon={faTicket}
              style={{ width: "24px", height: "24px" }}
            />
          </div>
          <div>
            <Text size="16px" color="secondary">
              A receber do Clube
            </Text>
            <Text size="24px" className="text-red-d9" weight="700">
              {data.remaining.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
