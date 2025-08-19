import { EventGuard } from "@/components";
import { AdminPage } from "@/features/admin/pages/AdminPage";

export default function AdministracaoPage() {
  return (
    <EventGuard>
      <main className="flex-1 py-8 bg-gray-background">
        <div className="max-w-[1150px] px-4 md:px-8 mx-auto">
          <AdminPage />
        </div>
      </main>
    </EventGuard>
  );
}
