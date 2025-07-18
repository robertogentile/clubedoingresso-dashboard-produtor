interface EventCardProps {
  title: string;
  date: string;
  location: string;
  status: "active" | "hidden";
  imageUrl?: string;
  className?: string;
}

export default function EventCard({
  title,
  date,
  location,
  status,
  imageUrl,
  className = "",
}: EventCardProps) {
  const statusConfig = {
    active: {
      color: "bg-green-500",
      label: "Ativo",
    },
    hidden: {
      color: "bg-yellow-500",
      label: "Oculto",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div
      className={`bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow ${className}`}
    >
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl font-bold mb-2">20 OUT</div>
              <div className="text-sm mb-1">A Casinha</div>
              <div className="text-sm">BOTECO</div>
            </div>
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{date}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 truncate">{location}</span>
          <div className="flex items-center flex-shrink-0 ml-4">
            <div
              className={`w-3 h-3 ${currentStatus.color} rounded-full mr-2`}
            ></div>
            <span className="text-sm text-gray-600">{currentStatus.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
