"use client";

import { useState } from "react";
import {
  KernHeading,
  KernRow,
  KernColumn,
  KernInput,
  KernInputDate,
} from "@kern-ux-annex/kern-react-kit";

export function Step6PersoenlicheDaten() {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [strasse, setStrasse] = useState("");
  const [hausnummer, setHausnummer] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
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

          {/* Straße */}
          <div className="mb-8">
            <KernInput
              id="strasse"
              label="Straße"
              value={strasse}
              onChange={(e) => setStrasse(e.target.value)}
            />
          </div>

          {/* Hausnummer */}
          <div className="mb-8">
            <KernInput
              id="hausnummer"
              label="Hausnummer"
              value={hausnummer}
              onChange={(e) => setHausnummer(e.target.value)}
            />
          </div>

          {/* PLZ */}
          <div className="mb-8">
            <KernInput
              id="plz"
              label="Postleitzahl"
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
            />
          </div>

          {/* Ort */}
          <div className="mb-8">
            <KernInput
              id="ort"
              label="Ort"
              value={ort}
              onChange={(e) => setOrt(e.target.value)}
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
