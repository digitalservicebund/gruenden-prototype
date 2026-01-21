interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  iconPlacement?: "left" | "right";
}

export function PrimaryButton({ text, onClick, disabled, icon = "arrow-forward", iconPlacement = "right" }: PrimaryButtonProps) {
  const iconElement = <span className={`kern-icon kern-icon--${icon}`} aria-hidden="true"></span>;
  const labelElement = <span className="kern-label">{text}</span>;

  return (
    <button
      className="kern-btn kern-btn--primary"
      onClick={onClick}
      disabled={disabled}
    >
      {iconPlacement === "left" ? (
        <>
          {iconElement}
          {labelElement}
        </>
      ) : (
        <>
          {labelElement}
          {iconElement}
        </>
      )}
    </button>
  );
}
