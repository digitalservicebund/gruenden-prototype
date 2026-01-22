"use client";

import { useState } from "react";
import {
  KernHeading,
  KernRow,
  KernColumn,
  KernInput,
  KernCheckbox,
} from "@kern-ux-annex/kern-react-kit";
import { KernCombobox, type ComboboxOption } from "@/components/KernCombobox";

// Dummy address options for autocomplete
const addressOptions: ComboboxOption[] = [
  { value: "prinzessinnenstrasse-8-14", label: "Prinzessinnenstrasse 8-14, 10969 Berlin" },
  { value: "alexanderplatz-1", label: "Alexanderplatz 1, 10178 Berlin" },
  { value: "unter-den-linden-77", label: "Unter den Linden 77, 10117 Berlin" },
  { value: "friedrichstrasse-50", label: "Friedrichstrasse 50, 10117 Berlin" },
  { value: "kurfuerstendamm-26", label: "Kurfürstendamm 26, 10719 Berlin" },
];

export function Step7Kontakt() {
  const [persoenlicheAdresse, setPersoenlicheAdresse] = useState("");
  const [adresseGleich, setAdresseGleich] = useState(true);
  const [firmenAdresse, setFirmenAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");

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
              value={persoenlicheAdresse}
              onChange={setPersoenlicheAdresse}
              placeholder="Beginnen Sie mit der Eingabe Ihrer Adresse..."
            />
          </div>

          {/* Checkbox für Firmenadresse */}
          <div className="mb-8">
            <KernCheckbox
              id="adresse-gleich"
              label="Firmenadresse ist gleich wie persönliche Adresse"
              checked={adresseGleich}
              onChange={(e) => setAdresseGleich(e.target.checked)}
            />
          </div>

          {/* Firmenadresse - nur anzeigen wenn nicht gleich */}
          {!adresseGleich && (
            <div className="mb-8">
              <KernCombobox
                id="firmen-adresse"
                label="Firmenadresse"
                options={addressOptions}
                value={firmenAdresse}
                onChange={setFirmenAdresse}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Telefon */}
          <div className="mb-8">
            <KernInput
              id="telefon"
              label="Telefonnummer"
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
            />
          </div>
        </KernColumn>
      </KernRow>
    </div>
  );
}
