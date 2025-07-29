import Image from "next/image";
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  status: "Ativo" | "Oculto" | "Inativo";
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
    Ativo: {
      color: "bg-green-500",
      label: "Ativo",
    },
    Oculto: {
      color: "bg-yellow-500",
      label: "Oculto",
    },
    Inativo: {
      color: "bg-gray-500",
      label: "Inativo",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div
      className={`bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow ${className}`}
    >
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
        <Image
          src={imageUrl || "/images/placeholder-event.jpg"}
          alt={title}
          fill
          className="w-full h-full object-cover"
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL="/images/placeholder-event-blur.jpg"
        />
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
