import {
  InputHTMLAttributes,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
} from "react";
import { inputMasks, type InputMaskName } from "@/lib/utils/masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "default" | "filled" | "outlined";
  inputSize?: "sm" | "md" | "lg";
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  rounded?: boolean;
  mask?: InputMaskName; // máscara opcional
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = "default",
  inputSize = "md",
  className = "",
  inputClassName = "",
  labelClassName = "",
  rounded = true,
  mask,
  id,
  ...props
}: InputProps) {
  const hasError = !!error;
  const inputId = id || props.name || Math.random().toString(36).slice(2);

  // Helper para aplicar className nos ícones se forem elementos React
  const renderIcon = (icon: ReactNode) => {
    if (isValidElement<{ className?: string }>(icon)) {
      return cloneElement(icon, {
        className: `${icon.props.className ?? ""}`.trim(),
      });
    }
    return icon;
  };

  const baseStyles =
    "block w-full transition-all duration-200 focus:outline-none";

  const variants = {
    default: "bg-white shadow-sm",
    filled: "border-0 bg-lightGray",
    outlined: "border-2 bg-transparent",
  };

  const sizes = {
    sm: "py-2 text-13px",
    md: "py-2 md:py-3 text-12px md:text-14px",
    lg: "py-4 text-16px",
  };

  const roundedClass = rounded ? "rounded-lg" : "rounded-none";

  // Border fixo sempre primary, apenas muda em caso de erro
  const borderStyles = hasError ? "border-error" : "";
  const focusStyles = hasError ? "focus:border-error" : "focus:border-primary";

  const inputClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[inputSize]}
    ${roundedClass}
    ${borderStyles}
    ${focusStyles}
    ${leftIcon ? "all:pl-10" : "all:pl-4"}
    ${rightIcon ? "all:pr-10" : "all:pr-4"}
    text-primary disabled:opacity-50 disabled:cursor-not-allowed
    ${inputClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Style inline para border fixo primary
  const inputStyle = {
    border: hasError
      ? "1px solid var(--color-error)"
      : "1px solid var(--color-primary)",
  };

  const handleMaskedChange = useCallback<NonNullable<InputProps["onChange"]>>(
    (e) => {
      if (!mask) {
        props.onChange?.(e);
        return;
      }
      const apply = inputMasks[mask];
      if (!apply) {
        props.onChange?.(e);
        return;
      }
      const target = e.target as HTMLInputElement;
      const original = target.value;
      const cursorPosition = target.selectionStart ?? 0;
      const masked = apply(original);

      if (masked !== original) {
        // Calcula a nova posição do cursor baseada na diferença de tamanho
        const lengthDiff = masked.length - original.length;
        const newCursorPosition = Math.min(
          masked.length,
          Math.max(0, cursorPosition + lengthDiff)
        );

        target.value = masked;

        // Usa setTimeout para garantir que o valor seja atualizado antes de posicionar o cursor
        setTimeout(() => {
          try {
            target.setSelectionRange(newCursorPosition, newCursorPosition);
          } catch {}
        }, 0);
      }
      props.onChange?.(e);
    },
    [mask, props]
  );

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-12px md:text-14px font-medium text-primary mb-2 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{renderIcon(leftIcon)}</span>
          </div>
        )}
        <input
          id={inputId}
          className={inputClasses}
          style={inputStyle}
          aria-invalid={hasError}
          inputMode={
            mask === "currencyUSD" ||
            mask === "currencyBRL" ||
            mask === "numeric" ||
            mask === "cpf" ||
            mask === "cnpj" ||
            mask === "cpfCnpj"
              ? "numeric"
              : mask === "phone" || mask === "cep"
              ? "tel"
              : mask === "email"
              ? "email"
              : props.inputMode
          }
          onChange={handleMaskedChange}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{renderIcon(rightIcon)}</span>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          id={hasError ? `${inputId}-error` : `${inputId}-helper`}
          className={`mt-2 text-12px ${hasError ? "text-error" : "text-muted"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
