"use client";
import { ActionButton, Text } from "@/components";
import {
  faUsers,
  faSliders,
  faTicket,
  faGift,
  faChartBar,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export type AdminScreenId =
  | "home"
  | "promoters"
  | "batches"
  | "coupons"
  | "courtesies"
  | "meta"
  | "analytics"
  | "end-sale";

export function AdminActions({
  onNavigate,
}: {
  onNavigate: (screen: AdminScreenId) => void;
}) {
  return (
    <div className="space-y-6">
      <Text size="24-28-34" weight="700" color="primary" className="mb-2">
        Administração
      </Text>
      <div className="grid justify-evenly md:justify-start grid-cols-[repeat(2,max-content)] md:grid-cols-[repeat(6,max-content)] gap-4 w-full">
        <ActionButton
          label="Cadastrar link de promoter"
          icon={faUsers}
          onClick={() => onNavigate("promoters")}
        />
        <ActionButton
          label="Habilitar / Desabilitar lotes"
          icon={faSliders}
          onClick={() => onNavigate("batches")}
        />
        <ActionButton
          label="Cadastrar cupom de desconto"
          icon={faTicket}
          onClick={() => onNavigate("coupons")}
        />
        <ActionButton
          label="Cortesias"
          icon={faGift}
          onClick={() => onNavigate("courtesies")}
        />
        <ActionButton
          label="Pixel Meta Facebook e Instagram"
          icon={faChartBar}
          onClick={() => onNavigate("meta")}
        />
        <ActionButton
          label="Encerrar venda do evento"
          icon={faLock}
          onClick={() => onNavigate("end-sale")}
        />
      </div>
    </div>
  );
}
