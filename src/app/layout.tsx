import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/components/providers";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Clube do Ingresso - Dashboard do Produtor",
  description: "Painel completo para gerenciamento de eventos do produtor.",
  icons: { icon: "/images/favicon.png" },
  metadataBase: new URL("https://dashboard.clubedoingresso.com.br"),
  openGraph: {
    title: "Clube do Ingresso - Dashboard do Produtor",
    description: "Painel completo para gerenciamento de eventos do produtor.",
    url: "https://dashboard.clubedoingresso.com.br",
    siteName: "Clube do Ingresso",
    images: [
      {
        url: "/images/placeholder-event.jpg",
        width: 1200,
        height: 630,
        alt: "Dashboard Clube do Ingresso",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clube do Ingresso - Dashboard do Produtor",
    description: "Painel completo para gerenciamento de eventos do produtor.",
    images: ["/images/placeholder-event.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f2a37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
