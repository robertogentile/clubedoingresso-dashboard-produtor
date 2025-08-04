"use client";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useRouter } from "next/navigation";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  status: "Ativo" | "Oculto" | "Inativo";
  imageUrl?: string;
  className?: string;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  status,
  imageUrl,
  className = "",
}: EventCardProps) {
  const { selectedEvent, setSelectedEvent } = useAuthStore();
  const router = useRouter();
  const isSelected = selectedEvent?.id === id;

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

  const handleSelectEvent = () => {
    setSelectedEvent({
      id,
      name: title,
      date,
      location,
      status,
    });

    // Redireciona para o dashboard após selecionar
    router.push("/dashboard");
  };

  return (
    <div
      className={`bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
        isSelected ? "ring-2 ring-primary" : ""
      } ${className}`}
      onClick={handleSelectEvent}
    >
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
        <Image
          src={imageUrl || "/images/placeholder-event.jpg"}
          alt={title}
          fill
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/images/placeholder-event-blur.jpg"
        />
        {/* Indicador de seleção */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
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
