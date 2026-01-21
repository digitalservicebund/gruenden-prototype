"use client";

import { useState } from "react";
import {
  KernButton,
  KernHeading,
  KernText,
  KernContainer,
  KernRow,
  KernColumn,
} from "@kern-ux-annex/kern-react-kit";
import {
  type FormData,
  type Rechtsform,
  type SideActivity,
  type HasEmployees,
  initialFormData,
} from "./types";
import { Step1Rechtsform } from "@/components/steps/Step1Rechtsform";
import { Step2Taetigkeit } from "@/components/steps/Step2Taetigkeit";
import { Step3Nebentaetigkeit } from "@/components/steps/Step3Nebentaetigkeit";
import { Step4Angestellte } from "@/components/steps/Step4Angestellte";
import { Step5Checkliste } from "@/components/steps/Step5Checkliste";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const TOTAL_STEPS = 5;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleRechtsformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rechtsform: value as Rechtsform | "" }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTaetigkeitChange = (value: string) => {
    setFormData((prev) => ({ ...prev, taetigkeit: value }));
  };

  const handleSideActivityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, isSideActivity: value as SideActivity | "" }));
  };

  const handleHasEmployeesChange = (value: string) => {
    setFormData((prev) => ({ ...prev, hasEmployees: value as HasEmployees | "" }));
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.rechtsform !== "";
    }
    if (currentStep === 2) {
      return formData.taetigkeit !== "";
    }
    if (currentStep === 3) {
      return formData.isSideActivity !== "";
    }
    if (currentStep === 4) {
      return formData.hasEmployees !== "";
    }
    return true;
  };

  return (
    <>
    <Topbar />
    <Header />
    <KernContainer>
      {/*
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernText muted>
            Schritt {currentStep} von {TOTAL_STEPS}
          </KernText>
        </KernColumn>
      </KernRow>
      */}

      {/* Step 1: Rechtsform */}
      <div style={{ display: currentStep === 1 ? "block" : "none" }}>
        <Step1Rechtsform
          formData={formData}
          onRechtsformChange={handleRechtsformChange}
        />
      </div>

      {/* Step 2: Tätigkeit */}
      <div style={{ display: currentStep === 2 ? "block" : "none" }}>
        <Step2Taetigkeit
          formData={formData}
          onTaetigkeitChange={handleTaetigkeitChange}
        />
      </div>

      {/* Step 3: Nebentätigkeit */}
      <div style={{ display: currentStep === 3 ? "block" : "none" }}>
        <Step3Nebentaetigkeit
          formData={formData}
          onSideActivityChange={handleSideActivityChange}
        />
      </div>

      {/* Step 4: Angestellte */}
      <div style={{ display: currentStep === 4 ? "block" : "none" }}>
        <Step4Angestellte
          formData={formData}
          onHasEmployeesChange={handleHasEmployeesChange}
        />
      </div>

      {/* Step 5: Checkliste & Zusammenfassung */}
      <div style={{ display: currentStep === 5 ? "block" : "none" }}>
        <Step5Checkliste formData={formData} />
      </div>

      {/* Navigation buttons */}
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernRow justify="between">
            <KernColumn sizes={6}>
              {currentStep > 1 && (
                <KernButton
                  text="Zurück"
                  variant="secondary"
                  onClick={handleBack}
                />
              )}
            </KernColumn>
            <KernColumn sizes={6} align="end">
              {currentStep < TOTAL_STEPS && (
                <KernButton
                  text="Weiter"
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceed()}
                />
              )}
              {currentStep === TOTAL_STEPS && (
                <KernButton
                  text="Absenden"
                  variant="primary"
                  onClick={() => alert("Formular abgesendet!")}
                />
              )}
            </KernColumn>
          </KernRow>
        </KernColumn>
      </KernRow>
    </KernContainer>
    <Footer />
    </>
  );
}
