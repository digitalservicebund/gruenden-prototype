"use client";

import { useState } from "react";
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

export function Step2UnternehmenTaetigkeit() {
  const [taetigkeit, setTaetigkeit] = useState("TODO: Dieses Feld sollte vorab ausgefüllt sein");
  const [ausfuehrung, setAusfuehrung] = useState<Ausfuehrung>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["handel"]);
  const [begonnen, setBegonnen] = useState<TaetigkeitBegonnen>("");
  const [startdatum, setStartdatum] = useState("");

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    }
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
              value={taetigkeit}
              onChange={(e) => setTaetigkeit(e.target.value)}
            />
          </div>

          {/* Die Tätigkeit wird ausgeführt */}
          <div className="mb-8">
            <KernRadioGroup
              name="ausfuehrung"
              legend="Die Tätigkeit wird ausgeführt"
              selected={ausfuehrung}
              items={ausfuehrungOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
              onChange={(value) => setAusfuehrung(value as Ausfuehrung)}
            />
          </div>

          {/* In welchem Bereich fällt dein Unternehmen? */}
          <div className="mb-8">
            <KernFieldset label="In welchem Bereich fällt dein Unternehmen?">
              <KernCheckbox
                id="industrie"
                label="Industrie (Ich produziere Waren in großem Maßstab)"
                checked={selectedCategories.includes("industrie")}
                onChange={(e) => handleCheckboxChange("industrie", e.target.checked)}
              />
              <KernCheckbox
                id="handel"
                label="Handel (Ich verkaufe Produkte weiter)"
                checked={selectedCategories.includes("handel")}
                onChange={(e) => handleCheckboxChange("handel", e.target.checked)}
              />
              <KernCheckbox
                id="handwerk"
                label="Handwerk (Ich übe ein klassisches Handwerk aus)"
                checked={selectedCategories.includes("handwerk")}
                onChange={(e) => handleCheckboxChange("handwerk", e.target.checked)}
              />
              <KernCheckbox
                id="sonstiges"
                label="Sonstiges (Ich biete Wissen oder einen Service an)"
                checked={selectedCategories.includes("sonstiges")}
                onChange={(e) => handleCheckboxChange("sonstiges", e.target.checked)}
              />
            </KernFieldset>
          </div>

          {/* Haben Sie die Tätigkeit bereits begonnen? */}
          <div className="mb-8">
            <KernRadioGroup
              name="begonnen"
              legend="Haben Sie die Tätigkeit bereits begonnen?"
              selected={begonnen}
              items={taetigkeitBegonnenOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
              onChange={(value) => setBegonnen(value as TaetigkeitBegonnen)}
            />
          </div>

          {/* Conditional date input - shown only when "Ja" is selected */}
          {begonnen === "ja" && (
            <div className="mb-8">
              <KernInputDate
                id="startdatum"
                label="Wann haben Sie die Tätigkeit begonnen?"
                value={startdatum}
                onChange={(e) => setStartdatum(e.target.value)}
              />
            </div>
          )}
        </KernColumn>
      </KernRow>
    </div>
  );
}
