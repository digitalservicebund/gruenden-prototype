"use client";

import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernCheckbox,
  KernFieldset,
} from "@kern-ux-annex/kern-react-kit";
import { JahresBetraege } from "./JahresBetraege";
import { useFormData } from "@/contexts/FormContext";

export function Step4GeplannterGewinn() {
  const { formData, updateFormData } = useFormData();

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      updateFormData({
        weitereGewinne: [...formData.weitereGewinne, value],
        weitereGewinneValues: {
          ...formData.weitereGewinneValues,
          [value]: { diesJahr: "", folgejahr: "" },
        },
      });
    } else {
      const newValues = { ...formData.weitereGewinneValues };
      delete newValues[value];
      updateFormData({
        weitereGewinne: formData.weitereGewinne.filter((item) => item !== value),
        weitereGewinneValues: newValues,
      });
    }
  };

  const handleWeitereGewinneChange = (
    key: string,
    field: "diesJahr" | "folgejahr",
    value: string
  ) => {
    updateFormData({
      weitereGewinneValues: {
        ...formData.weitereGewinneValues,
        [key]: {
          ...formData.weitereGewinneValues[key],
          [field]: value,
        },
      },
    });
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
            diesJahrValue={formData.gewinnDiesesJahr}
            folgejahrValue={formData.gewinnFolgejahr}
            onDiesJahrChange={(value) => updateFormData({ gewinnDiesesJahr: value })}
            onFolgejahrChange={(value) => updateFormData({ gewinnFolgejahr: value })}
            idPrefix="gewinn"
          />

          <div className="mb-8">
            <KernFieldset label="Haben Sie weitere Gewinne?">
              <KernCheckbox
                id="selbstaendige-arbeit"
                label="aus selbständiger Arbeit"
                checked={formData.weitereGewinne.includes("selbstaendige-arbeit")}
                onChange={(e) => handleCheckboxChange("selbstaendige-arbeit", e.target.checked)}
              />
              {formData.weitereGewinne.includes("selbstaendige-arbeit") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={formData.weitereGewinneValues["selbstaendige-arbeit"]?.diesJahr || ""}
                    folgejahrValue={formData.weitereGewinneValues["selbstaendige-arbeit"]?.folgejahr || ""}
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
                checked={formData.weitereGewinne.includes("nichtselbstaendige-arbeit")}
                onChange={(e) => handleCheckboxChange("nichtselbstaendige-arbeit", e.target.checked)}
              />
              {formData.weitereGewinne.includes("nichtselbstaendige-arbeit") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={formData.weitereGewinneValues["nichtselbstaendige-arbeit"]?.diesJahr || ""}
                    folgejahrValue={formData.weitereGewinneValues["nichtselbstaendige-arbeit"]?.folgejahr || ""}
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
                checked={formData.weitereGewinne.includes("vermietung-verpachtung")}
                onChange={(e) => handleCheckboxChange("vermietung-verpachtung", e.target.checked)}
              />
              {formData.weitereGewinne.includes("vermietung-verpachtung") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={formData.weitereGewinneValues["vermietung-verpachtung"]?.diesJahr || ""}
                    folgejahrValue={formData.weitereGewinneValues["vermietung-verpachtung"]?.folgejahr || ""}
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
                checked={formData.weitereGewinne.includes("sonstige-einkuenfte")}
                onChange={(e) => handleCheckboxChange("sonstige-einkuenfte", e.target.checked)}
              />
              {formData.weitereGewinne.includes("sonstige-einkuenfte") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={formData.weitereGewinneValues["sonstige-einkuenfte"]?.diesJahr || ""}
                    folgejahrValue={formData.weitereGewinneValues["sonstige-einkuenfte"]?.folgejahr || ""}
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
                checked={formData.weitereGewinne.includes("sonderausgaben")}
                onChange={(e) => handleCheckboxChange("sonderausgaben", e.target.checked)}
              />
              {formData.weitereGewinne.includes("sonderausgaben") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={formData.weitereGewinneValues["sonderausgaben"]?.diesJahr || ""}
                    folgejahrValue={formData.weitereGewinneValues["sonderausgaben"]?.folgejahr || ""}
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
                checked={formData.weitereGewinne.includes("steuerabzugsbetrage")}
                onChange={(e) => handleCheckboxChange("steuerabzugsbetrage", e.target.checked)}
              />
              {formData.weitereGewinne.includes("steuerabzugsbetrage") && (
                <div className="ml-8 mb-4">
                  <JahresBetraege
                    diesJahrValue={formData.weitereGewinneValues["steuerabzugsbetrage"]?.diesJahr || ""}
                    folgejahrValue={formData.weitereGewinneValues["steuerabzugsbetrage"]?.folgejahr || ""}
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
