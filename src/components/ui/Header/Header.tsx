"use client";

import { useAuthStore } from "@/lib/stores/authStore";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { ROUTES } from "@/lib/config/routes";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const { producer, selectedEvent } = useAuthStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <header className={`bg-white px-8 shadow ${className}`}>
      <div className="max-w-[1150px] mx-auto ">
        <div className="relative flex justify-between items-center py-4">
          {/* Mobile: logo centralizada absoluta */}
          <div className="block lg:hidden absolute left-1/2 -translate-x-1/2">
            <Link
              href={ROUTES.REDIRECTS.HOME}
              className="inline-flex items-center"
            >
              <Image
                src="/images/logotipo-clube.svg"
                alt="Clube do Ingresso"
                width={160}
                height={50}
                priority
              />
            </Link>
          </div>
          <div className="flex-1 min-w-0">
            {/* Desktop: exibe dados do evento/usuário */}
            <div className="hidden lg:block">
              {selectedEvent ? (
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-primary truncate">
                    {selectedEvent.name}
                  </h1>
                  <p className="text-sm text-secondary">
                    {formatDate(selectedEvent.date)}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-lg font-medium text-primary">
                    Olá, {producer?.fantasy_name || "Usuário"}!
                  </p>
                </div>
              )}
            </div>
          </div>

          <Link
            href={ROUTES.REDIRECTS.PERFIL}
            className="flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 p-2"
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ width: "24px", height: "24px" }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
