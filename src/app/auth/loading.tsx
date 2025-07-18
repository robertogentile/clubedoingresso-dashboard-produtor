export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mx-auto mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
