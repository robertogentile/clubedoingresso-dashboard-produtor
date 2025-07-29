import { TextProps, weightMap, alignMap, sizeMap, colorMap } from "../types";

export default function Text({
  children,
  size,
  weight,
  align,
  color,
  className = "",
  typeElement = "div",
  ...rest
}: TextProps) {
  const sizeClass = size && sizeMap[size] ? sizeMap[size] : "";
  const weightClass = weight ? weightMap[String(weight)] ?? "" : "";
  const alignClass = align ? alignMap[align] : "";
  const colorClass = color && colorMap[color] ? colorMap[color] : "";

  const classes = [sizeClass, weightClass, alignClass, colorClass, className]
    .filter(Boolean)
    .join(" ");

  const Element = typeElement;

  return (
    <Element className={classes} {...rest}>
      {children}
    </Element>
  );
}
