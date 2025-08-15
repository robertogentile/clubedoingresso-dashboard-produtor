import Text from "@/components/ui/Text/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface ButtonBackProps {
  label: string;
  sizeLabel?: string;
  onClick: () => void;
  className?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconClassName?: string;
}

export default function ButtonBack({
  label,
  sizeLabel = "14px",
  onClick,
  className = "",
  iconWidth = 20,
  iconHeight = 20,
  iconClassName = "",
}: ButtonBackProps) {
  const iconStyle: React.CSSProperties = {
    width: `${iconWidth}px`,
    height: `${iconHeight}px`,
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-primary cursor-pointer mb-4 ${className}`}
    >
      <FontAwesomeIcon
        icon={faChevronLeft}
        className={`text-primary mr-2 ${iconClassName}`}
        style={iconStyle}
      />
      <Text size={sizeLabel} weight="700">
        {label}
      </Text>
    </button>
  );
}
