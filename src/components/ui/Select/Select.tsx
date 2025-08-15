import { SelectHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface OptionItem {
  label: string;
  value: string | number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: OptionItem[];
  placeholder?: string;
  variant?: "default" | "filled" | "outlined";
  selectSize?: "sm" | "md" | "lg";
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  rounded?: boolean;
}

export default function Select({
  label,
  error,
  helperText,
  options,
  placeholder,
  variant = "default",
  selectSize = "md",
  className = "",
  selectClassName = "",
  labelClassName = "",
  rounded = true,
  id,
  ...props
}: SelectProps) {
  const hasError = !!error;
  const selectId = id || props.name || Math.random().toString(36).slice(2);

  const baseStyles =
    "block w-full transition-all duration-200 focus:outline-none bg-white";

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

  const borderStyles = hasError ? "border-error" : "";
  const focusStyles = hasError ? "focus:border-error" : "focus:border-primary";

  const selectClasses = `
		${baseStyles}
		${variants[variant]}
		${sizes[selectSize]}
		${roundedClass}
		${borderStyles}
		${focusStyles}
		all:pl-4 pr-10 text-primary disabled:opacity-50 disabled:cursor-not-allowed
		appearance-none
		${selectClassName}
	`
    .trim()
    .replace(/\s+/g, " ");

  const selectStyle = {
    border: hasError
      ? "1px solid var(--color-error)"
      : "1px solid var(--color-primary)",
  } as const;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={selectId}
          className={`block text-12px md:text-14px font-medium text-primary mb-2 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={selectClasses}
          style={selectStyle}
          aria-invalid={hasError}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      {(error || helperText) && (
        <p
          className={`mt-2 text-12px ${hasError ? "text-error" : "text-muted"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
