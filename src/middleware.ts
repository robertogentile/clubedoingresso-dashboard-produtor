import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isProtectedRoute, isPublicRoute, ROUTES } from "@/lib/config/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // CSP temporariamente desabilitado até implementarmos nonce dinâmico

  const authToken =
    request.cookies.get("accessToken") ?? request.cookies.get("auth-token");
  const producerId = request.cookies.get("producer-id");

  const hasValidAuth = !!authToken?.value;
  const hasValidProducer = !!producerId?.value;
  const isAuthenticated = hasValidAuth && hasValidProducer;

  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const redirectResponse = NextResponse.redirect(
      new URL(ROUTES.REDIRECTS.LOGIN, request.url)
    );
    redirectResponse.cookies.delete("accessToken");
    redirectResponse.cookies.delete("refreshToken");
    redirectResponse.cookies.delete("auth-token");
    redirectResponse.cookies.delete("refresh-token");
    redirectResponse.cookies.delete("producer-id");
    return redirectResponse;
  }

  if (isPublicRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.REDIRECTS.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Rotas protegidas
    "/home/:path*",
    "/dashboard/:path*",
    "/relatorio/:path*",
    "/financeiro/:path*",
    "/administracao/:path*",
    "/checkin/:path*",
    "/perfil/:path*",
    // Rotas públicas
    "/login",
    "/esqueci-senha",
    // Outras rotas (exceto assets)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
