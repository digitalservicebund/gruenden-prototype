"use client";

import {
  KernHeading,
  KernRow,
  KernColumn,
  KernRadioGroup,
  KernInputDate,
} from "@kern-ux-annex/kern-react-kit";
import {
  type TaetigkeitBegonnen,
  taetigkeitBegonnenOptions,
} from "@/app/types";
import { useFormData } from "@/contexts/FormContext";
import { MockSummaryText } from "@/components/MockSummaryText";

export function Step2UnternehmenTaetigkeit() {
  const { formData, updateFormData } = useFormData();

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Ihr Unternehmen und Ihre Tätigkeit
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <MockSummaryText />
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          {/* Haben Sie die Tätigkeit bereits begonnen? */}
          <div className="mb-8">
            <KernRadioGroup
              name="begonnen"
              legend="Haben Sie die Tätigkeit bereits begonnen?"
              selected={formData.begonnen}
              items={taetigkeitBegonnenOptions.map((opt) => ({
                id: opt.value,
                value: opt.value,
                label: opt.label,
              }))}
              onChange={(value) => updateFormData({ begonnen: value as TaetigkeitBegonnen })}
            />
          </div>

          {/* Conditional date input - shown only when "Ja" is selected */}
          {formData.begonnen === "ja" && (
            <div className="mb-8">
              <KernInputDate
                required={true}
                id="startdatum"
                label="Wann haben Sie die Tätigkeit begonnen?"
                value={formData.startdatum}
                onChange={(e) => updateFormData({ startdatum: (e.target as unknown as HTMLInputElement).value })}
              />
            </div>
          )}
        </KernColumn>
      </KernRow>
    </div>
  );
}
