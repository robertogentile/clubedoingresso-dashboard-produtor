import { EventGuard } from "@/components";
import { cookies } from "next/headers";
import type { Account } from "@/features/finance/types";
import { FinancePage } from "@/features/finance/pages/FinancePage";

async function getInitialAccounts(producerId: string): Promise<Account[]> {
  const cookieStore = await cookies();
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || ""
    }/api/finance/accounts?producerId=${producerId}`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function FinanceiroPage() {
  const cookieStore = await cookies();
  const producerIdFromCookie = cookieStore.get("producerId")?.value || "";
  const initialAccounts = producerIdFromCookie
    ? await getInitialAccounts(producerIdFromCookie)
    : [];

  return (
    <EventGuard>
      <main className="flex-1 py-8 bg-gray-background">
        <FinancePage
          producerId={producerIdFromCookie}
          initialAccounts={initialAccounts}
        />
      </main>
    </EventGuard>
  );
}
