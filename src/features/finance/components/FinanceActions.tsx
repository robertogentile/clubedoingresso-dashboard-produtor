"use client";
import Button from "@/components/ui/Button/Button";
import Text from "@/components/ui/Text/Text";
import { useModal } from "@/components/ui/Modal/ModalProvider";
import ActionButton from "@/components/ui/ActionButton/ActionButton";
import {
  faEye,
  faSackDollar,
  faQrcode,
  faBuildingColumns,
  faTicket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export type FinanceScreenId =
  | "home"
  | "details"
  | "pix-create"
  | "pix-list"
  | "account-create"
  | "account-list"
  | "coupons"
  | "promoters";

export function FinanceActions({
  onNavigate,
}: {
  onNavigate: (screen: FinanceScreenId) => void;
}) {
  const { open, close } = useModal();

  const openSendTokenModal = () => {
    open(
      <div>
        <Text size="20px" weight="700" align="center">
          ENVIAR TOKEN
        </Text>
        <Text size="14px" align="center" className="mt-2 text-gray">
          Para prosseguir vamos te enviar um token de confirmação via e-mail ou
          SMS.
        </Text>
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="white" onClick={close}>
            E-mail
          </Button>
          <Button variant="primary" onClick={close}>
            SMS
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid justify-evenly md:justify-between grid-cols-[repeat(2,max-content)] md:grid-cols-[repeat(4,max-content)] xl:grid-cols-[repeat(8,max-content)] gap-y-4 w-full">
      <ActionButton
        label="Ver detalhes"
        icon={faEye}
        onClick={() => onNavigate("details")}
      />
      <ActionButton
        label="Solicitar pagamento"
        icon={faSackDollar}
        onClick={openSendTokenModal}
      />
      <ActionButton
        label="Cadastrar PIX"
        icon={faQrcode}
        onClick={() => onNavigate("pix-create")}
      />
      <ActionButton
        label="Cadastrar conta"
        icon={faBuildingColumns}
        onClick={() => onNavigate("account-create")}
      />
      <ActionButton
        label="Cupons de desconto"
        icon={faTicket}
        onClick={() => onNavigate("coupons")}
      />
      <ActionButton
        label="Consultar/ excluir PIX"
        icon={faQrcode}
        onClick={() => onNavigate("pix-list")}
      />
      <ActionButton
        label="Consultar/ excluir conta"
        icon={faBuildingColumns}
        onClick={() => onNavigate("account-list")}
      />
      <ActionButton
        label="Promoters"
        icon={faUsers}
        onClick={() => onNavigate("promoters")}
      />
    </div>
  );
}
