import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "muted";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: " hover:bg-primary/90 focus:ring-2 focus:ring-primary",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 focus:ring-2 focus:ring-secondary",
    outline:
      "border border-primary bg-white text-primary hover:bg-primary/5 focus:ring-2 focus:ring-primary",
    ghost: "text-primary hover:bg-primary/5 focus:ring-2 focus:ring-primary",
    danger:
      "bg-danger text-white hover:bg-danger/90 focus:ring-2 focus:ring-danger",
    success:
      "bg-success text-white hover:bg-success/90 focus:ring-2 focus:ring-success",
    muted:
      "bg-muted text-white hover:bg-muted/90 focus:ring-2 focus:ring-muted",
  } as const;

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
