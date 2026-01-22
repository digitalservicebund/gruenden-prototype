"use client";

import {
  KernHeading,
  KernRow,
  KernColumn,
  KernRadioGroup,
  KernInputDate,
  KernInput,
  KernCheckbox,
  KernFieldset,
} from "@kern-ux-annex/kern-react-kit";
import {
  type Ausfuehrung,
  type TaetigkeitBegonnen,
  ausfuehrungOptions,
  taetigkeitBegonnenOptions,
} from "@/app/types";
import { useFormData } from "@/contexts/FormContext";

export function Step2UnternehmenTaetigkeit() {
  const { formData, updateFormData } = useFormData();

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newCategories = checked
      ? [...formData.selectedCategories, value]
      : formData.selectedCategories.filter((item) => item !== value);
    updateFormData({ selectedCategories: newCategories });
  };

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
          {/* Welche Tätigkeit werden Sie ausüben? */}
          <div className="mb-8">
            <KernInput
              id="taetigkeit"
              label="Welche Tätigkeit werden Sie ausüben?"
              value={formData.taetigkeit}
              onChange={(e) => updateFormData({ taetigkeit: e.target.value })}
            />
          </div>

          {/* Die Tätigkeit wird ausgeführt */}
          <div className="mb-8">
            <KernRadioGroup
              name="ausfuehrung"
              legend="Die Tätigkeit wird ausgeführt"
              selected={formData.ausfuehrung}
              items={ausfuehrungOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
              onChange={(value) => updateFormData({ ausfuehrung: value as Ausfuehrung })}
            />
          </div>

          {/* In welchem Bereich fällt dein Unternehmen? */}
          <div className="mb-8">
            <KernFieldset label="In welchem Bereich fällt dein Unternehmen?">
              <KernCheckbox
                id="industrie"
                label="Industrie (Ich produziere Waren in großem Maßstab)"
                checked={formData.selectedCategories.includes("industrie")}
                onChange={(e) => handleCheckboxChange("industrie", e.target.checked)}
              />
              <KernCheckbox
                id="handel"
                label="Handel (Ich verkaufe Produkte weiter)"
                checked={formData.selectedCategories.includes("handel")}
                onChange={(e) => handleCheckboxChange("handel", e.target.checked)}
              />
              <KernCheckbox
                id="handwerk"
                label="Handwerk (Ich übe ein klassisches Handwerk aus)"
                checked={formData.selectedCategories.includes("handwerk")}
                onChange={(e) => handleCheckboxChange("handwerk", e.target.checked)}
              />
              <KernCheckbox
                id="sonstiges"
                label="Sonstiges (Ich biete Wissen oder einen Service an)"
                checked={formData.selectedCategories.includes("sonstiges")}
                onChange={(e) => handleCheckboxChange("sonstiges", e.target.checked)}
              />
            </KernFieldset>
          </div>

          {/* Haben Sie die Tätigkeit bereits begonnen? */}
          <div className="mb-8">
            <KernRadioGroup
              name="begonnen"
              legend="Haben Sie die Tätigkeit bereits begonnen?"
              selected={formData.begonnen}
              items={taetigkeitBegonnenOptions.map((opt) => ({
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
                id="startdatum"
                label="Wann haben Sie die Tätigkeit begonnen?"
                value={formData.startdatum}
                onChange={(e) => updateFormData({ startdatum: e.target.value })}
              />
            </div>
          )}
        </KernColumn>
      </KernRow>
    </div>
  );
}
