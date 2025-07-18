import { redirect } from "next/navigation";

export default function RootPage() {
  // Por enquanto, redirecionamos para o login
  // Depois implementaremos a lógica de autenticação
  redirect("/auth/login");
}
