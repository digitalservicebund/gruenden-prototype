"use client";

import {
  KernHeading,
  KernRow,
  KernColumn,
  KernInput,
  KernCheckbox,
} from "@kern-ux-annex/kern-react-kit";
import { KernCombobox, type ComboboxOption } from "@/components/KernCombobox";
import { useFormData } from "@/contexts/FormContext";

// Dummy address options for autocomplete
const addressOptions: ComboboxOption[] = [
  { value: "Prinzessinnenstrasse-8-14", label: "Prinzessinnenstrasse 8-14, 10969 Berlin" },
  { value: "Alexanderplatz-1", label: "Alexanderplatz 1, 10178 Berlin" },
  { value: "Unter-den-linden-77", label: "Unter den Linden 77, 10117 Berlin" },
  { value: "Friedrichstrasse-50", label: "Friedrichstrasse 50, 10117 Berlin" },
  { value: "Kurfuerstendamm-26", label: "Kurfürstendamm 26, 10719 Berlin" },
];

export function Step7Kontakt() {
  const { formData, updateFormData } = useFormData();

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Kontaktdaten
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          {/* Address Section */}
          <KernHeading level={3} size="medium" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            Adresse
          </KernHeading>

          {/* Ihre Adresse with autocomplete */}
          <div className="mb-8">
            <KernCombobox
              id="persoenliche-adresse"
              label="Ihre Adresse"
              options={addressOptions}
              value={formData.persoenlicheAdresse}
              onChange={(value) => updateFormData({ persoenlicheAdresse: value })}
              placeholder="Beginnen Sie mit der Eingabe Ihrer Adresse..."
            />
          </div>

          {/* Checkbox für Firmenadresse */}
          <div className="mb-8">
            <KernCheckbox
              id="adresse-gleich"
              label="Firmenadresse entspricht der persönlichen Adresse"
              checked={formData.adresseGleich}
              onChange={(e) => updateFormData({ adresseGleich: e.target.checked })}
            />
          </div>

          {/* Firmenadresse - nur anzeigen wenn nicht gleich */}
          {!formData.adresseGleich && (
            <div className="mb-8">
              <KernCombobox
                id="firmen-adresse"
                label="Firmenadresse"
                options={addressOptions}
                value={formData.firmenAdresse}
                onChange={(value) => updateFormData({ firmenAdresse: value })}
                placeholder="Beginnen Sie mit der Eingabe der Firmenadresse..."
              />
            </div>
          )}

          {/* Contact Information Section */}
          <KernHeading level={3} size="medium" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            Kontaktinformationen
          </KernHeading>

          {/* Email */}
          <div className="mb-8">
            <KernInput
              id="email"
              label="E-Mail-Adresse"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
            />
          </div>

          {/* Telefon */}
          <div className="mb-8">
            <KernInput
              id="telefon"
              label="Telefonnummer"
              type="tel"
              value={formData.telefon}
              onChange={(e) => updateFormData({ telefon: e.target.value })}
            />
          </div>
        </KernColumn>
      </KernRow>
    </div>
  );
}
