"use client";

import { useState } from "react";
import {
  KernButton,
  KernHeading,
  KernText,
  KernRadioGroup,
  KernRow,
  KernColumn,
  KernAlert,
} from "@kern-ux-annex/kern-react-kit";
import type { Rechtsform } from "@/app/types";
import styles from "./RechtsformHelper.module.css";

interface RechtsformHelperProps {
  onSelect: (value: Rechtsform) => void;
}

type FounderCount = "alone" | "multiple" | "";
type LiabilityPreference = "limited" | "unlimited" | "";
type CapitalAvailable = "minimal" | "medium" | "high" | "";

interface HelperFormData {
  founderCount: FounderCount;
  liabilityPreference: LiabilityPreference;
  capitalAvailable: CapitalAvailable;
}

const initialHelperData: HelperFormData = {
  founderCount: "",
  liabilityPreference: "",
  capitalAvailable: "",
};

export function RechtsformHelper({ onSelect }: RechtsformHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<HelperFormData>(initialHelperData);

  const handleOpen = () => {
    setIsOpen(true);
    setStep(1);
    setFormData(initialHelperData);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getRecommendation = (): { rechtsform: Rechtsform; reason: string } => {
    const { founderCount, liabilityPreference, capitalAvailable } = formData;

    // Solo founder
    if (founderCount === "alone") {
      if (liabilityPreference === "limited") {
        if (capitalAvailable === "high") {
          return {
            rechtsform: "gmbh",
            reason: "Als Einzelgründer mit dem Wunsch nach Haftungsbeschränkung und ausreichend Kapital ist die GmbH ideal.",
          };
        }
        return {
          rechtsform: "ug",
          reason: "Als Einzelgründer mit dem Wunsch nach Haftungsbeschränkung, aber wenig Startkapital, ist die UG (Mini-GmbH) perfekt.",
        };
      }
      return {
        rechtsform: "einzelunternehmen",
        reason: "Als Einzelgründer ohne besondere Haftungsanforderungen ist das Einzelunternehmen am einfachsten zu gründen.",
      };
    }

    // Multiple founders
    if (liabilityPreference === "limited") {
      if (capitalAvailable === "high") {
        return {
          rechtsform: "gmbh",
          reason: "Mit mehreren Gründern, Haftungsbeschränkung und ausreichend Kapital ist die GmbH die beste Wahl.",
        };
      }
      return {
        rechtsform: "ug",
        reason: "Mit mehreren Gründern und dem Wunsch nach Haftungsbeschränkung, aber wenig Kapital, empfehlen wir die UG.",
      };
    }

    // Multiple founders, unlimited liability
    if (capitalAvailable === "minimal") {
      return {
        rechtsform: "gbr",
        reason: "Für ein Team mit wenig Startkapital und ohne Haftungsbeschränkung ist die GbR am einfachsten.",
      };
    }

    return {
      rechtsform: "ohg",
      reason: "Für ein Gründerteam im Handel ohne Haftungsbeschränkung eignet sich die OHG.",
    };
  };

  const canProceed = () => {
    if (step === 1) return formData.founderCount !== "";
    if (step === 2) return formData.liabilityPreference !== "";
    if (step === 3) return formData.capitalAvailable !== "";
    return true;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAcceptRecommendation = () => {
    const { rechtsform } = getRecommendation();
    onSelect(rechtsform);
    handleClose();
  };

  if (!isOpen) {
    return (
      <KernButton
        text="Hilfe bei der Auswahl"
        variant="tertiary"
        onClick={handleOpen}
      />
    );
  }

  const recommendation = step === 4 ? getRecommendation() : null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <KernRow>
          <KernColumn sizes={12}>
            <KernHeading level={2}>Welche Rechtsform passt zu dir?</KernHeading>
          </KernColumn>
        </KernRow>

        <KernRow>
          <KernColumn sizes={12}>
            <KernText muted>Frage {Math.min(step, 3)} von 3</KernText>
          </KernColumn>
        </KernRow>

        {step === 1 && (
          <KernRow>
            <KernColumn sizes={12}>
              <KernRadioGroup
                name="founderCount"
                legend="Gründest du alleine oder im Team?"
                selected={formData.founderCount}
                items={[
                  { value: "alone", label: "Ich gründe alleine" },
                  { value: "multiple", label: "Wir gründen im Team" },
                ]}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, founderCount: value as FounderCount }))
                }
              />
            </KernColumn>
          </KernRow>
        )}

        {step === 2 && (
          <KernRow>
            <KernColumn sizes={12}>
              <KernRadioGroup
                name="liabilityPreference"
                legend="Möchtest du dein Privatvermögen schützen (Haftungsbeschränkung)?"
                selected={formData.liabilityPreference}
                items={[
                  { value: "limited", label: "Ja, Haftungsbeschränkung ist wichtig" },
                  { value: "unlimited", label: "Nein, nicht notwendig" },
                ]}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, liabilityPreference: value as LiabilityPreference }))
                }
              />
            </KernColumn>
          </KernRow>
        )}

        {step === 3 && (
          <KernRow>
            <KernColumn sizes={12}>
              <KernRadioGroup
                name="capitalAvailable"
                legend="Wie viel Startkapital hast du zur Verfügung?"
                selected={formData.capitalAvailable}
                items={[
                  { value: "minimal", label: "Wenig (unter 1.000 €)" },
                  { value: "medium", label: "Mittel (1.000 € - 25.000 €)" },
                  { value: "high", label: "Ausreichend (über 25.000 €)" },
                ]}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, capitalAvailable: value as CapitalAvailable }))
                }
              />
            </KernColumn>
          </KernRow>
        )}

        {step === 4 && recommendation && (
          <>
            <KernRow>
              <KernColumn sizes={12}>
                <KernAlert
                  title="Unsere Empfehlung"
                  variant="success"
                  body={recommendation.reason}
                />
              </KernColumn>
            </KernRow>

            <KernRow>
              <KernColumn sizes={12}>
                <KernText bold>
                  Empfohlene Rechtsform:{" "}
                  {recommendation.rechtsform === "einzelunternehmen" && "Einzelunternehmen"}
                  {recommendation.rechtsform === "gmbh" && "GmbH"}
                  {recommendation.rechtsform === "ug" && "UG (haftungsbeschränkt)"}
                  {recommendation.rechtsform === "gbr" && "GbR"}
                  {recommendation.rechtsform === "ohg" && "OHG"}
                </KernText>
              </KernColumn>
            </KernRow>
          </>
        )}

        <KernRow justify="between">
          <KernColumn sizes={6}>
            {step > 1 && step < 4 && (
              <KernButton
                text="Zurück"
                variant="secondary"
                onClick={handleBack}
              />
            )}
            {step === 4 && (
              <KernButton
                text="Abbrechen"
                variant="secondary"
                onClick={handleClose}
              />
            )}
            {step === 1 && (
              <KernButton
                text="Abbrechen"
                variant="secondary"
                onClick={handleClose}
              />
            )}
          </KernColumn>
          <KernColumn sizes={6} align="end">
            {step < 3 && (
              <KernButton
                text="Weiter"
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
              />
            )}
            {step === 3 && (
              <KernButton
                text="Empfehlung anzeigen"
                variant="primary"
                onClick={() => setStep(4)}
                disabled={!canProceed()}
              />
            )}
            {step === 4 && (
              <KernButton
                text="Empfehlung übernehmen"
                variant="primary"
                onClick={handleAcceptRecommendation}
              />
            )}
          </KernColumn>
        </KernRow>
      </div>
    </div>
  );
}

export default RechtsformHelper;
