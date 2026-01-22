"use client";

import {
  KernHeading,
  KernRow,
  KernColumn,
  KernInput,
  KernInputDate,
} from "@kern-ux-annex/kern-react-kit";
import { useFormData } from "@/contexts/FormContext";

export function Step6PersoenlicheDaten() {
  const { formData, updateFormData } = useFormData();

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Ihre Daten
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          {/* Vorname */}
          <div className="mb-8">
            <KernInput
              id="vorname"
              label="Vorname"
              value={formData.vorname}
              onChange={(e) => updateFormData({ vorname: e.target.value })}
            />
          </div>

          {/* Nachname */}
          <div className="mb-8">
            <KernInput
              id="nachname"
              label="Nachname"
              value={formData.nachname}
              onChange={(e) => updateFormData({ nachname: e.target.value })}
            />
          </div>

          {/* Geburtsdatum */}
          <div className="mb-8">
            <KernInputDate
              id="geburtsdatum"
              label="Geburtsdatum"
              value={formData.geburtsdatum}
              onChange={(e) => updateFormData({ geburtsdatum: e.target.value })}
              required
            />
          </div>
        </KernColumn>
      </KernRow>
    </div>
  );
}
