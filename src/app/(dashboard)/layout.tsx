import ClientLayout from "./ClientLayout";
import type { Producer } from "@/lib/stores/types";
import { cookies } from "next/headers";
import { Providers } from "@/components/providers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ler dados públicos do produtor do cookie httpOnly no servidor
  const cookieStore = await cookies();
  const producerB64 = cookieStore.get("producer")?.value || "";
  let initialProducer: Producer | null = null;
  if (producerB64) {
    try {
      initialProducer = JSON.parse(
        Buffer.from(producerB64, "base64").toString()
      );
    } catch {
      initialProducer = null;
    }
  }

  return (
    <Providers>
      <ClientLayout initialProducer={initialProducer}>{children}</ClientLayout>
    </Providers>
  );
}
