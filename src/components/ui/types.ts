import { ReactNode, ElementType, HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  size?: keyof typeof sizeMap;
  weight?: keyof typeof weightMap;
  align?: keyof typeof alignMap;
  color?: keyof typeof colorMap;
  className?: string;
  typeElement?: ElementType;
}

export const weightMap: Record<string, string> = {
  "100": "font-thin",
  "200": "font-extralight",
  "300": "font-light",
  "400": "font-normal",
  "500": "font-medium",
  "600": "font-semibold",
  "700": "font-bold",
  "800": "font-extrabold",
  "900": "font-black",
  normal: "font-normal",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

export const alignMap: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const sizeMap: Record<string, string> = {
  "10px": "text-10px",
  "11px": "text-11px",
  "12px": "text-12px",
  "13px": "text-13px",
  "14px": "text-14px",
  "15px": "text-15px",
  "16px": "text-16px",
  "17px": "text-17px",
  "18px": "text-18px",
  "19px": "text-19px",
  "20px": "text-20px",
  "21px": "text-21px",
  "22px": "text-22px",
  "23px": "text-23px",
  "24px": "text-24px",
  "32px": "text-32px",
  "34px": "text-34px",
  "40px": "text-40px",
  "48px": "text-48px",
  "56px": "text-56px",
  "64px": "text-64px",
  "10-12": "text-[10px] md:text-[12px]",
  "12-16": "text-[12px] md:text-[16px]",
  "12-15": "text-[12px] md:text-[15px]",
  "16-20": "text-[16px] md:text-[20px]",
  "16-20-24": "text-16px md:text-[20px] lg:text-24px",
  "24-28-34": "text-24px md:text-[28px] lg:text-34px",
  "32-40-48": "text-32px md:text-[40px] lg:text-48px",
};

export const colorMap: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  black: "text-black",
  gray: "text-gray",
  darkBlue: "text-darkBlue",
  danger: "text-danger",
  purple: "text-purple",
  success: "text-success",
  blue: "text-blue",
  lightGray: "text-lightGray",
  error: "text-error",
  muted: "text-muted",
  darkGray: "text-darkGray",
  gray400: "text-gray-400",
  gray500: "text-gray-500",
  gray800: "text-gray-800",
  grayBackground: "text-gray-background",
};
