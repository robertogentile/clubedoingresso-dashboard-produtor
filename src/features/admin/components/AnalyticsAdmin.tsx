"use client";
import { useState } from "react";
import { Button, Input, Text } from "@/components";
import { adminUpdateGoogleAnalyticsAction } from "@/features/admin/actions";
import { useAuthStore } from "@/lib/stores/authStore";

export function AnalyticsAdmin() {
  const selectedEventId = useAuthStore((s) => s.selectedEvent?.id);
  const effectiveEventId = Number(selectedEventId ?? 0);

  const [gaId, setGaId] = useState("");
  const [gaSecret, setGaSecret] = useState("");
  const [measurementId, setMeasurementId] = useState("");
  const [gtmId, setGtmId] = useState("");

  function submit() {
    const fd = new FormData();
    fd.set("eventId", String(effectiveEventId));
    fd.set("producerId", String(0));
    fd.set("gaId", gaId);
    fd.set("gaSecret", gaSecret);
    fd.set("measurementId", measurementId);
    fd.set("gtmId", gtmId);
    adminUpdateGoogleAnalyticsAction({ message: "", success: false }, fd);
  }

  return (
    <div className="bg-white rounded-[16px] border border-lightGray shadow-sm overflow-hidden w-full">
      <div className="px-4 py-3 border-b border-lightGray">
        <Text size="24-28-34" weight="700" color="primary">
          Google Analytics e ADs
        </Text>
      </div>
      <div className="p-4 space-y-4">
        <Input
          label="GA ID"
          value={gaId}
          onChange={(e) => setGaId(e.target.value)}
        />
        <Input
          label="GA Secret"
          value={gaSecret}
          onChange={(e) => setGaSecret(e.target.value)}
        />
        <Input
          label="Measurement ID"
          value={measurementId}
          onChange={(e) => setMeasurementId(e.target.value)}
        />
        <Input
          label="GTM ID"
          value={gtmId}
          onChange={(e) => setGtmId(e.target.value)}
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
