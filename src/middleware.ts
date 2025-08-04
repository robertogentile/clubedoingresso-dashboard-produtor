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
      "upgrade-insecure-requests",
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

  response.headers.set("Content-Security-Policy", getAllowedConnectSrcs());

  const token = request.cookies.get("auth-token");
  const hasValidToken = token && token.value && token.value !== "";

  // Proteção de rotas - usando arrays configuráveis
  if (isProtectedRoute(pathname) && !hasValidToken) {
    const redirectResponse = NextResponse.redirect(
      new URL(ROUTES.REDIRECTS.LOGIN, request.url)
    );
    redirectResponse.cookies.delete("auth-token");
    return redirectResponse;
  }

  // Redirecionar usuários autenticados que tentam acessar páginas de auth
  if (isPublicRoute(pathname) && hasValidToken) {
    return NextResponse.redirect(new URL(ROUTES.REDIRECTS.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: getMatcherConfig(),
};
