interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
}

export function PrimaryButton({ text, onClick, disabled, icon = "arrow-forward" }: PrimaryButtonProps) {
  return (
    <button
      className="kern-btn kern-btn--primary"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="kern-label">{text}</span>
      <span className={`kern-icon kern-icon--${icon}`} aria-hidden="true"></span>
    </button>
  );
}
