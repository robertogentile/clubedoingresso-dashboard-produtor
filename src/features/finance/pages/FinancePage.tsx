"use client";
import { ReceiptResumeCards } from "@/features/finance/components/ReceiptResumeCards";
import { PaymentMethodsChart } from "@/features/finance/components/PaymentMethodsChart";
import { ReceiptsList } from "@/features/finance/components/ReceiptsList";
import { ScreenNavigator } from "@/features/finance/components/ScreenNavigator";
import {
  FinanceActions,
  FinanceScreenId,
} from "@/features/finance/components/FinanceActions";
import { PixManager } from "@/features/finance/components/PixManager";
import { CreateAccountForm } from "@/features/finance/components/CreateAccountForm";
import { AccountsList } from "@/features/finance/components/AccountsList";
import type { Account } from "@/features/finance/types";
import Text from "@/components/ui/Text/Text";
import ButtonBack from "@/components/ui/ButtonBack/ButtonBack";

interface FinancePageProps {
  producerId: string;
  initialAccounts: Account[];
}

export function FinancePage({ producerId, initialAccounts }: FinancePageProps) {
  return (
    <div className="mb-8">
      <ScreenNavigator
        initial="home"
        render={(screen, navigate, goBack) => {
          const eventId = undefined; // resolvido pelos hooks via Zustand
          if (screen === "home") {
            return (
              <div className="space-y-8">
                <div>
                  <Text
                    size="24-28-34"
                    weight="700"
                    color="primary"
                    className="mb-6"
                  >
                    Financeiro
                  </Text>
                </div>
                <ReceiptResumeCards eventId={eventId} />
                <FinanceActions
                  onNavigate={(s: FinanceScreenId) =>
                    navigate(
                      s as unknown as
                        | "home"
                        | "details"
                        | "pix-create"
                        | "pix-list"
                        | "account-create"
                        | "account-list"
                        | "coupons"
                        | "promoters"
                    )
                  }
                />
                <div className="bg-white rounded-[20px] shadow">
                  <PaymentMethodsChart eventId={eventId} />
                </div>
              </div>
            );
          }
          if (screen === "details") {
            return (
              <div>
                <ButtonBack
                  label="Ver Detalhes"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <Text
                  size="16-20"
                  weight="700"
                  color="primary"
                  className="mb-4"
                >
                  Movimentações
                </Text>
                <ReceiptsList eventId={eventId} />
              </div>
            );
          }
          if (screen === "pix-create" || screen === "pix-list") {
            return (
              <div className="space-y-6">
                <ButtonBack label="Voltar" onClick={goBack} />
                <PixManager producerId={producerId} />
              </div>
            );
          }
          if (screen === "account-create") {
            return (
              <div>
                <ButtonBack
                  label="Cadastrar Conta corrente"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <CreateAccountForm producerId={Number(producerId || 0)} />

                <FinanceActions
                  onNavigate={(s: FinanceScreenId) =>
                    navigate(
                      s as unknown as
                        | "home"
                        | "details"
                        | "pix-create"
                        | "pix-list"
                        | "account-create"
                        | "account-list"
                        | "coupons"
                        | "promoters"
                    )
                  }
                />
              </div>
            );
          }
          if (screen === "account-list") {
            return (
              <div className="space-y-6">
                <ButtonBack label="Voltar" onClick={goBack} />
                <div className="grid grid-cols-1">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Contas cadastradas
                    </h3>
                    <AccountsList
                      initialAccounts={initialAccounts}
                      producerId={producerId}
                    />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div>
              <ButtonBack label="Voltar" onClick={goBack} />
              <p className="mt-4">Conteúdo em desenvolvimento.</p>
            </div>
          );
        }}
      />
    </div>
  );
}
