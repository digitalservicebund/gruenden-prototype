"use client";

import { useState } from "react";
import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernInput,
  KernRadioGroup,
} from "@kern-ux-annex/kern-react-kit";

export function Step3GeschaetzterUmsatz() {
  const [umsatzDiesesJahr, setUmsatzDiesesJahr] = useState("");
  const [umsatzFolgejahr, setUmsatzFolgejahr] = useState("");
  const [kleinunternehmerregelung, setKleinunternehmerregelung] = useState("");
  const [hasBlurredUmsatz, setHasBlurredUmsatz] = useState(false);

  const showKleinunternehmerregelung =
    hasBlurredUmsatz && umsatzDiesesJahr !== "" && Number(umsatzDiesesJahr) < 25000;

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

          <div className="mb-8">
            <KernInput
              id="umsatz-dieses-jahr"
              label="Dieses Jahr (euro)"
              type="number"
              value={umsatzDiesesJahr}
              onChange={(e) => setUmsatzDiesesJahr(e.target.value)}
              onBlur={() => setHasBlurredUmsatz(true)}
            />
          </div>

          <div className="mb-8">
            <KernInput
              id="umsatz-folgejahr"
              label="Folgejahr (euro)"
              type="number"
              value={umsatzFolgejahr}
              onChange={(e) => setUmsatzFolgejahr(e.target.value)}
            />
          </div>

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
                selected={kleinunternehmerregelung}
                items={[
                  { value: "ja", label: "Ja" },
                  { value: "nein", label: "Nein" },
                ]}
                onChange={(value) => setKleinunternehmerregelung(value)}
              />
            </div>
          )}
        </KernColumn>
      </KernRow>
    </div>
  );
}
