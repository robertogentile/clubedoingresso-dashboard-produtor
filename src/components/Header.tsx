interface HeaderProps {
  eventName?: string;
  eventDate?: string;
  showUserInfo?: boolean;
  userName?: string;
  className?: string;
}

export default function Header({
  eventName = "Nome do show, espetáculo, peça, evento e etc.",
  eventDate = "10/03/2025",
  showUserInfo = false,
  userName = "Emerson",
  className = "",
}: HeaderProps) {
  return (
    <header className={`bg-white shadow ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Event Info */}
          <div className="flex-1">
            {showUserInfo && (
              <p className="text-sm text-gray-600 mb-1">Olá, {userName}!</p>
            )}
            <h1 className="text-lg font-bold text-gray-900">{eventName}</h1>
            <p className="text-sm text-gray-600">{eventDate}</p>
          </div>

          {/* User Profile Button */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
