import {
  InputHTMLAttributes,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = "",
  inputClassName = "",
  iconClassName = "text-primary",
  id,
  ...props
}: InputProps) {
  const hasError = !!error;
  const inputId = id || props.name || Math.random().toString(36).slice(2);

  // Helper para aplicar className nos ícones se forem elementos React
  const renderIcon = (icon: ReactNode) => {
    if (isValidElement<{ className?: string }>(icon)) {
      return cloneElement(icon, {
        className: `${icon.props.className ?? ""} ${iconClassName}`.trim(),
      });
    }
    return icon;
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-primary mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span>{renderIcon(leftIcon)}</span>
          </div>
        )}
        <input
          id={inputId}
          className={`
            block w-full px-4 py-3 border rounded-xl shadow-sm
            text-primary bg-white placeholder-primary
            focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors
            ${leftIcon ? "pl-11" : ""}
            ${rightIcon ? "pr-11" : ""}
            ${
              hasError
                ? "border-error focus:border-error focus:ring-error"
                : "border-primary focus:border-primary focus:ring-primary"
            }
            ${inputClassName}
          `}
          aria-invalid={hasError}
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
            <span>{renderIcon(rightIcon)}</span>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          id={hasError ? `${inputId}-error` : `${inputId}-helper`}
          className={`mt-1 text-sm ${hasError ? "text-error" : "text-gray"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
