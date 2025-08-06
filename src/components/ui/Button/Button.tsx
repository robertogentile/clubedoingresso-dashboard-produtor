import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "muted"
    | "purple"
    | "blue"
    | "darkBlue"
    | "white";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed active:transform active:scale-95";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-sm",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary shadow-sm",
    outline:
      "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary",
    danger:
      "bg-danger text-white hover:bg-danger/90 focus:ring-danger shadow-sm",
    success:
      "bg-success text-white hover:bg-success/90 focus:ring-success shadow-sm",
    muted: "bg-muted text-white hover:bg-muted/90 focus:ring-muted shadow-sm",
    purple:
      "bg-purple text-white hover:bg-purple/90 focus:ring-purple shadow-sm",
    blue: "bg-blue text-white hover:bg-blue/90 focus:ring-blue shadow-sm",
    darkBlue:
      "bg-darkBlue text-white hover:bg-darkBlue/90 focus:ring-darkBlue shadow-sm",
    white:
      "bg-white text-primary border border-lightGray hover:bg-gray/5 focus:ring-primary shadow-sm",
  } as const;

  const sizes = {
    sm: "py-1.5 text-12px md:text-13px",
    md: "py-2 md:py-3 text-12px md:text-14px",
    lg: "py-2 md:py-3 text-14px md:text-16px",
    xl: "py-4 text-16px md:text-18px",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const loadingClass = loading ? "cursor-wait" : "";

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${loadingClass} ${className}`;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
