"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Header } from "@/components";
import { useAuthStore } from "@/lib/stores/authStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, producer } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const hasToken =
      typeof window !== "undefined" && localStorage.getItem("auth-token");

    if (!isAuthenticated && !hasToken) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("refresh-token");
        document.cookie =
          "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      router.push("/login");
    }
  }, [isAuthenticated, producer, router]);

  if (!isAuthenticated || !producer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-8 bg-gray-background">
            <div className="max-w-[1150px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
