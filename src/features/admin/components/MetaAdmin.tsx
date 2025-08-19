"use client";
import { useState } from "react";
import { Button, Input, Text } from "@/components";
import { adminUpdateMetaAction } from "@/features/admin/actions";
import { useAuthStore } from "@/lib/stores/authStore";

export function MetaAdmin() {
  const selectedEventId = useAuthStore((s) => s.selectedEvent?.id);
  const effectiveEventId = Number(selectedEventId ?? 0);

  const [metaPixel, setMetaPixel] = useState("");
  const [metaToken, setMetaToken] = useState("");

  function submit() {
    const fd = new FormData();
    fd.set("eventId", String(effectiveEventId));
    fd.set("producerId", String(0));
    fd.set("metaPixel", metaPixel);
    fd.set("metaToken", metaToken);
    adminUpdateMetaAction({ message: "", success: false }, fd);
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full">
      <div className="px-4 py-3 border-b border-lightGray">
        <Text size="24-28-34" weight="700" color="primary">
          Pixel Meta (Facebook e Instagram)
        </Text>
      </div>
      <div className="p-4 space-y-4">
        <Input
          label="Meta Pixel"
          value={metaPixel}
          onChange={(e) => setMetaPixel(e.target.value)}
        />
        <Input
          label="Access Token"
          value={metaToken}
          onChange={(e) => setMetaToken(e.target.value)}
        />
        <div className="pt-2">
          <Button variant="primary" onClick={submit}>
            Salvar configurações
          </Button>
        </div>
      </div>
    </div>
  );
}
