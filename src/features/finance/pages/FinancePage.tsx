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

interface FinancePageProps {
  producerId: string;
  initialAccounts: Account[];
}

export function FinancePage({ producerId, initialAccounts }: FinancePageProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Financeiro</h2>

      <ScreenNavigator
        initial="home"
        render={(screen, navigate, goBack) => {
          const eventId = undefined; // resolvido pelos hooks via Zustand

          if (screen === "home") {
            return (
              <div className="space-y-8">
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

          if (screen === "pix-create" || screen === "pix-list") {
            return (
              <div className="space-y-6">
                <button className="text-primary" onClick={goBack}>
                  {"< Voltar"}
                </button>
                <PixManager producerId={producerId} />
              </div>
            );
          }

          if (screen === "account-create" || screen === "account-list") {
            return (
              <div className="space-y-6">
                <button className="text-primary" onClick={goBack}>
                  {"< Voltar"}
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Adicionar Nova Conta
                    </h3>
                    <CreateAccountForm producerId={Number(producerId || 0)} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Contas Cadastradas
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
          if (screen === "details") {
            return (
              <div>
                <button className="text-primary" onClick={goBack}>
                  {"< Voltar"}
                </button>
                <div className="bg-white p-6 rounded-lg shadow">
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
              </div>
            );
          }

          return (
            <div>
              <button className="text-primary" onClick={goBack}>
                {"< Voltar"}
              </button>
              <p className="mt-4">Conteúdo em desenvolvimento.</p>
            </div>
          );
        }}
      />
    </div>
  );
}
