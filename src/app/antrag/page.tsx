"use client";

import { useState } from "react";
import {
  KernContainer,
  KernRow,
  KernColumn,
  KernHeading,
} from "@kern-ux-annex/kern-react-kit";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { StepIndicator } from "@/components/StepIndicator";
import { Step2UnternehmenTaetigkeit } from "@/components/antrag-steps/Step2UnternehmenTaetigkeit";
import { Step3GeschaetzterUmsatz } from "@/components/antrag-steps/Step3GeschaetzterUmsatz";
import { Step4GeplannterGewinn } from "@/components/antrag-steps/Step4GeplannterGewinn";
import { Step5UmsatzsteuerId } from "@/components/antrag-steps/Step5UmsatzsteuerId";
import { Step6PersoenlicheDaten } from "@/components/antrag-steps/Step6PersoenlicheDaten";
import { Step7Kontakt } from "@/components/antrag-steps/Step7Kontakt";
import { Step8AntragAbsenden } from "@/components/antrag-steps/Step8AntragAbsenden";
import { FormProvider } from "@/contexts/FormContext";

const STEPS = [
  { id: 1, title: "Unternehmen und Tätigkeit" },
  { id: 2, title: "Geschätzter Umsatz" },
  { id: 3, title: "Geschätzter Gewinn" },
  { id: 4, title: "Umsatzsteuer-Identifikationsnummer" },
  { id: 5, title: "Ihre Daten" },
  { id: 6, title: "Kontaktdaten" },
  { id: 7, title: "Antrag absenden" },
];

const TOTAL_STEPS = STEPS.length;

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
    <FormProvider>
      <Topbar />
      <Header />
      <KernContainer>
        <KernRow>
          <KernColumn sizes={{ xs: 12, md: 12, lg: 12 }}>
            <KernHeading level={1} size="x-large">
            Kombiantrag: Gewerbe & Steuern
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
              {/* Step 1 */}
              <div style={{ display: currentStep === 1 ? "block" : "none" }}>
                <Step2UnternehmenTaetigkeit />
              </div>

              {/* Step 2 */}
              <div style={{ display: currentStep === 2 ? "block" : "none" }}>
                <Step3GeschaetzterUmsatz />
              </div>

              {/* Step 3 */}
              <div style={{ display: currentStep === 3 ? "block" : "none" }}>
                <Step4GeplannterGewinn />
              </div>

              {/* Step 4 */}
              <div style={{ display: currentStep === 4 ? "block" : "none" }}>
                <Step5UmsatzsteuerId />
              </div>

              {/* Step 5 */}
              <div style={{ display: currentStep === 5 ? "block" : "none" }}>
                <Step6PersoenlicheDaten />
              </div>

              {/* Step 6 */}
              <div style={{ display: currentStep === 6 ? "block" : "none" }}>
                <Step7Kontakt />
              </div>

              {/* Step 7 */}
              <div style={{ display: currentStep === 7 ? "block" : "none" }}>
                <Step8AntragAbsenden />
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8">
                <KernRow>
                  <KernColumn sizes={12}>
                    <div style={{ display: "flex", gap: "16px" }}>
                      {currentStep > 1 && (
                        <SecondaryButton text="Zurück" onClick={handleBack} />
                      )}
                      {currentStep < TOTAL_STEPS ? (
                        <PrimaryButton text="Weiter" onClick={handleNext} />
                      ) : (
                        <PrimaryButton text="Antrag einreichen" onClick={() => {}} />
                      )}
                    </div>
                  </KernColumn>
                </KernRow>
              </div>
            </div>
          </KernColumn>
        </KernRow>
      </KernContainer>
      <Footer />
    </FormProvider>
  );
}
