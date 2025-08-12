// Configuração centralizada de rotas
export const ROUTES = {
  // Rotas protegidas (requerem autenticação)
  PROTECTED: [
    "/home",
    "/dashboard",
    "/relatorio",
    "/financeiro",
    "/administracao",
    "/checkin",
    "/perfil",
  ] as const,

  // Rotas públicas (não requerem autenticação)
  PUBLIC: ["/login", "/esqueci-senha"] as const,

  // Rotas de redirecionamento padrão
  REDIRECTS: {
    LOGIN: "/login",
    ESQUECI_SENHA: "/esqueci-senha",

    HOME: "/home",
    DASHBOARD: "/dashboard",
    RELATORIO: "/relatorio",
    FINANCEIRO: "/financeiro",
    ADMINISTRACAO: "/administracao",
    CHECKIN: "/checkin",
    PERFIL: "/perfil",
  } as const,
} as const;

// Tipos para TypeScript
export type ProtectedRoute = (typeof ROUTES.PROTECTED)[number];
export type PublicRoute = (typeof ROUTES.PUBLIC)[number];

// Funções utilitárias
export function isProtectedRoute(pathname: string): boolean {
  return ROUTES.PROTECTED.some((route) => pathname.startsWith(route));
}

export function isPublicRoute(pathname: string): boolean {
  return ROUTES.PUBLIC.some((route) => pathname === route);
}
