import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const extractHostname = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + (urlObj.port ? `:${urlObj.port}` : "");
    } catch (error) {
      console.warn("Erro ao parsear URL:", url);
      console.log(error);
      return "localhost:3001";
    }
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  const apiHostname = extractHostname(apiUrl);

  // URLs permitidas para conexão (incluindo fallbacks para desenvolvimento)
  const allowedConnectSrcs = [
    "'self'",
    `http://${apiHostname}`,
    `https://${apiHostname}`,
    // Fallbacks para desenvolvimento
    "http://localhost:3001",
    "https://localhost:3001",
  ].filter((url, index, arr) => arr.indexOf(url) === index);

  // CSP Header dinâmico (baseado na URL da API)
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

  response.headers.set("Content-Security-Policy", cspDirectives);

  const token = request.cookies.get("auth-token");
  const hasValidToken = token && token.value && token.value !== "";

  // Proteção de rotas
  if (pathname.startsWith("/admin") && !hasValidToken) {
    const redirectResponse = NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
    redirectResponse.cookies.delete("auth-token");
    return redirectResponse;
  }

  if (pathname === "/auth/login" && hasValidToken) {
    return NextResponse.redirect(new URL("/admin/home", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
