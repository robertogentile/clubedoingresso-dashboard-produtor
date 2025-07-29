import NextLink from "next/link";
import { ReactNode, AnchorHTMLAttributes } from "react";

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  href: string;
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "muted"
    | "danger"
    | "success"
    | "blue"
    | "purple";
  size?: "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold" | "bold";
  underline?: "none" | "hover" | "always";
  external?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Link({
  href,
  children,
  variant = "primary",
  size = "md",
  weight = "normal",
  underline = "hover",
  external = false,
  disabled = false,
  className = "",
  target,
  rel,
  ...props
}: LinkProps) {
  // Detectar se é link externo automaticamente
  const isExternal =
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  const baseStyles =
    "inline-flex items-center transition-colors duration-200 focus:outline-none rounded";

  const variants = {
    primary: "text-primary hover:text-primary/80",
    secondary: "text-secondary hover:text-primary",
    muted: "text-muted hover:text-gray",
    danger: "text-danger hover:text-danger/80",
    success: "text-success hover:text-success/80",
    blue: "text-blue hover:text-blue/80",
    purple: "text-purple hover:text-purple/80",
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const underlineStyles = {
    none: "no-underline",
    hover: "no-underline hover:underline",
    always: "underline",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${weights[weight]}
    ${underlineStyles[underline]}
    ${disabledStyles}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Determinar target e rel para links externos
  const linkTarget = isExternal && !target ? "_blank" : target;
  const linkRel = isExternal && !rel ? "noopener noreferrer" : rel;

  const linkProps = {
    className: classes,
    target: linkTarget,
    rel: linkRel,
    "aria-disabled": disabled,
    ...props,
  };

  // Se for link externo ou estiver desabilitado, usar tag <a>
  if (isExternal || disabled) {
    return (
      <a href={disabled ? undefined : href} {...linkProps}>
        {children}
      </a>
    );
  }

  // Usar Next.js Link para navegação interna
  return (
    <NextLink href={href} {...linkProps}>
      {children}
    </NextLink>
  );
}
