import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: InputProps) {
  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{leftIcon}</div>
          </div>
        )}

        <input
          className={`
            block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              hasError
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{rightIcon}</div>
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p
          className={`mt-1 text-sm ${
            hasError ? "text-red-600" : "text-gray-500"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
