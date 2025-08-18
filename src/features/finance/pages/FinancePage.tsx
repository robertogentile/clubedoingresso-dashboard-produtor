"use client";
import { ReceiptResumeCards } from "@/features/finance/components/ReceiptResumeCards";
import { PaymentMethodsChart } from "@/features/finance/components/PaymentMethodsChart";
import { ReceiptsList } from "@/features/finance/components/ReceiptsList";
import { ScreenNavigator } from "@/features/finance/components/ScreenNavigator";
import {
  FinanceActions,
  FinanceScreenId,
} from "@/features/finance/components/FinanceActions";
import { PixAdd } from "@/features/finance/components/PixAdd";
import { PixList } from "@/features/finance/components/PixList";
import { CreateAccountForm } from "@/features/finance/components/CreateAccountForm";
import { AccountsList } from "@/features/finance/components/AccountsList";
import { Text, ButtonBack } from "@/components";

export function FinancePage() {
  return (
    <div className="mb-8">
      <ScreenNavigator
        initial="home"
        render={(screen, navigate, goBack) => {
          const eventId = undefined;
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
          if (screen === "pix-create") {
            return (
              <div className="space-y-6">
                <ButtonBack
                  label="Cadastrar chave PIX"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <PixAdd />
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
          if (screen === "pix-list") {
            return (
              <div className="space-y-6">
                <ButtonBack
                  label="Chaves PIX"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <PixList />
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
          if (screen === "account-create") {
            return (
              <div>
                <ButtonBack
                  label="Cadastrar Conta corrente"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <CreateAccountForm />

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
                <ButtonBack
                  label="Voltar"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <div className="grid grid-cols-1">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Contas cadastradas
                    </h3>
                    <AccountsList />
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
