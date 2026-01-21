interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  iconPlacement?: "left" | "right";
}

export function SecondaryButton({ text, onClick, disabled, icon = "arrow-back", iconPlacement = "left" }: SecondaryButtonProps) {
  const iconElement = <span className={`kern-icon kern-icon--${icon}`} aria-hidden="true"></span>;
  const labelElement = <span className="kern-label">{text}</span>;

  return (
    <button
      className="kern-btn kern-btn--secondary"
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
