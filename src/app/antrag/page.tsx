"use client";

import { useState } from "react";
import {
  KernContainer,
  KernRow,
  KernColumn,
  KernHeading,
  KernText,
} from "@kern-ux-annex/kern-react-kit";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";

const STEPS = [
  { id: 1, title: "Start der Antrag" },
  { id: 2, title: "Unternehmen und Tätigkeit" },
  { id: 3, title: "Steuerliche Erfassung" },
  { id: 4, title: "Persönliche Daten und Adresse" },
];

const TOTAL_STEPS = STEPS.length;

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

function StepIndicator({ currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div style={{ position: "sticky", top: "2rem" }}>
      <KernHeading level={3} size="medium">
        Schritte
      </KernHeading>
      <div style={{ marginTop: "1.5rem" }}>
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isAccessible = isCompleted || isActive;

          return (
            <div
              key={step.id}
              onClick={() => isAccessible && onStepClick(step.id)}
              style={{
                padding: "0.75rem 1rem",
                marginBottom: "0.5rem",
                cursor: isAccessible ? "pointer" : "not-allowed",
                borderLeft: isActive ? "3px solid #0070F3" : "3px solid #E5E7EB",
                backgroundColor: isActive ? "#F0F9FF" : "transparent",
                transition: "all 0.2s ease",
                opacity: isAccessible ? 1 : 0.5,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isActive || isCompleted ? "#0070F3" : "#E5E7EB",
                    color: isActive || isCompleted ? "white" : "#6B7280",
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
                    color: isActive ? "#0070F3" : isAccessible ? "#374151" : "#9CA3AF",
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

interface StepContentProps {
  step: number;
}

function StepContent({ step }: StepContentProps) {
  const stepTitle = STEPS.find((s) => s.id === step)?.title || "";

  return (
    <div>
      <KernHeading level={2} size="large">
        {stepTitle}
      </KernHeading>

      <KernText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </KernText>

      <KernText>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </KernText>

      <KernText>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </KernText>

      <KernText>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
      </KernText>
    </div>
  );
}

export default function AntragPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      // Mark current step as completed before moving to next
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (step: number) => {
    // Only allow navigation to completed steps or current step
    const isAccessible = completedSteps.includes(step) || step === currentStep;
    if (isAccessible) {
      setCurrentStep(step);
    }
  };

  return (
    <>
      <Topbar />
      <Header />
      <KernContainer>
        <KernRow>
          <KernColumn sizes={{ xs: 12, md: 12, lg: 12 }}>
            <KernHeading level={1} size="x-large">
              Unternehmensanmeldung
            </KernHeading>
          </KernColumn>
        </KernRow>

        <KernRow>
          {/* Left Sidebar - Step Indicator */}
          <KernColumn sizes={{ xs: 12, md: 4, lg: 3 }}>
            <StepIndicator
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </KernColumn>

          {/* Main Content Area */}
          <KernColumn sizes={{ xs: 12, md: 8, lg: 9 }}>
            <div style={{ paddingLeft: "2rem" }}>
              <StepContent step={currentStep} />

              {/* Navigation Buttons */}
              <KernRow style={{ marginTop: "2rem" }}>
                <KernColumn sizes={12}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                      {currentStep > 1 && (
                        <SecondaryButton text="Zurück" onClick={handleBack} />
                      )}
                    </div>
                    <div>
                      {currentStep < TOTAL_STEPS ? (
                        <PrimaryButton text="Weiter" onClick={handleNext} />
                      ) : (
                        <PrimaryButton text="Antrag einreichen" onClick={() => {}} />
                      )}
                    </div>
                  </div>
                </KernColumn>
              </KernRow>
            </div>
          </KernColumn>
        </KernRow>
      </KernContainer>
      <Footer />
    </>
  );
}
