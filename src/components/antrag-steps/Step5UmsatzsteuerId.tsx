"use client";

import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernRadioGroup,
} from "@kern-ux-annex/kern-react-kit";
import { useFormData } from "@/contexts/FormContext";

export function Step5UmsatzsteuerId() {
  const { formData, updateFormData } = useFormData();

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Möchten Sie eine Umsatzsteuer-Identifikationsnummer beantragen?
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernText>
            Sobald Sie Leistungen oder Waren an Unternehmen in anderen EU-Ländern verkaufen, benötigen Sie eine Umsatzsteuer-Identifikationsnummer (USt-IdNr.).
          </KernText>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernRadioGroup
            name="umsatzsteuerId"
            selected={formData.umsatzsteuerId}
            items={[
              { id: "ja", value: "ja", label: "Ja" },
              { id: "nein", value: "nein", label: "Nein" },
            ]}
            onChange={(value) => updateFormData({ umsatzsteuerId: value })}
          />
        </KernColumn>
      </KernRow>
    </div>
  );
}
