"use client";

import { useAuthStore } from "@/lib/stores/authStore";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
        <div className="flex justify-between items-center py-4">
          <div className="flex-1 min-w-0">
            {selectedEvent ? (
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-900 truncate">
                  {selectedEvent.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {formatDate(selectedEvent.date)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-lg font-medium text-gray-900">
                  Olá, {producer?.fantasy_name || "Usuário"}!
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center ml-4">
            <Link
              href="/perfil"
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
