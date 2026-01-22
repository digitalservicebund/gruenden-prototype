"use client";

import { useState } from "react";
import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernRadioGroup,
} from "@kern-ux-annex/kern-react-kit";

export function Step5UmsatzsteuerId() {
  const [umsatzsteuerId, setUmsatzsteuerId] = useState("");

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Wollen Sie Umsatzsteuer-Identifikationsnummer beantragen?
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernText>
            Sobald Sie Leistungen oder Waren an Unternehmen in anderen EU-Ländern verkaufen, benötigen Sie eine Umsatzsteuer-Identifikationsnummer (USt-IdNr.).
          </KernText>

          <KernRadioGroup
            name="umsatzsteuerId"
            selected={umsatzsteuerId}
            items={[
              { value: "ja", label: "Ja" },
              { value: "nein", label: "Nein" },
            ]}
            onChange={(value) => setUmsatzsteuerId(value)}
          />
        </KernColumn>
      </KernRow>
    </div>
  );
}
