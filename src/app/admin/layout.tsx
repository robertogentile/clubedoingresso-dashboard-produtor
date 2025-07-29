import { Sidebar, Header } from "@/components";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main Content com limite de largura e centralização */}
          <main className="flex-1 p-8 bg-gray-background">
            <div className="max-w-[1150px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
