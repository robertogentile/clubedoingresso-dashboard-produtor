import { ReactNode, ElementType } from "react";

interface TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "caption"
    | "label";
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "muted";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export default function Text({
  variant = "body",
  color = "primary",
  weight = "normal",
  align = "left",
  children,
  className = "",
  as,
}: TextProps) {
  const variants = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
    body: "text-sm",
    caption: "text-xs",
    label: "text-sm font-medium",
  };

  const colors = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
    muted: "text-gray-500",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Determinar o elemento HTML baseado na variante ou prop 'as'
  const defaultElements = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body: "p",
    caption: "span",
    label: "label",
  };

  const Element = as || (defaultElements[variant] as ElementType);

  const classes = `${variants[variant]} ${colors[color]} ${weights[weight]} ${alignments[align]} ${className}`;

  return <Element className={classes}>{children}</Element>;
}
