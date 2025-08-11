import { Text } from "@/components";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center px-4">
      <Text
        typeElement="h1"
        color="secondary"
        weight="700"
        align="center"
        size="24-28-34"
        className="mb-4 md:mb-8"
      >
        Área do produtor
      </Text>

      <Text
        color="secondary"
        weight="bold"
        size="12-16"
        align="center"
        className="mb-2 tracking-wider uppercase"
      >
        Atenção
      </Text>
      <Text
        color="secondary"
        align="center"
        size="12-16"
        className="mb-4 md:mb-10"
      >
        Este acesso é destinado a produtores do Clube do Ingresso.
      </Text>

      <LoginForm />
    </div>
  );
}
