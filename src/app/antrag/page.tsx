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
import { StepIndicator } from "@/components/StepIndicator";

const STEPS = [
  { id: 1, title: "Start der Antrag" },
  { id: 2, title: "Unternehmen und Tätigkeit" },
  { id: 3, title: "Steuerliche Erfassung" },
  { id: 4, title: "Persönliche Daten und Adresse" },
];

const TOTAL_STEPS = STEPS.length;

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
              steps={STEPS}
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
