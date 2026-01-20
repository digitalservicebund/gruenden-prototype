"use client";

import { useState } from "react";
import {
  KernButton,
  KernHeading,
  KernText,
  KernContainer,
  KernRadioGroup,
  KernCard,
  KernAlert,
  KernSpace,
} from "@kern-ux-annex/kern-react-kit";
import {
  type FormData,
  type Rechtsform,
  initialFormData,
  rechtsformOptions,
} from "./types";

const TOTAL_STEPS = 2;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleRechtsformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rechtsform: value as Rechtsform }));
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

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.rechtsform !== "";
    }
    return true;
  };

  const getRechtsformLabel = (value: Rechtsform | "") => {
    if (!value) return "";
    return rechtsformOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  return (
    <KernContainer>
      <KernHeading level={1}>Unternehmen anmelden</KernHeading>
      <KernText>
        Schritt {currentStep} von {TOTAL_STEPS}
      </KernText>

      <KernSpace size="l" />

      {currentStep === 1 && (
        <>
          <KernHeading level={2}>Rechtsform wählen</KernHeading>
          <KernText>
            Bitte wählen Sie die Rechtsform Ihres Unternehmens.
          </KernText>

          <KernSpace size="m" />

          <KernRadioGroup
            name="rechtsform"
            legend="Rechtsform"
            selected={formData.rechtsform}
            items={rechtsformOptions.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
            onChange={handleRechtsformChange}
          />
        </>
      )}

      {currentStep === 2 && (
        <>
          <KernHeading level={2}>Zusammenfassung</KernHeading>
          <KernText>
            Bitte überprüfen Sie Ihre Angaben.
          </KernText>

          <KernSpace size="m" />

          <KernCard
            title="Ihre Angaben"
            body={
              <>
                <KernText bold>Rechtsform:</KernText>
                <KernText>{getRechtsformLabel(formData.rechtsform)}</KernText>
              </>
            }
          />

          <KernSpace size="m" />

          <KernAlert
            title="Hinweis"
            variant="info"
            body="Dies ist ein Prototyp. In einer echten Anwendung würden hier weitere Schritte und eine Übermittlung der Daten folgen."
          />
        </>
      )}

      <KernSpace size="l" />

      <div style={{ display: "flex", gap: "1rem" }}>
        {currentStep > 1 && (
          <KernButton
            text="Zurück"
            variant="secondary"
            onClick={handleBack}
          />
        )}
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
      </div>
    </KernContainer>
  );
}
