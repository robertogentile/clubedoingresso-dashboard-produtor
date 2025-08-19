import { ButtonHTMLAttributes } from "react";

interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
}

export default function Switch({
  checked,
  onChange,
  size = "md",
  disabled = false,
  className = "",
  ...props
}: SwitchProps) {
  const sizes = {
    sm: {
      track: "w-[44px] h-[24px]",
      knob: "w-[18px] h-[18px]",
      translate: "translate-x-[20px]",
    },
    md: {
      track: "w-[64px] h-[36px]",
      knob: "w-[28px] h-[28px]",
      translate: "translate-x-[28px]",
    },
  } as const;

  const dims = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-secondary" : "bg-gray-200"
      } ${dims.track} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      {...props}
    >
      <span
        className={`absolute left-[4px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? dims.translate : "translate-x-0"
        } ${dims.knob}`}
      />
      <span className="sr-only">Alternar</span>
    </button>
  );
}
