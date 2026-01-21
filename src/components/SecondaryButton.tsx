interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
}

export function SecondaryButton({ text, onClick, disabled, icon = "arrow-back" }: SecondaryButtonProps) {
  return (
    <button
      className="kern-btn kern-btn--secondary"
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`kern-icon kern-icon--${icon}`} aria-hidden="true"></span>
      <span className="kern-label">{text}</span>
    </button>
  );
}
