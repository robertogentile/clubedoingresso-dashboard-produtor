"use client";
import { useState } from "react";
import { ButtonBack, Text } from "@/components";
import { AdminActions, type AdminScreenId } from "../components/AdminActions";
import { PromotersAdmin } from "../components/PromotersAdmin";
import { CouponsAdmin } from "../components/CouponsAdmin";
import { BatchesAdmin } from "../components/BatchesAdmin";
import { CourtesiesAdmin } from "../components/CourtesiesAdmin";
import { EndSaleAdmin } from "../components/EndSaleAdmin";
import { MetaAdmin } from "../components/MetaAdmin";
import { AnalyticsAdmin } from "../components/AnalyticsAdmin";

export function AdminPage() {
  const [screen, setScreen] = useState<AdminScreenId>("home");

  return (
    <div className="mb-8 space-y-6">
      {/* Desktop: sempre mostra as ações no topo e conteúdo abaixo; Mobile: usar back quando não for home */}
      <div className="space-y-6">
        <AdminActions onNavigate={(s) => setScreen(s)} />
      </div>

      <div className="block md:hidden">
        {screen !== "home" && (
          <ButtonBack label="Voltar" onClick={() => setScreen("home")} />
        )}
      </div>

      {/* Conteúdo */}
      {screen === "home" && (
        <Text size="16-20" color="primary" className="text-center md:text-left">
          Selecione uma opção acima para gerenciar seu evento.
        </Text>
      )}
      {screen === "promoters" && <PromotersAdmin />}
      {screen === "batches" && <BatchesAdmin />}
      {screen === "coupons" && <CouponsAdmin />}
      {screen === "courtesies" && <CourtesiesAdmin />}
      {screen === "meta" && <MetaAdmin />}
      {screen === "end-sale" && <EndSaleAdmin />}
      {screen === "analytics" && <AnalyticsAdmin />}
    </div>
  );
}
