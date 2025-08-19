"use client";
import { useAuthStore } from "@/lib/stores/authStore";
import { Button, Text } from "@/components";
import { useModal } from "@/components/providers/ModalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  useAccounts,
  useDeleteAccount,
} from "@/features/finance/hooks/useAccounts";

export function AccountsList() {
  const storeProducerId = useAuthStore((s) => s.producer?.id);
  const effectiveProducerId = Number(storeProducerId ?? 0);
  const { data, isLoading, error } = useAccounts(effectiveProducerId);
  const deleteAccount = useDeleteAccount();
  const { showAlert, open, close } = useModal();

  function confirmDelete(accountId: string, label: string) {
    open(
      <div>
        <Text
          size="24-28-34"
          weight="700"
          color="primary"
          className="text-center mb-2"
        >
          ATENÇÃO
        </Text>
        <Text size="16-20" color="primary" className="text-center mb-4">
          Você deseja mesmo excluir esta conta?
        </Text>
        <Text size="12-16" color="primary" className="text-center mb-6">
          {label}
        </Text>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="primary"
            onClick={() =>
              deleteAccount.mutate(
                { producerId: String(effectiveProducerId), accountId },
                {
                  onSuccess: () => {
                    close();
                    showAlert({
                      type: "success",
                      title: "Sucesso!",
                      description: "Conta bancária excluída com sucesso!",
                    });
                  },
                  onError: () => {
                    close();
                    showAlert({
                      type: "error",
                      title: "Erro",
                      description: "Erro ao excluir conta. Tente novamente.",
                    });
                  },
                }
              )
            }
            loading={deleteAccount.isPending}
          >
            Excluir
          </Button>
          <Button
            variant="outline"
            onClick={close}
            disabled={deleteAccount.isPending}
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {isLoading && (
        <Text size="14px" color="gray">
          Carregando...
        </Text>
      )}
      {error && (
        <div className="bg-white border border-lightGray rounded-lg p-4 mt-3">
          <Text size="14px" color="error">
            Falha ao carregar contas bancárias.
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
      )}
      {!isLoading && !error && (
        <ul className="space-y-4 ">
          {(data ?? []).map((acc) => (
            <li
              key={acc.id}
              className="bg-white rounded-xl shadow border border-lightGray overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <Text size="12-16" color="primary" weight="700">
                  {acc.bank}
                </Text>
                <Button
                  variant="ghost"
                  onClick={() =>
                    confirmDelete(
                      String(acc.id),
                      `${acc.name} • ${acc.document} • ${acc.bank} • ${acc.agency}/${acc.account}`
                    )
                  }
                  className="rounded-full hover:bg-white outline-none"
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-primary"
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </Button>
              </div>
              <div className="px-4 py-3">
                <Text
                  size="12-16"
                  color="primary"
                  className="mb-2"
                  weight="700"
                >
                  Nome:{" "}
                  <span className="text-primary font-normal">{acc.name}</span>
                </Text>
                <Text
                  size="12-16"
                  color="primary"
                  className="mb-2"
                  weight="700"
                >
                  Documento:{" "}
                  <span className="text-primary font-normal">
                    {acc.document}
                  </span>
                </Text>
                <Text
                  size="12-16"
                  color="primary"
                  className="mb-2"
                  weight="700"
                >
                  Banco:{" "}
                  <span className="text-primary font-normal">{acc.bank}</span>
                </Text>
                <Text
                  size="12-16"
                  color="primary"
                  className="mb-2"
                  weight="700"
                >
                  Agência/Conta:{" "}
                  <span className="text-primary font-normal">
                    {acc.agency} / {acc.account}
                  </span>
                </Text>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
