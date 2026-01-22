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
              required
            />
          </div>
        </KernColumn>
      </KernRow>
    </div>
  );
}
