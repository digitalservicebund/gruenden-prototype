"use client";

import { useState } from "react";
import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernRadioGroup,
} from "@kern-ux-annex/kern-react-kit";
import { JahresBetraege } from "./JahresBetraege";
import { useFormData } from "@/contexts/FormContext";

export function Step3GeschaetzterUmsatz() {
  const { formData, updateFormData } = useFormData();
  const [hasBlurredUmsatz, setHasBlurredUmsatz] = useState(false);

  const showKleinunternehmerregelung =
    hasBlurredUmsatz && formData.umsatzDiesesJahr !== "" && Number(formData.umsatzDiesesJahr) < 25000;

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Wie hoch schätzen Sie Ihre Umsätze?
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernText>
            Tragen Sie hier Ihre geschätzten Einnahmen ein – also alles Geld, das Kunden für Ihre Leistungen zahlen, ohne Mehrwertsteuer. Eine ungefähre Schätzung Ihrer Umsätze genügt dabei völlig.
          </KernText>

          <JahresBetraege
            diesJahrValue={formData.umsatzDiesesJahr}
            folgejahrValue={formData.umsatzFolgejahr}
            onDiesJahrChange={(value) => updateFormData({ umsatzDiesesJahr: value })}
            onFolgejahrChange={(value) => updateFormData({ umsatzFolgejahr: value })}
            onDiesJahrBlur={() => setHasBlurredUmsatz(true)}
            idPrefix="umsatz"
          />

          {showKleinunternehmerregelung && (
            <div className="mb-8">
              <KernHeading level={3} size="medium">
                Wollen Sie die Kleinunternehmerregelung nutzen?
              </KernHeading>

              <ul className="mb-4">
                <li>
                  Keine Extra-Steuer: Sie schreiben keine Umsatzsteuer auf Ihre Rechnungen und sind für Privatkunden günstiger.
                </li>
                <li>
                  Einfache Buch-Haltung: Sie müssen dem Finanzamt keine regelmäßigen Berichte über die Umsatzsteuer schicken.
                </li>
              </ul>

              <KernRadioGroup
                name="kleinunternehmerregelung"
                legend=""
                selected={formData.kleinunternehmerregelung}
                items={[
                  { value: "ja", label: "Ja" },
                  { value: "nein", label: "Nein" },
                ]}
                onChange={(value) => updateFormData({ kleinunternehmerregelung: value })}
              />
            </div>
          )}
        </KernColumn>
      </KernRow>
    </div>
  );
}
