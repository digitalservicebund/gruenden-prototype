"use client";

import { useState } from "react";
import {
  KernButton,
  KernHeading,
  KernText,
  KernContainer,
  KernRow,
  KernColumn,
  KernRadioGroup,
  KernCard,
  KernAlert,
} from "@kern-ux-annex/kern-react-kit";
import { KernCombobox } from "@/components/KernCombobox";
import {
  type FormData,
  type Rechtsform,
  type SideActivity,
  type HasEmployees,
  initialFormData,
  rechtsformOptions,
  taetigkeitOptions,
  sideActivityOptions,
  hasEmployeesOptions,
} from "./types";

const TOTAL_STEPS = 5;

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

  const handleTaetigkeitChange = (value: string) => {
    setFormData((prev) => ({ ...prev, taetigkeit: value }));
  };

  const handleSideActivityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, isSideActivity: value as SideActivity }));
  };

  const handleHasEmployeesChange = (value: string) => {
    setFormData((prev) => ({ ...prev, hasEmployees: value as HasEmployees }));
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

  const getRechtsformLabel = (value: Rechtsform | "") => {
    if (!value) return "";
    return rechtsformOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  const getTaetigkeitLabel = (value: string) => {
    if (!value) return "";
    return taetigkeitOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  const getSideActivityLabel = (value: SideActivity) => {
    if (!value) return "";
    return sideActivityOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  const getHasEmployeesLabel = (value: HasEmployees) => {
    if (!value) return "";
    return hasEmployeesOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  return (
    <KernContainer>
      {/* Header */}
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={1}>Unternehmen anmelden</KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernText muted>
            Schritt {currentStep} von {TOTAL_STEPS}
          </KernText>
        </KernColumn>
      </KernRow>

      {/* Step 1: Rechtsform */}
      {currentStep === 1 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Rechtsform wählen</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Bitte wählen Sie die Rechtsform Ihres Unternehmens.
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
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
            </KernColumn>
          </KernRow>
        </>
      )}

      {/* Step 2: Tätigkeit */}
      {currentStep === 2 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Tätigkeit des Unternehmens</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Womit wird sich Ihr neues Unternehmen beschäftigen?
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernCombobox
                id="taetigkeit"
                label="Tätigkeit"
                options={taetigkeitOptions}
                value={formData.taetigkeit}
                onChange={handleTaetigkeitChange}
                placeholder="Tätigkeit eingeben..."
                hint="Beginnen Sie mit der Eingabe und wählen Sie eine Option aus der Liste."
                required
              />
            </KernColumn>
          </KernRow>
        </>
      )}

      {/* Step 3: Nebentätigkeit */}
      {currentStep === 3 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Nebentätigkeit</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Wird dein Startup erstmal eine Nebentätigkeit sein?
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernRadioGroup
                name="isSideActivity"
                legend="Nebentätigkeit"
                selected={formData.isSideActivity}
                items={sideActivityOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                onChange={handleSideActivityChange}
              />
            </KernColumn>
          </KernRow>

          {formData.isSideActivity === "yes" && (
            <KernRow>
              <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                <KernAlert
                  title="Gut zu wissen"
                  variant="info"
                  body="Sie bleiben über Ihren Hauptjob krankenversichert. Dadurch sparen Sie hohe zusätzliche Kosten für Ihre Versicherung. Das gilt aber nur, wenn Sie maximal 20 Stunden pro Woche für Ihr neues Unternehmen arbeiten."
                />
              </KernColumn>
            </KernRow>
          )}
        </>
      )}

      {/* Step 4: Angestellte */}
      {currentStep === 4 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Angestellte</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Startest du mit oder ohne Angestellten?
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernRadioGroup
                name="hasEmployees"
                legend="Angestellte"
                selected={formData.hasEmployees}
                items={hasEmployeesOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                onChange={handleHasEmployeesChange}
              />
            </KernColumn>
          </KernRow>
        </>
      )}

      {/* Step 5: Zusammenfassung */}
      {currentStep === 5 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Zusammenfassung</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Bitte überprüfen Sie Ihre Angaben.
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernCard
                title="Ihre Angaben"
                body={
                  <KernContainer>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Rechtsform:</KernText>
                        <KernText>{getRechtsformLabel(formData.rechtsform)}</KernText>
                      </KernColumn>
                    </KernRow>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Tätigkeit:</KernText>
                        <KernText>{getTaetigkeitLabel(formData.taetigkeit)}</KernText>
                      </KernColumn>
                    </KernRow>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Nebentätigkeit:</KernText>
                        <KernText>{getSideActivityLabel(formData.isSideActivity)}</KernText>
                      </KernColumn>
                    </KernRow>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Angestellte:</KernText>
                        <KernText>{getHasEmployeesLabel(formData.hasEmployees)}</KernText>
                      </KernColumn>
                    </KernRow>
                  </KernContainer>
                }
              />
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernAlert
                title="Hinweis"
                variant="info"
                body="Dies ist ein Prototyp. In einer echten Anwendung würden hier weitere Schritte und eine Übermittlung der Daten folgen."
              />
            </KernColumn>
          </KernRow>
        </>
      )}

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
  );
}
