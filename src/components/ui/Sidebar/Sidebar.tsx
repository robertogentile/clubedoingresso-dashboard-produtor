"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  faBars,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/lib/stores/authStore";
import { logoutAction } from "@/lib/actions/auth/logout";
import { ROUTES } from "@/lib/config/routes";

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
    href: ROUTES.REDIRECTS.HOME,
    label: "Home",
    icon: faHome,
    requiresEvent: false,
  },
  {
    href: ROUTES.REDIRECTS.DASHBOARD,
    label: "Dashboard",
    icon: faThLarge,
    requiresEvent: true,
  },
  {
    href: ROUTES.REDIRECTS.RELATORIO,
    label: "Relatórios",
    icon: faChartBar,
    requiresEvent: true,
  },
  {
    href: ROUTES.REDIRECTS.FINANCEIRO,
    label: "Financeiro",
    icon: faDollarSign,
    requiresEvent: true,
  },
  {
    href: ROUTES.REDIRECTS.ADMINISTRACAO,
    label: "Administração",
    icon: faDesktop,
    requiresEvent: true,
  },
  {
    href: ROUTES.REDIRECTS.CHECKIN,
    label: "Check-in",
    icon: faCheckCircle,
    requiresEvent: true,
  },
  {
    href: ROUTES.REDIRECTS.PERFIL,
    label: "Perfil",
    icon: faUser,
    requiresEvent: false,
  },
];

export default function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const { selectedEvent, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Filtra itens baseado no evento selecionado
  const visibleNavItems = navItems.filter(
    (item) => !item.requiresEvent || selectedEvent
  );

  // Itens para mobile com evento
  const mobileMainItems = selectedEvent
    ? [
        { href: ROUTES.REDIRECTS.HOME, label: "Home", icon: faHome },
        {
          href: ROUTES.REDIRECTS.DASHBOARD,
          label: "Dashboard",
          icon: faThLarge,
        },
        {
          href: ROUTES.REDIRECTS.RELATORIO,
          label: "Relatórios",
          icon: faChartBar,
        },
        {
          href: ROUTES.REDIRECTS.FINANCEIRO,
          label: "Financeiro",
          icon: faDollarSign,
        },
        {
          href: ROUTES.REDIRECTS.ADMINISTRACAO,
          label: "Admin",
          icon: faDesktop,
        },
      ]
    : [
        { href: ROUTES.REDIRECTS.HOME, label: "Home", icon: faHome },
        { href: ROUTES.REDIRECTS.PERFIL, label: "Perfil", icon: faUser },
      ];

  // Itens do submenu (apenas quando tem evento)
  const submenuItems = selectedEvent
    ? [
        {
          href: ROUTES.REDIRECTS.CHECKIN,
          label: "Check-in",
          icon: faCheckCircle,
        },
        { href: ROUTES.REDIRECTS.PERFIL, label: "Perfil", icon: faUser },
        { action: "logout", label: "Sair", icon: faSignOutAlt },
      ]
    : [];

  const handleLogout = async () => {
    // Limpar Zustand primeiro
    logout();
    setIsMenuOpen(false);

    // Chamar Server Action para limpar cookies
    const result = await logoutAction();

    // Redirecionar no cliente se deu certo
    if (result.success && result.redirectTo) {
      window.location.href = result.redirectTo;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        (menuRef.current && menuRef.current.contains(event.target as Node)) ||
        (menuButtonRef.current &&
          menuButtonRef.current.contains(event.target as Node))
      ) {
        return;
      }

      setIsMenuOpen(false);
    }

    function handleScroll() {
      setIsMenuOpen(false);
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, visible on lg+ */}
      <div
        className={`hidden lg:block w-64 bg-white shadow-sm min-h-screen ${className}`}
      >
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center">
            <Link href={ROUTES.REDIRECTS.HOME}>
              <Image
                src="/images/logotipo-clube.svg"
                alt="Clube do Ingresso"
                width={300}
                height={100}
                className="mx-auto"
                priority={true}
              />
            </Link>
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

      {/* Mobile Bottom Navigation - Visible only on mobile, hidden on lg+ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        {/* Submenu - aparece apenas quando tem evento selecionado */}
        {selectedEvent && isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute bottom-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px] transform transition-all duration-200 ease-out animate-in slide-in-from-bottom-2"
          >
            {submenuItems.map((item) => {
              if (item.action === "logout") {
                return (
                  <button
                    key="logout"
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-4 h-4 mr-3"
                    />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-2 transition-colors ${
                    isActive
                      ? "text-secondary bg-secondary/10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-around px-1 py-1">
          {/* Botão Menu - apenas quando tem evento */}
          {selectedEvent && (
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              className={`flex flex-col items-center justify-center px-1 py-1 rounded-lg transition-colors min-w-[60px] ${
                isMenuOpen
                  ? "text-secondary bg-secondary/10"
                  : "text-gray-600 hover:text-secondary hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faBars} className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-medium">Menu</span>
            </button>
          )}

          {/* Itens principais */}
          {mobileMainItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-1 py-1 rounded-lg transition-colors min-w-[60px] ${
                  isActive
                    ? "text-secondary bg-secondary/10"
                    : "text-gray-600 hover:text-secondary hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium truncate">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Botão Sair - apenas quando NÃO tem evento */}
          {!selectedEvent && (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-colors min-w-[60px] text-gray-600 hover:text-secondary hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Sair</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
