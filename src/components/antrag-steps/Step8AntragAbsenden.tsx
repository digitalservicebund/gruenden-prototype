"use client";

import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
} from "@kern-ux-annex/kern-react-kit";
import { useFormData } from "@/contexts/FormContext";
import { ausfuehrungOptions } from "@/app/types";
import { MockSummaryText } from "@/components/MockSummaryText";
import type { ComboboxOption } from "@/components/KernCombobox";

// Address options (should match Step7Kontakt.tsx)
const addressOptions: ComboboxOption[] = [
  { value: "Prinzessinnenstrasse-8-14", label: "Prinzessinnenstrasse 8-14, 10969 Berlin" },
  { value: "Alexanderplatz-1", label: "Alexanderplatz 1, 10178 Berlin" },
  { value: "Unter-den-linden-77", label: "Unter den Linden 77, 10117 Berlin" },
  { value: "Friedrichstrasse-50", label: "Friedrichstrasse 50, 10117 Berlin" },
  { value: "Kurfuerstendamm-26", label: "Kurfürstendamm 26, 10719 Berlin" },
];

// Helper component for displaying a data row
function DataRow({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;

  return (
    <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #e0e0e0" }}>
      <div style={{ fontWeight: "600", marginBottom: "0.25rem", color: "#333" }}>
        {label}
      </div>
      <div style={{ color: "#666" }}>{value}</div>
    </div>
  );
}

// Helper component for section headings
function SectionHeading({ title }: { title: string }) {
  return (
    <KernHeading level={3} size="medium" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
      {title}
    </KernHeading>
  );
}

export function Step8AntragAbsenden() {
  const { formData } = useFormData();

  // Helper functions to get display labels
  const getAusfuehrungLabel = () => {
    const option = ausfuehrungOptions.find((opt) => opt.value === formData.ausfuehrung);
    return option?.label || formData.ausfuehrung;
  };

  const getCategoriesLabel = () => {
    const categoryLabels: { [key: string]: string } = {
      industrie: "Industrie",
      handel: "Handel",
      handwerk: "Handwerk",
      sonstiges: "Sonstiges",
    };
    return formData.selectedCategories
      .map((cat) => categoryLabels[cat] || cat)
      .join(", ");
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const number = parseFloat(value);
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(number);
  };

  const getWeitereGewinneLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      "selbstaendige-arbeit": "Aus selbständiger Arbeit",
      "nichtselbstaendige-arbeit": "Aus nichtselbständiger Arbeit",
      "vermietung-verpachtung": "Aus Vermietung und Verpachtung",
      "sonstige-einkuenfte": "Aus sonstigen Einkünften",
      "sonderausgaben": "Sonderausgaben",
      "steuerabzugsbetrage": "Steuerabzugsbeträge",
    };
    return labels[key] || key;
  };

  const getAddressLabel = (value: string) => {
    const option = addressOptions.find((opt) => opt.value === value);
    return option?.label || value;
  };

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
          Bitte überprüfen Sie Ihre Angaben
          </KernHeading>

          <MockSummaryText />

          {/* Unternehmen und Tätigkeit */}
          <SectionHeading title="Unternehmen und Tätigkeit" />
          <DataRow label="Ausführung" value={getAusfuehrungLabel()} />
          <DataRow
            label="Tätigkeit bereits begonnen"
            value={formData.begonnen === "ja" ? "Ja" : formData.begonnen === "nein" ? "Nein" : ""}
          />
          {formData.begonnen === "ja" && (
            <DataRow label="Startdatum" value={formData.startdatum} />
          )}

          {/* Geschätzter Umsatz */}
          <SectionHeading title="Geschätzter Umsatz" />
          <DataRow
            label="Umsatz dieses Jahr"
            value={formData.umsatzDiesesJahr ? formatCurrency(formData.umsatzDiesesJahr) : ""}
          />
          <DataRow
            label="Umsatz Folgejahr"
            value={formData.umsatzFolgejahr ? formatCurrency(formData.umsatzFolgejahr) : ""}
          />
          {formData.kleinunternehmerregelung && (
            <DataRow
              label="Kleinunternehmerregelung"
              value={formData.kleinunternehmerregelung === "ja" ? "Ja" : "Nein"}
            />
          )}

          {/* Geschätzter Gewinn */}
          <SectionHeading title="Geschätzter Gewinn" />
          <DataRow
            label="Betriebsgewinn dieses Jahr"
            value={formData.gewinnDiesesJahr ? formatCurrency(formData.gewinnDiesesJahr) : ""}
          />
          <DataRow
            label="Betriebsgewinn Folgejahr"
            value={formData.gewinnFolgejahr ? formatCurrency(formData.gewinnFolgejahr) : ""}
          />

          {formData.weitereGewinne.length > 0 && (
            <>
              <div style={{ marginTop: "1rem", fontWeight: "600", color: "#333" }}>
                Weitere Gewinne:
              </div>
              {formData.weitereGewinne.map((key) => (
                <div key={key} style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                  <div style={{ fontWeight: "500", color: "#555" }}>
                    {getWeitereGewinneLabel(key)}
                  </div>
                  <div style={{ marginLeft: "1rem", color: "#666" }}>
                    <div>
                      Dieses Jahr: {formatCurrency(formData.weitereGewinneValues[key]?.diesJahr || "")}
                    </div>
                    <div>
                      Folgejahr: {formatCurrency(formData.weitereGewinneValues[key]?.folgejahr || "")}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Umsatzsteuer-Identifikationsnummer */}
          <SectionHeading title="Umsatzsteuer-Identifikationsnummer" />
          <DataRow
            label="Umsatzsteuer-ID beantragen"
            value={formData.umsatzsteuerId === "ja" ? "Ja" : formData.umsatzsteuerId === "nein" ? "Nein" : ""}
          />

          {/* Persönliche Daten */}
          <SectionHeading title="Persönliche Daten" />
          <DataRow label="Vorname" value={formData.vorname} />
          <DataRow label="Nachname" value={formData.nachname} />
          <DataRow label="Geburtsdatum" value={formData.geburtsdatum} />

          {/* Kontaktdaten */}
          <SectionHeading title="Kontaktdaten" />
          <DataRow label="Persönliche Adresse" value={formData.persoenlicheAdresse ? getAddressLabel(formData.persoenlicheAdresse) : undefined} />
          {!formData.adresseGleich && (
            <DataRow label="Firmenadresse" value={formData.firmenAdresse ? getAddressLabel(formData.firmenAdresse) : undefined} />
          )}
          {formData.adresseGleich && (
            <DataRow label="Firmenadresse" value="Gleich wie persönliche Adresse" />
          )}
          <DataRow label="E-Mail-Adresse" value={formData.email} />
          <DataRow label="Telefonnummer" value={formData.telefon} />
        </KernColumn>
      </KernRow>
    </div>
  );
}
