"use client";
import { Button, Text } from "@/components";
import { useAuthStore } from "@/lib/stores/authStore";
import { adminEndSaleAction } from "@/features/admin/actions";

export function EndSaleAdmin() {
  const selectedEventId = useAuthStore((s) => s.selectedEvent?.id);
  const effectiveEventId = Number(selectedEventId ?? 0);

  function handleEndSale() {
    const fd = new FormData();
    fd.set("eventId", String(effectiveEventId));
    fd.set("producerId", String(0));
    adminEndSaleAction({ message: "", success: false }, fd);
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full p-4">
      <Text size="24-28-34" weight="700" color="primary" className="mb-4">
        Encerrar venda do evento
      </Text>
      <Text size="12-16" color="primary" className="mb-4">
        Esta ação encerrará as vendas do evento atual. Confirme para continuar.
      </Text>
      <Button variant="danger" onClick={handleEndSale}>
        Encerrar venda
      </Button>
    </div>
  );
}
