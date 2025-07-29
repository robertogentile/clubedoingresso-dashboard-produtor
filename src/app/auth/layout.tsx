import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-background">
      <div className="mb-10 bg-white p-8">
        <Image
          src="/images/logotipo-clube.svg"
          alt="Clube do Ingresso"
          width={300}
          height={100}
          className="mx-auto"
        />
      </div>
      {children}
    </div>
  );
}
