"use client";

import { useState } from "react";
import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernCheckbox,
  KernFieldset,
} from "@kern-ux-annex/kern-react-kit";
import { JahresBetraege } from "./JahresBetraege";

type WeitereGewinneValues = {
  [key: string]: {
    diesJahr: string;
    folgejahr: string;
  };
};

export function Step4GeplannterGewinn() {
  const [gewinnDiesesJahr, setGewinnDiesesJahr] = useState("");
  const [gewinnFolgejahr, setGewinnFolgejahr] = useState("");
  const [weitereGewinne, setWeitereGewinne] = useState<string[]>([]);
  const [weitereGewinneValues, setWeitereGewinneValues] = useState<WeitereGewinneValues>({});

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setWeitereGewinne((prev) => [...prev, value]);
      setWeitereGewinneValues((prev) => ({
        ...prev,
        [value]: { diesJahr: "", folgejahr: "" },
      }));
    } else {
      setWeitereGewinne((prev) => prev.filter((item) => item !== value));
      setWeitereGewinneValues((prev) => {
        const newValues = { ...prev };
        delete newValues[value];
        return newValues;
      });
    }
  };

  const handleWeitereGewinneChange = (
    key: string,
    field: "diesJahr" | "folgejahr",
    value: string
  ) => {
    setWeitereGewinneValues((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  return (
    <div>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernHeading level={2} size="large">
            Wie hoch schätzen Sie Ihre Betriebsgewinne?
          </KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
          <KernText>
            Der Gewinn ergibt sich aus: Einnahmen minus Ausgaben. Das ist das Geld, das Ihnen am Ende nach Abzug aller Betriebskosten, wie Miete oder Material, bleibt.
          </KernText>

          <JahresBetraege
            diesJahrValue={gewinnDiesesJahr}
            folgejahrValue={gewinnFolgejahr}
            onDiesJahrChange={setGewinnDiesesJahr}
            onFolgejahrChange={setGewinnFolgejahr}
            idPrefix="gewinn"
          />

          <div className="mb-8">
            <KernFieldset label="Haben Sie weitere Gewinne?">
              <KernCheckbox
                id="selbstaendige-arbeit"
                label="aus selbständiger Arbeit"
                checked={weitereGewinne.includes("selbstaendige-arbeit")}
                onChange={(e) => handleCheckboxChange("selbstaendige-arbeit", e.target.checked)}
              />
              {weitereGewinne.includes("selbstaendige-arbeit") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={weitereGewinneValues["selbstaendige-arbeit"]?.diesJahr || ""}
                    folgejahrValue={weitereGewinneValues["selbstaendige-arbeit"]?.folgejahr || ""}
                    onDiesJahrChange={(value) =>
                      handleWeitereGewinneChange("selbstaendige-arbeit", "diesJahr", value)
                    }
                    onFolgejahrChange={(value) =>
                      handleWeitereGewinneChange("selbstaendige-arbeit", "folgejahr", value)
                    }
                    idPrefix="selbstaendige-arbeit"
                  />
                </div>
              )}

              <KernCheckbox
                id="nichtselbstaendige-arbeit"
                label="aus nichtselbständiger Arbeit"
                checked={weitereGewinne.includes("nichtselbstaendige-arbeit")}
                onChange={(e) => handleCheckboxChange("nichtselbstaendige-arbeit", e.target.checked)}
              />
              {weitereGewinne.includes("nichtselbstaendige-arbeit") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={weitereGewinneValues["nichtselbstaendige-arbeit"]?.diesJahr || ""}
                    folgejahrValue={weitereGewinneValues["nichtselbstaendige-arbeit"]?.folgejahr || ""}
                    onDiesJahrChange={(value) =>
                      handleWeitereGewinneChange("nichtselbstaendige-arbeit", "diesJahr", value)
                    }
                    onFolgejahrChange={(value) =>
                      handleWeitereGewinneChange("nichtselbstaendige-arbeit", "folgejahr", value)
                    }
                    idPrefix="nichtselbstaendige-arbeit"
                  />
                </div>
              )}

              <KernCheckbox
                id="vermietung-verpachtung"
                label="aus Vermietung und Verpachtung"
                checked={weitereGewinne.includes("vermietung-verpachtung")}
                onChange={(e) => handleCheckboxChange("vermietung-verpachtung", e.target.checked)}
              />
              {weitereGewinne.includes("vermietung-verpachtung") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={weitereGewinneValues["vermietung-verpachtung"]?.diesJahr || ""}
                    folgejahrValue={weitereGewinneValues["vermietung-verpachtung"]?.folgejahr || ""}
                    onDiesJahrChange={(value) =>
                      handleWeitereGewinneChange("vermietung-verpachtung", "diesJahr", value)
                    }
                    onFolgejahrChange={(value) =>
                      handleWeitereGewinneChange("vermietung-verpachtung", "folgejahr", value)
                    }
                    idPrefix="vermietung-verpachtung"
                  />
                </div>
              )}

              <KernCheckbox
                id="sonstige-einkuenfte"
                label="aus sonstigen Einkünften (zum Beispiel Renten)"
                checked={weitereGewinne.includes("sonstige-einkuenfte")}
                onChange={(e) => handleCheckboxChange("sonstige-einkuenfte", e.target.checked)}
              />
              {weitereGewinne.includes("sonstige-einkuenfte") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={weitereGewinneValues["sonstige-einkuenfte"]?.diesJahr || ""}
                    folgejahrValue={weitereGewinneValues["sonstige-einkuenfte"]?.folgejahr || ""}
                    onDiesJahrChange={(value) =>
                      handleWeitereGewinneChange("sonstige-einkuenfte", "diesJahr", value)
                    }
                    onFolgejahrChange={(value) =>
                      handleWeitereGewinneChange("sonstige-einkuenfte", "folgejahr", value)
                    }
                    idPrefix="sonstige-einkuenfte"
                  />
                </div>
              )}

              <KernCheckbox
                id="sonderausgaben"
                label="Sonderausgaben"
                checked={weitereGewinne.includes("sonderausgaben")}
                onChange={(e) => handleCheckboxChange("sonderausgaben", e.target.checked)}
              />
              {weitereGewinne.includes("sonderausgaben") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={weitereGewinneValues["sonderausgaben"]?.diesJahr || ""}
                    folgejahrValue={weitereGewinneValues["sonderausgaben"]?.folgejahr || ""}
                    onDiesJahrChange={(value) =>
                      handleWeitereGewinneChange("sonderausgaben", "diesJahr", value)
                    }
                    onFolgejahrChange={(value) =>
                      handleWeitereGewinneChange("sonderausgaben", "folgejahr", value)
                    }
                    idPrefix="sonderausgaben"
                  />
                </div>
              )}

              <KernCheckbox
                id="steuerabzugsbetrage"
                label="Steuerabzugsbeträge"
                checked={weitereGewinne.includes("steuerabzugsbetrage")}
                onChange={(e) => handleCheckboxChange("steuerabzugsbetrage", e.target.checked)}
              />
              {weitereGewinne.includes("steuerabzugsbetrage") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={weitereGewinneValues["steuerabzugsbetrage"]?.diesJahr || ""}
                    folgejahrValue={weitereGewinneValues["steuerabzugsbetrage"]?.folgejahr || ""}
                    onDiesJahrChange={(value) =>
                      handleWeitereGewinneChange("steuerabzugsbetrage", "diesJahr", value)
                    }
                    onFolgejahrChange={(value) =>
                      handleWeitereGewinneChange("steuerabzugsbetrage", "folgejahr", value)
                    }
                    idPrefix="steuerabzugsbetrage"
                  />
                </div>
              )}
            </KernFieldset>
          </div>
        </KernColumn>
      </KernRow>
    </div>
  );
}
