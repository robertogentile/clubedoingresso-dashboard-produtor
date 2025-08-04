interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export function Skeleton({
  className = "",
  width,
  height,
  rounded = false,
}: SkeletonProps) {
  return (
    <div
      className={
        `bg-gray-200 animate-pulse ` +
        (rounded ? "rounded-full" : "rounded") +
        " " +
        className
      }
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="ml-4 space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="divide-y">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 flex items-center space-x-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
