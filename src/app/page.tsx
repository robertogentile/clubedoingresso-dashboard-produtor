import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";

export default function RootPage() {
  redirect(ROUTES.REDIRECTS.LOGIN);
}
