"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import Text from "@/components/ui/Text/Text";

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
      color: "bg-ativo",
      label: "Ativo",
    },
    Oculto: {
      color: "bg-oculto",
      label: "Oculto",
    },
    Inativo: {
      color: "bg-encerrado",
      label: "Encerrado",
    },
  } as const;

  const currentStatus = statusConfig[status];

  const handleSelectEvent = () => {
    setSelectedEvent({
      id,
      name: title,
      date,
      location,
      status,
    });

    router.push(ROUTES.REDIRECTS.DASHBOARD);
  };

  return (
    <div
      className={`bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
        isSelected ? "ring-2 ring-primary" : ""
      } ${className}`}
      onClick={handleSelectEvent}
    >
      <div className="h-[140px] md:h-[300px] bg-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
        <Image
          src={imageUrl || "/images/placeholder-event.jpg"}
          alt={title}
          fill
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 140px, 300px"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/images/placeholder-event-blur.jpg"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
            <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="p-2 md:p-4">
        <Text
          size="12-16"
          weight="700"
          color="darkGray"
          className="mb-2 line-clamp-2 min-h-[36px] md:min-h-[48px]"
        >
          {title}
        </Text>

        <Text size="10-12" color="primary" className="mb-6 md:mb-8">
          {date}
        </Text>

        <Text
          size="12-16"
          color="primary"
          weight="700"
          className="line-clamp-1 min-h-[18px] md:min-h-[24px] mb-2 md:mb-3"
        >
          {location}
        </Text>

        <div className="flex items-center">
          <div
            className={`w-4 h-4 md:w-7 md:h-7 ${currentStatus.color} rounded-full mr-2`}
          />
          <Text size="12-15" color="primary">
            {currentStatus.label}
          </Text>
        </div>
      </div>
    </div>
  );
}
