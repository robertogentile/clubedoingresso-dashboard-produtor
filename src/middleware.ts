import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isProtectedRoute,
  isPublicRoute,
  ROUTES,
  getMatcherConfig,
} from "@/lib/config/routes";

function getCspDirectives() {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const { hostname, port } = new URL(apiUrl);
    const apiHostWithPort = hostname + (port ? `:${port}` : "");

    const isProd = process.env.NODE_ENV === "production";

    const connectSrc = isProd
      ? [`'self'`, `https://${apiHostWithPort}`]
      : [
          `'self'`,
          `http://${apiHostWithPort}`,
          `https://${apiHostWithPort}`,
          "http://localhost:3001",
          "https://localhost:3001",
          "http://localhost:3000",
          "https://localhost:3000",
        ];

    const directives = [
      "default-src 'self'",
      // Sem inline/eval em produção
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      // Apenas https em produção
      isProd
        ? "img-src 'self' data: https:"
        : "img-src 'self' data: https: http:",
      `connect-src ${connectSrc.join(" ")}`,
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isProd ? ["upgrade-insecure-requests"] : []),
    ].join("; ");

    return directives;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Content-Security-Policy", getCspDirectives());
  }

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
  matcher: getMatcherConfig(),
};
