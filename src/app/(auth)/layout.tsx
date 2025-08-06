import { ROUTES } from "@/lib/config/routes";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-auth-layout>
      <div className="bg-white mb-10 p-4 md:p-6 lg:p-8">
        <Link href={ROUTES.REDIRECTS.LOGIN}>
          <Image
            src="/images/logotipo-clube.svg"
            alt="Clube do Ingresso"
            className="mx-auto w-[150px] h-[50px] md:w-[200px] md:h-[70px] lg:w-[300px] lg:h-[100px]"
            width={300}
            height={100}
            priority={true}
          />
        </Link>
      </div>
      {children}
    </div>
  );
}
