import type { Metadata } from "next";
import "./globals.css";

import { QueryProvider, ToastProvider } from "@/components/providers";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Clube do Ingresso - Dashboard",
  description: "Painel do produtor de eventos",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <QueryProvider>
          <ToastProvider />
          <ErrorBoundary>{children}</ErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
