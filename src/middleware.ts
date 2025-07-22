import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Lê o token do cookie (não HttpOnly, mas pronto para HttpOnly)
  const token = request.cookies.get("auth-token");

  // Bloqueia rotas protegidas se não autenticado
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  // Bloqueia login se já autenticado
  if (pathname === "/auth/login" && token) {
    return NextResponse.redirect(new URL("/admin/home", request.url));
  }
  // Se a API passar a setar HttpOnly, o middleware continuará funcionando normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
