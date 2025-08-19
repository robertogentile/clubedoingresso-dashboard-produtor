"use client";
import { usePix, useInvalidatePix } from "@/features/finance/hooks/usePix";
import { Button, Text } from "@/components";
import { useModal } from "@/components/providers/ModalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useAuthStore } from "@/lib/stores/authStore";
import { deletePixAction } from "@/features/finance/actions";

export function PixList() {
  const storeProducerId = useAuthStore((s) => s.producer?.id);
  const effectiveProducerId = Number(storeProducerId ?? 0);
  const { data, isLoading, error } = usePix(effectiveProducerId);
  const { showAlert, open, close } = useModal();
  const { invalidatePix } = useInvalidatePix();

  function confirmDelete(pixId: string, label: string) {
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
          Você deseja mesmo excluir esta chave?
        </Text>
        <Text size="12-16" color="primary" className="text-center mb-6">
          {label}
        </Text>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="primary"
            onClick={() => {
              const fd = new FormData();
              fd.set("producerId", String(effectiveProducerId));
              fd.set("pixId", String(pixId));
              deletePixAction({ message: "", success: false }, fd).then(
                (res) => {
                  close();
                  if (res.success) {
                    // Invalidar o cache para atualizar a lista
                    invalidatePix(effectiveProducerId);
                    showAlert({
                      type: "success",
                      title: "Sucesso!",
                      description: "Chave PIX excluída com sucesso!",
                    });
                  } else {
                    showAlert({
                      type: "error",
                      title: "Erro",
                      description: res.message || "Erro ao excluir chave PIX.",
                    });
                  }
                }
              );
            }}
          >
            Excluir
          </Button>
          <Button variant="outline" onClick={close}>
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
            Falha ao carregar chaves PIX.
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
          {(data ?? []).map((k) => (
            <li
              key={k.id}
              className="bg-white rounded-xl shadow border border-lightGray overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <Text size="12-16" color="primary" weight="700">
                  {k.type}
                </Text>
                <Button
                  variant="ghost"
                  onClick={() =>
                    confirmDelete(
                      String(k.id),
                      `${k.name} • ${k.type} • ${k.value}`
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
                  <span className="text-primary font-normal">{k.name}</span>
                </Text>
                <Text
                  size="12-16"
                  color="primary"
                  className="mb-2"
                  weight="700"
                >
                  Chave:{" "}
                  <span className="text-primary font-normal">{k.value}</span>
                </Text>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
