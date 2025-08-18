"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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

interface ModalContextValue {
  isOpen: boolean;
  open: (content: ReactNode) => void;
  close: () => void;
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

  useEffect(() => () => lockScroll(false), [lockScroll]);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

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
