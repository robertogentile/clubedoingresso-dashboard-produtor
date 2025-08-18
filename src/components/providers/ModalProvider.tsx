"use client";
import {
  faXmark,
  faCheck,
  faExclamationTriangle,
  faInfo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Button, Text } from "@/components";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertButton {
  text: string;
  icon?: typeof faCheck;
  onClick?: () => void;
}

interface AlertOptions {
  type: AlertType;
  title: string;
  description: string;
  button?: AlertButton;
}

interface ModalContextValue {
  isOpen: boolean;
  open: (content: ReactNode) => void;
  close: () => void;
  showAlert: (options: AlertOptions) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const lockScroll = useCallback((lock: boolean) => {
    if (typeof document === "undefined") return;
    if (lock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, []);

  const open = useCallback(
    (c: ReactNode) => {
      setContent(c);
      setIsOpen(true);
      lockScroll(true);
    },
    [lockScroll]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    lockScroll(false);
  }, [lockScroll]);

  const getAlertConfig = useCallback((type: AlertType) => {
    const configs = {
      success: {
        icon: faCheck,
        titleColor: "success" as const,
        iconColor: "text-success",
      },
      error: {
        icon: faTimes,
        titleColor: "error" as const,
        iconColor: "text-error",
      },
      warning: {
        icon: faExclamationTriangle,
        titleColor: "oculto" as const,
        iconColor: "text-oculto",
      },
      info: {
        icon: faInfo,
        titleColor: "primary" as const,
        iconColor: "text-primary",
      },
    };
    return configs[type];
  }, []);

  const showAlert = useCallback(
    (options: AlertOptions) => {
      /*
      // Exemplo básico - sucesso
      showAlert({
        type: "success",
        title: "Sucesso!",
        description: "Operação realizada com sucesso!"
      });

      // Exemplo com botão customizado e callback
      showAlert({
        type: "error", 
        title: "Erro",
        description: "Algo deu errado. Tente novamente.",
        button: {
          text: "Tentar Novamente",
          icon: faRefresh, // Ícone opcional
          onClick: () => {
            // Ação customizada
            console.log("Tentando novamente...");
          }
        }
      });

      // Exemplo warning
      showAlert({
        type: "warning",
        title: "Atenção",
        description: "Esta ação não pode ser desfeita."
      });

      // Exemplo info
      showAlert({
        type: "info", 
        title: "Informação",
        description: "Dados atualizados automaticamente."
      });
      */
      const config = getAlertConfig(options.type);
      const buttonText = options.button?.text || "OK";
      const buttonIcon = options.button?.icon;
      const buttonCallback = options.button?.onClick;

      const handleButtonClick = () => {
        if (buttonCallback) {
          buttonCallback();
        }
        close();
      };

      const alertContent = (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FontAwesomeIcon
              icon={config.icon}
              className={`${config.iconColor} text-24px`}
            />
          </div>
          <Text
            size="16-20-24"
            weight="700"
            color={config.titleColor}
            className="text-center mb-2"
          >
            {options.title}
          </Text>
          <Text size="12-16" color="primary" className="text-center mb-6">
            {options.description}
          </Text>
          <Button
            variant="primary"
            size="sm"
            onClick={handleButtonClick}
            className="px-8 flex items-center gap-2 min-w-[120px]"
          >
            {buttonIcon && (
              <FontAwesomeIcon
                icon={buttonIcon}
                className="text-white"
                style={{ width: "16px", height: "16px" }}
              />
            )}
            {buttonText}
          </Button>
        </div>
      );

      open(alertContent);
    },
    [open, close, getAlertConfig]
  );

  useEffect(() => () => lockScroll(false), [lockScroll]);

  const value = useMemo(
    () => ({ isOpen, open, close, showAlert }),
    [isOpen, open, close, showAlert]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <ModalRoot isOpen={isOpen} onClose={close}>
            {content}
          </ModalRoot>,
          document.body
        )}
    </ModalContext.Provider>
  );
}

function ModalRoot({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/40 animate-fade"
        onClick={onClose}
      />
      <div className="relative z-10 max-w-md w-[92%] md:w-[480px] bg-white rounded-xl shadow-xl p-5 animate-in zoom-in-95">
        <button
          aria-label="Fechar"
          className="absolute right-3 top-3 text-gray-700 hover:text-primary"
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-primary hover:cursor-pointer"
            style={{
              width: "32px",
              height: "32px",
            }}
          />
        </button>
        {children}
      </div>
    </div>
  );
}
