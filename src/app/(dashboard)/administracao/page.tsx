import { EventGuard } from "@/components";
import { AdminPage } from "@/features/admin/pages/AdminPage";

export default function AdministracaoPage() {
  return (
    <EventGuard>
      <main className="flex-1 bg-gray-background">
        <AdminPage />
      </main>
    </EventGuard>
  );
}
