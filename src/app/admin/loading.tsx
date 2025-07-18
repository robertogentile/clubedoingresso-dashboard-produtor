export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="ml-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="mt-8 px-4 space-y-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center px-4 py-2">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="ml-3 h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1">
          {/* Header Skeleton */}
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-8">
            <div className="max-w-[1150px] mx-auto space-y-6">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="ml-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
