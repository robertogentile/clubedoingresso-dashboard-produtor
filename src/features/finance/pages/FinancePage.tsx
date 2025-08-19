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
import { Coupons } from "@/features/finance/components/Coupons";
import { Promoters } from "@/features/finance/components/Promoters";
import { Text, ButtonBack } from "@/components";

export function FinancePage() {
  return (
    <div className="mb-8">
      <ScreenNavigator
        initial="home"
        render={(screen, navigate, goBack) => {
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
                <ReceiptResumeCards />
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
                <div className="bg-white rounded-[20px] shadow mb-6">
                  <PaymentMethodsChart />
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
                <ReceiptsList />
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
                  label="Contas bancárias"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <AccountsList />
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
          if (screen === "coupons") {
            return (
              <div>
                <ButtonBack
                  label="Cupons"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <div className="mt-6">
                  <Coupons />
                </div>
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
          if (screen === "promoters") {
            return (
              <div>
                <ButtonBack
                  label="Promoters"
                  sizeLabel="16-20-24"
                  onClick={goBack}
                />
                <div className="mt-6">
                  <Promoters />
                </div>
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
