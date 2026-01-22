import { KernText } from "@kern-ux-annex/kern-react-kit";

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div style={{ position: "sticky", top: "2rem" }}>
      <div style={{ marginTop: "1.5rem" }}>
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isAccessible = isCompleted || isActive;

          return (
            <div
              key={step.id}
              onClick={() => isAccessible && onStepClick(step.id)}
              style={{
                padding: "var(--kern-metric-space-default, 16px) var(--kern-metric-space-default, 16px)",
                marginBottom: "var(--kern-metric-space-small, 8px)",
                cursor: isAccessible ? "pointer" : "not-allowed",
                borderLeft: isActive
                  ? "3px solid var(--kern-color-action-default, #1A3DA5)"
                  : "3px solid var(--kern-color-layout-border, #E5E7EB)",
                backgroundColor: "transparent",
                transition: "all 0.2s ease",
                opacity: isAccessible ? 1 : 0.5,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--kern-metric-space-default, 16px)" }}>
                <div
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isActive || isCompleted
                      ? "var(--kern-color-action-default, #1A3DA5)"
                      : "var(--kern-color-layout-border, #E5E7EB)",
                    color: isActive || isCompleted
                      ? "var(--kern-color-action-on-default, #FFF)"
                      : "var(--kern-color-layout-text-muted, #6B7280)",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {step.id}
                </div>
                <KernText
                  style={{
                    margin: 0,
                    fontWeight: isActive ? "bold" : "normal",
                    color: isActive
                      ? "var(--kern-color-action-default, #1A3DA5)"
                      : isAccessible
                        ? "var(--kern-color-layout-text-default)"
                        : "var(--kern-color-layout-text-muted)",
                  }}
                >
                  {step.title}
                </KernText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
