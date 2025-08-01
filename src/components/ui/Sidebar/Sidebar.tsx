"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faThLarge,
  faChartBar,
  faDollarSign,
  faDesktop,
  faCheckCircle,
  faUser,
  faSignOutAlt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/lib/stores/auth-store";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: IconDefinition;
  requiresEvent?: boolean;
}

const navItems: NavItem[] = [
  {
    href: "/admin/home",
    label: "Home",
    icon: faHome,
    requiresEvent: false,
  },
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: faThLarge,
    requiresEvent: true,
  },
  {
    href: "/admin/relatorio",
    label: "Relatórios",
    icon: faChartBar,
    requiresEvent: true,
  },
  {
    href: "/admin/financeiro",
    label: "Financeiro",
    icon: faDollarSign,
    requiresEvent: true,
  },
  {
    href: "/admin/administracao",
    label: "Administração",
    icon: faDesktop,
    requiresEvent: true,
  },
  {
    href: "/admin/checkin",
    label: "Check-in",
    icon: faCheckCircle,
    requiresEvent: true,
  },
  {
    href: "/admin/perfil",
    label: "Perfil",
    icon: faUser,
    requiresEvent: false,
  },
];

export default function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const { selectedEvent, logout } = useAuthStore();

  // Filtra itens baseado no evento selecionado
  const visibleNavItems = navItems.filter(
    (item) => !item.requiresEvent || selectedEvent
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`w-64 bg-white shadow-sm min-h-screen ${className}`}>
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center">
          <Image
            src="/images/logotipo-clube.svg"
            alt="Clube do Ingresso"
            width={300}
            height={100}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-white bg-secondary"
                    : "text-secondary hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="mt-8 px-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
}
