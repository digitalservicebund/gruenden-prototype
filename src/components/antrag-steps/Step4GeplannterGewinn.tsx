"use client";

import { useState } from "react";
import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernCheckbox,
  KernFieldset,
} from "@kern-ux-annex/kern-react-kit";
import { JahresBetraege } from "./JahresBetraege";

export function Step4GeplannterGewinn() {
  const [gewinnDiesesJahr, setGewinnDiesesJahr] = useState("");
  const [gewinnFolgejahr, setGewinnFolgejahr] = useState("");
  const [weitereGewinne, setWeitereGewinne] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setWeitereGewinne((prev) => [...prev, value]);
    } else {
      setWeitereGewinne((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Wie hoch schätzen Sie Ihre Betriebsgewinne?
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernText>
            Der Gewinn ergibt sich aus: Einnahmen minus Ausgaben. Das ist das Geld, das Ihnen am Ende nach Abzug aller Betriebskosten, wie Miete oder Material, bleibt.
          </KernText>

          <JahresBetraege
            diesJahrValue={gewinnDiesesJahr}
            folgejahrValue={gewinnFolgejahr}
            onDiesJahrChange={setGewinnDiesesJahr}
            onFolgejahrChange={setGewinnFolgejahr}
            idPrefix="gewinn"
          />

          <div className="mb-8">
            <KernFieldset label="Haben Sie weitere Gewinne?">
              <KernCheckbox
                id="selbstaendige-arbeit"
                label="aus selbständiger Arbeit"
                checked={weitereGewinne.includes("selbstaendige-arbeit")}
                onChange={(e) => handleCheckboxChange("selbstaendige-arbeit", e.target.checked)}
              />
              <KernCheckbox
                id="nichtselbstaendige-arbeit"
                label="aus nichtselbständiger Arbeit"
                checked={weitereGewinne.includes("nichtselbstaendige-arbeit")}
                onChange={(e) => handleCheckboxChange("nichtselbstaendige-arbeit", e.target.checked)}
              />
              <KernCheckbox
                id="vermietung-verpachtung"
                label="aus Vermietung und Verpachtung"
                checked={weitereGewinne.includes("vermietung-verpachtung")}
                onChange={(e) => handleCheckboxChange("vermietung-verpachtung", e.target.checked)}
              />
              <KernCheckbox
                id="sonstige-einkuenfte"
                label="aus sonstigen Einkünften (zum Beispiel Renten)"
                checked={weitereGewinne.includes("sonstige-einkuenfte")}
                onChange={(e) => handleCheckboxChange("sonstige-einkuenfte", e.target.checked)}
              />
              <KernCheckbox
                id="sonderausgaben"
                label="Sonderausgaben"
                checked={weitereGewinne.includes("sonderausgaben")}
                onChange={(e) => handleCheckboxChange("sonderausgaben", e.target.checked)}
              />
              <KernCheckbox
                id="steuerabzugsbetrage"
                label="Steuerabzugsbeträge"
                checked={weitereGewinne.includes("steuerabzugsbetrage")}
                onChange={(e) => handleCheckboxChange("steuerabzugsbetrage", e.target.checked)}
              />
            </KernFieldset>
          </div>
        </KernColumn>
      </KernRow>
    </div>
  );
}
