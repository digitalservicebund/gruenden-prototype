"use client";

import { useState } from "react";
import {
  KernHeading,
  KernRow,
  KernColumn,
  KernInput,
  KernInputDate,
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

export function Step6PersoenlicheDaten() {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Persönliche Daten und Adresse
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
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
            />
          </div>

          {/* Nachname */}
          <div className="mb-8">
            <KernInput
              id="nachname"
              label="Nachname"
              value={nachname}
              onChange={(e) => setNachname(e.target.value)}
            />
          </div>

          {/* Geburtsdatum */}
          <div className="mb-8">
            <KernInputDate
              id="geburtsdatum"
              label="Geburtsdatum"
              value={geburtsdatum}
              onChange={(e) => setGeburtsdatum(e.target.value)}
            />
          </div>

          {/* Adresse with autocomplete */}
          <div className="mb-8">
            <KernCombobox
              id="adresse"
              label="Adresse"
              options={addressOptions}
              value={adresse}
              onChange={setAdresse}
              placeholder="Beginnen Sie mit der Eingabe Ihrer Adresse..."
            />
          </div>

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
