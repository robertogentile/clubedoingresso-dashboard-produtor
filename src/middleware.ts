import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isProtectedRoute,
  isPublicRoute,
  ROUTES,
  getMatcherConfig,
} from "@/lib/config/routes";

function getAllowedConnectSrcs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const urlObj = new URL(apiUrl);
    const apiHostname =
      urlObj.hostname + (urlObj.port ? `:${urlObj.port}` : "");

    const allowedConnectSrcs = [
      "'self'",
      `http://${apiHostname}`,
      `https://${apiHostname}`,
      "http://localhost:3001",
      "https://localhost:3001",
      "http://localhost:3000",
      "https://localhost:3000",
    ].filter((url, index, arr) => arr.indexOf(url) === index);

    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: https: http:",
      `connect-src ${allowedConnectSrcs.join(" ")}`,
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      // Remover upgrade-insecure-requests em desenvolvimento
      ...(process.env.NODE_ENV === "production"
        ? ["upgrade-insecure-requests"]
        : []),
    ].join("; ");

    return cspDirectives;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Content-Security-Policy", getAllowedConnectSrcs());
  }

  const authToken = request.cookies.get("auth-token");
  const producerId = request.cookies.get("producer-id");

  // Verificar se tem tanto auth-token quanto producer-id
  const hasValidAuth = authToken?.value && authToken.value.length > 0;
  const hasValidProducer = producerId?.value && producerId.value.length > 0;
  const isAuthenticated = hasValidAuth && hasValidProducer;

  // Proteção de rotas
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const redirectResponse = NextResponse.redirect(
      new URL(ROUTES.REDIRECTS.LOGIN, request.url)
    );
    // Limpar cookies se não está autenticado
    redirectResponse.cookies.delete("auth-token");
    redirectResponse.cookies.delete("refresh-token");
    redirectResponse.cookies.delete("producer-id");
    return redirectResponse;
  }

  // Redirecionar usuários autenticados
  if (isPublicRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.REDIRECTS.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: getMatcherConfig(),
};
