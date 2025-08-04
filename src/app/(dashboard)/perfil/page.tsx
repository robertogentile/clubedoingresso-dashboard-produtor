"use client";

import { useAuthStore } from "@/lib/stores/auth-store";
import { Button, Text, Input } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuilding,
  faPhone,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function PerfilPage() {
  const { producer } = useAuthStore();

  return (
    <div className="flex-1 py-8 bg-gray-background">
      <div className="mb-8">
        <Text size="40px" weight="bold" className="text-secondary py-8">
          Perfil
        </Text>

        {/* Meus Dados */}
        <div className=" py-8 rounded-lg mb-2">
          <Text size="16px" weight="bold" className="text-secondary mb-6">
            Meus dados
          </Text>

          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 h-5 text-gray-400 mr-2"
                />
                <Text size="16px" weight="bold" className="text-secondary">
                  Contato
                </Text>
              </div>
              <Text className="text-secondary ml-7">
                {producer?.contact || "Clube do Ingresso"}
              </Text>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="w-5 h-5 text-gray-400 mr-2"
                />
                <Text size="16px" weight="bold" className="text-secondary">
                  Nome fantasia
                </Text>
              </div>
              <Text className="text-secondary ml-7">
                {producer?.fantasy_name || "Demonstração Clube do Ingresso"}
              </Text>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="w-5 h-5 text-gray-400 mr-2"
                />
                <Text size="16px" weight="bold" className="text-secondary">
                  Celular
                </Text>
              </div>
              <Text className="text-secondary ml-7">
                {producer?.phone || "11 9000-0000"}
              </Text>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-5 h-5 text-gray-400 mr-2"
                />
                <Text size="16px" weight="bold" className="text-secondary">
                  E-mail
                </Text>
              </div>
              <Text className="text-secondary ml-7">
                {producer?.email || "demonstracao@clubedoingresso.com"}
              </Text>
            </div>
          </div>
        </div>

        {/* Alterar Senha */}
        <div className=" py-8 rounded-lg ">
          <Text size="16px" weight="bold" className="text-secondary mb-6">
            Alterar senha
          </Text>

          <form className="space-y-6 max-w-md">
            <Input
              label="Senha atual"
              type="password"
              placeholder="Senha atual"
              leftIcon={<FontAwesomeIcon icon={faLock} />}
            />

            <Input
              label="Nova senha"
              type="password"
              placeholder="Nova senha"
              leftIcon={<FontAwesomeIcon icon={faLock} />}
            />

            <Input
              label="Confirmar senha"
              type="password"
              placeholder="Nova senha"
              leftIcon={<FontAwesomeIcon icon={faLock} />}
            />

            <Button
              variant="primary"
              size="md"
              fullWidth
              className="mt-6"
              type="submit"
            >
              Atualizar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
