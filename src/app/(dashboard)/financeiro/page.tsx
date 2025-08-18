import { EventGuard } from "@/components";
import { FinancePage } from "@/features/finance/pages/FinancePage";

export default async function FinanceiroPage() {
  return (
    <EventGuard>
      <main className="flex-1 bg-gray-background">
        <FinancePage />
      </main>
    </EventGuard>
  );
}
