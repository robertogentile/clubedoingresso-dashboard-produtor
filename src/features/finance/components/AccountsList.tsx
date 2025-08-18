"use client";
import { useQuery } from "@tanstack/react-query";
import type { Account } from "../types";
import { useAuthStore } from "@/lib/stores/authStore";

async function fetchAccounts(producerId: string): Promise<Account[]> {
  const res = await fetch(`/api/finance/accounts?producerId=${producerId}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export function AccountsList() {
  const storeProducerId = useAuthStore((s) => s.producer?.id);
  const effectiveProducerId = String(storeProducerId ?? "");
  const { data } = useQuery({
    queryKey: ["accounts", effectiveProducerId],
    queryFn: () => fetchAccounts(effectiveProducerId),
  });

  if (!data || data.length === 0) {
    return <p className="text-sm text-muted">Nenhuma conta cadastrada.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 overflow-hidden">
      {data.map((acc) => (
        <li key={acc.id} className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          <div>
            <p className="text-sm text-gray-500">Titular</p>
            <p className="font-medium text-gray-900">{acc.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Documento</p>
            <p className="font-medium text-gray-900">{acc.document}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Banco</p>
            <p className="font-medium text-gray-900">{acc.bank}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Agência/Conta</p>
            <p className="font-medium text-gray-900">
              {acc.agency} / {acc.account}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
