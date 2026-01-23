"use client";

import { useState } from "react";
import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernAlert,
  KernList,
  KernCheckbox,
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
          Wie hoch wird Ihr geschätzter Umsatz sein?
          </KernHeading>
          <KernText>
          Geben Sie hier Ihre geschätzten Einnahmen ein. Damit ist der Betrag gemeint, den Kunden für Ihre Leistungen an Sie zahlen (ohne Mehrwertsteuer).
          </KernText>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
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
              <KernHeading level={3} size="medium" className="mb-4">
                Wollen Sie die Kleinunternehmerregelung nutzen?
              </KernHeading>

              <KernAlert
                title="Achten Sie auf diese Vorraussetzungen"
                variant="info"
                className="mb-4"
                body={
                  <KernList type="bullet" items={[
                    { content: "Günstiger für Privatkunden: Sie berechnen keine Mehrwertsteuer." },
                    { content: "Einfacher Buchhaltung: Keine monatlichen Berichte an das Finanzamt nötig." },
                    { content: "Wichtig: Sie erhalten die Steuer für Ihre eigenen Einkäufe (z. B. Werkzeug) nicht zurück." },
                  ]} />
                }
              />

              <KernCheckbox
                id="kleinunternehmerregelung"
                label="Als Kleinunternehmen registeiren"
                checked={formData.kleinunternehmerregelung === "ja"}
                onChange={(e) => updateFormData({ kleinunternehmerregelung: e.target.checked ? "ja" : "nein" })}
              />
            </div>
          )}
        </KernColumn>
      </KernRow>
    </div>
  );
}
