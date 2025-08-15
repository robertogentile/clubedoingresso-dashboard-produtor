import Text from "@/components/ui/Text/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ActionButtonProps {
  label: string;
  icon: IconDefinition;
  onClick: () => void;
  buttonWidth?: number;
  buttonHeight?: number;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
}

export default function ActionButton({
  label,
  icon,
  onClick,
  buttonWidth = 110,
  buttonHeight = 110,
  iconWidth = 24,
  iconHeight = 24,
  className = "",
}: ActionButtonProps) {
  const computedButtonStyle: React.CSSProperties = {
    ...(buttonWidth ? { width: `${buttonWidth}px` } : {}),
    ...(buttonHeight ? { height: `${buttonHeight}px` } : {}),
  };

  const computedIconStyle: React.CSSProperties = {
    ...(iconWidth ? { width: `${iconWidth}px` } : {}),
    ...(iconHeight ? { height: `${iconHeight}px` } : {}),
  };

  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center justify-center text-secondary hover:text-white border-2 border-secondary rounded-xl bg-white hover:bg-secondary transition-colors p-1 cursor-pointer ${className}`}
      style={computedButtonStyle}
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-secondary group-hover:text-white mb-2 transition-colors"
        style={computedIconStyle}
      />
      <Text
        size="14px"
        weight="500"
        className="text-center leading-tight min-h-[38px]"
      >
        {label}
      </Text>
    </button>
  );
}
