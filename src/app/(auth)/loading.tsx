import { Skeleton } from "@/components/ui/Skeleton";

// ATENÇÃO: Para cada página de auth, crie um arquivo loading.tsx específico
// Exemplo: src/app/(auth)/login/loading.tsx, src/app/(auth)/esqueci-senha/loading.tsx
// Utilize e componha os Skeletons conforme o layout de cada tela

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <Skeleton className="h-8 w-48 mx-auto mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
