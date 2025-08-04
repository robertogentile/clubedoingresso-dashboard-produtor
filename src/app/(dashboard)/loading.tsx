import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

// ATENÇÃO: Para cada página do dashboard, crie um arquivo loading.tsx específico
// Exemplo: src/app/(dashboard)/home/loading.tsx, src/app/(dashboard)/perfil/loading.tsx
// Utilize e componha os Skeletons conforme o layout de cada tela

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="flex items-center">
              <Skeleton className="w-8 h-8 rounded" />
              <div className="ml-2 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          <div className="mt-8 px-4 space-y-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center px-4 py-2">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="ml-3 h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1">
          <div className="p-8">
            <div className="max-w-[1150px] mx-auto space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
