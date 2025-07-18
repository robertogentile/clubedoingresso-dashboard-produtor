import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  /*const { pathname } = request.nextUrl;
  // Rotas que requerem autenticação
  if (pathname.startsWith("/admin")) {
    // Verificar token/session aqui
    const token = request.cookies.get("auth-token");
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  // Rotas de auth - redirecionar se já logado
  if (pathname.startsWith("/auth") && pathname !== "/auth/login") {
    const token = request.cookies.get("auth-token");
    if (token) {
      return NextResponse.redirect(new URL("/admin/home", request.url));
    }
  }*/
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
