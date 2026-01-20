"use client";

import { useState } from "react";
import {
  KernButton,
  KernHeading,
  KernText,
  KernContainer,
  KernRow,
  KernColumn,
  KernRadioGroup,
  KernCard,
  KernAlert,
} from "@kern-ux-annex/kern-react-kit";
import { KernCombobox } from "@/components/KernCombobox";
import { RechtsformHelper } from "@/components/RechtsformHelper";
import { CustomCard } from "@/components/CustomCard";
import {
  type FormData,
  type Rechtsform,
  type SideActivity,
  type HasEmployees,
  type TaetigkeitOption,
  initialFormData,
  rechtsformOptions,
  taetigkeitOptions,
  sideActivityOptions,
  hasEmployeesOptions,
} from "./types";

const TOTAL_STEPS = 6;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showHelp, setShowHelp] = useState(false);
  const [helpDescription, setHelpDescription] = useState("");
  const [recommendations, setRecommendations] = useState<TaetigkeitOption[]>([]);

  const handleRechtsformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rechtsform: value as Rechtsform }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTaetigkeitChange = (value: string) => {
    setFormData((prev) => ({ ...prev, taetigkeit: value }));
  };

  const handleHelpClick = () => {
    setShowHelp(true);
    setHelpDescription("");
    setRecommendations([]);
  };

  const handleHelpClose = () => {
    setShowHelp(false);
    setHelpDescription("");
    setRecommendations([]);
  };

  const mockGetRecommendations = (description: string): TaetigkeitOption[] => {
    const lowerDesc = description.toLowerCase().trim();
    const scored: Array<{ option: TaetigkeitOption; score: number }> = [];

    // If description is empty, return empty array
    if (!lowerDesc) {
      return [];
    }

    taetigkeitOptions.forEach((option) => {
      let score = 0;
      const lowerLabel = option.label.toLowerCase();
      const lowerValue = option.value.toLowerCase();

      // Exact matches get highest score
      if (lowerDesc.includes(lowerValue) || lowerDesc.includes(lowerLabel)) {
        score += 10;
      }

      // Keyword matching for ice cream related businesses
      if (lowerValue === "eisanbieter" || lowerValue === "eiscafe" || lowerValue === "eisdiele") {
        if (lowerDesc.includes("eis") || lowerDesc.includes("ice cream") || lowerDesc.includes("eisdiele") || lowerDesc.includes("eiscafé")) {
          score += 8;
        }
        if (lowerDesc.includes("cafe") || lowerDesc.includes("café") || lowerDesc.includes("kaffee") || lowerDesc.includes("coffee")) {
          if (lowerValue === "eiscafe") score += 5;
        }
        if (lowerDesc.includes("verkauf") || lowerDesc.includes("verkaufen") || lowerDesc.includes("verkaufe") || lowerDesc.includes("sell")) {
          if (lowerValue === "eisanbieter") score += 5;
        }
        if (lowerDesc.includes("laden") || lowerDesc.includes("geschäft") || lowerDesc.includes("shop") || lowerDesc.includes("store")) {
          if (lowerValue === "eisdiele") score += 5;
        }
      }

      // Keyword matching for railway company
      if (lowerValue === "eisenbahngesellschaft") {
        if (lowerDesc.includes("bahn") || lowerDesc.includes("zug") || lowerDesc.includes("eisenbahn") || 
            lowerDesc.includes("railway") || lowerDesc.includes("train") || lowerDesc.includes("schiene") ||
            lowerDesc.includes("transport") || lowerDesc.includes("verkehr")) {
          score += 10;
        }
      }

      // General business terms (minimal boost)
      if (lowerDesc.includes("unternehmen") || lowerDesc.includes("firma") || lowerDesc.includes("business") || lowerDesc.includes("company")) {
        score += 1;
      }

      // If no specific match but description is meaningful, give small score to all options
      if (score === 0 && lowerDesc.length > 10) {
        score = 0.5;
      }

      scored.push({ option, score });
    });

    // Sort by score descending and return top 3 (only if score > 0)
    const filtered = scored.filter((item) => item.score > 0);
    if (filtered.length === 0) {
      // If no matches, return all options as fallback
      return taetigkeitOptions.slice(0, 3);
    }

    return filtered
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.option);
  };

  const handleGetRecommendations = () => {
    if (helpDescription.trim()) {
      const recs = mockGetRecommendations(helpDescription);
      setRecommendations(recs);
    }
  };

  const handleSelectRecommendation = (value: string) => {
    handleTaetigkeitChange(value);
    handleHelpClose();
  };

  const handleSideActivityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, isSideActivity: value as SideActivity }));
  };

  const handleHasEmployeesChange = (value: string) => {
    setFormData((prev) => ({ ...prev, hasEmployees: value as HasEmployees }));
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.rechtsform !== "";
    }
    if (currentStep === 2) {
      return formData.taetigkeit !== "";
    }
    if (currentStep === 3) {
      return formData.isSideActivity !== "";
    }
    if (currentStep === 4) {
      return formData.hasEmployees !== "";
    }
    if (currentStep === 5) {
      return true; // Checklist step - no validation needed
    }
    return true;
  };

  const getRechtsformLabel = (value: Rechtsform | "") => {
    if (!value) return "";
    return rechtsformOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  const getTaetigkeitLabel = (value: string) => {
    if (!value) return "";
    return taetigkeitOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  const getSideActivityLabel = (value: SideActivity) => {
    if (!value) return "";
    return sideActivityOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  const getHasEmployeesLabel = (value: HasEmployees) => {
    if (!value) return "";
    return hasEmployeesOptions.find((opt) => opt.value === value)?.label ?? "";
  };

  return (
    <KernContainer>
      {/* Header */}
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={1}>Unternehmen anmelden</KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernText muted>
            Schritt {currentStep} von {TOTAL_STEPS}
          </KernText>
        </KernColumn>
      </KernRow>

      {/* Step 1: Rechtsform */}
      {currentStep === 1 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Rechtsform wählen</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Bitte wählen Sie die Rechtsform Ihres Unternehmens.
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernRadioGroup
                name="rechtsform"
                legend="Rechtsform"
                selected={formData.rechtsform}
                items={rechtsformOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                onChange={handleRechtsformChange}
              />
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <RechtsformHelper onSelect={handleRechtsformChange} />
            </KernColumn>
          </KernRow>
        </>
      )}

      {/* Step 2: Tätigkeit */}
      {currentStep === 2 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Tätigkeit des Unternehmens</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Womit wird sich Ihr neues Unternehmen beschäftigen?
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernCombobox
                id="taetigkeit"
                label="Tätigkeit"
                options={taetigkeitOptions}
                value={formData.taetigkeit}
                onChange={handleTaetigkeitChange}
                placeholder="Tätigkeit eingeben..."
                hint="Beginnen Sie mit der Eingabe und wählen Sie eine Option aus der Liste."
                required
              />
            </KernColumn>
          </KernRow>

          {!showHelp && (
            <KernRow>
              <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                <KernButton
                  text="Hilfe bei der Auswahl"
                  variant="tertiary"
                  onClick={handleHelpClick}
                />
              </KernColumn>
            </KernRow>
          )}

          {showHelp && (
            <>
              <KernRow>
                <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                  <KernText>
                    Beschreiben Sie Ihr Unternehmen in einem Satz. Wir geben Ihnen dann Empfehlungen für die passende Tätigkeit.
                  </KernText>
                </KernColumn>
              </KernRow>

              <KernRow>
                <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                    <label
                      htmlFor="help-description"
                      style={{
                        color: "var(--kern-color-layout-text-default, #171a2b)",
                        fontFamily: "var(--kern-typography-font-family-default, 'Fira Sans', sans-serif)",
                        fontSize: "var(--kern-typography-font-size-static-medium, 18px)",
                        fontWeight: "var(--kern-typography-font-weight-bold, 700)",
                        lineHeight: "var(--kern-typography-line-height-static-medium, 24px)",
                        padding: "var(--kern-metric-baseline-body-default-padding-top, 6px) 0 var(--kern-metric-baseline-body-default-padding-bottom, 2px) 0",
                      }}
                    >
                      Beschreibung
                    </label>
                    <textarea
                      id="help-description"
                      value={helpDescription}
                      onChange={(e) => setHelpDescription(e.target.value)}
                      placeholder="Z.B.: Ich möchte ein Eiscafé eröffnen, in dem ich verschiedene Eissorten verkaufe..."
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "var(--kern-metric-space-default, 16px)",
                        border: "none",
                        borderBottom: "var(--kern-metric-border-width-default, 2px) solid var(--kern-color-form-input-border, #171a2b)",
                        borderRadius: "var(--kern-metric-border-radius-small, 2px)",
                        background: "var(--kern-color-form-input-background, #f7f7f9)",
                        color: "var(--kern-color-layout-text-default, #171a2b)",
                        fontFamily: "var(--kern-typography-font-family-default, 'Fira Sans', sans-serif)",
                        fontSize: "var(--kern-typography-font-size-static-medium, 18px)",
                        fontWeight: "var(--kern-typography-font-weight-regular, 400)",
                        lineHeight: "var(--kern-typography-line-height-static-medium, 24px)",
                        outline: "none",
                        boxSizing: "border-box",
                        resize: "vertical",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderBottom = "none";
                        e.target.style.boxShadow = "0 0 0 var(--kern-metric-border-width-bold, 4px) var(--kern-color-form-input-border, #171a2b)";
                        e.target.style.outlineOffset = "var(--kern-metric-border-width-default, 2px)";
                        e.target.style.outline = "var(--kern-metric-border-width-default, 2px) solid var(--kern-color-form-input-border, #171a2b)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderBottom = "var(--kern-metric-border-width-default, 2px) solid var(--kern-color-form-input-border, #171a2b)";
                        e.target.style.boxShadow = "none";
                        e.target.style.outline = "none";
                      }}
                    />
                  </div>
                </KernColumn>
              </KernRow>

              <KernRow>
                <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                  <KernRow justify="between">
                    <KernColumn sizes={6}>
                      <KernButton
                        text="Abbrechen"
                        variant="secondary"
                        onClick={handleHelpClose}
                      />
                    </KernColumn>
                    <KernColumn sizes={6} align="end">
                      <KernButton
                        text="Empfehlungen erhalten"
                        variant="primary"
                        onClick={handleGetRecommendations}
                        disabled={!helpDescription.trim()}
                      />
                    </KernColumn>
                  </KernRow>
                </KernColumn>
              </KernRow>

              {recommendations.length > 0 && (
                <>
                  <KernRow>
                    <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                      <KernHeading level={3}>Empfehlungen</KernHeading>
                    </KernColumn>
                  </KernRow>

                  <KernRow>
                    <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                      <KernText muted>
                        Bitte wählen Sie eine der folgenden Empfehlungen aus:
                      </KernText>
                    </KernColumn>
                  </KernRow>

                  {recommendations.map((rec, index) => (
                    <KernRow key={rec.value}>
                      <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                        <div
                          onClick={() => handleSelectRecommendation(rec.value)}
                          style={{
                            padding: "var(--kern-metric-space-default, 16px)",
                            border: "var(--kern-metric-border-width-default, 2px) solid var(--kern-color-form-input-border, #171a2b)",
                            borderRadius: "var(--kern-metric-border-radius-small, 2px)",
                            background: "var(--kern-color-form-input-background, #f7f7f9)",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--kern-color-layout-background-hover, #f0f0f2)";
                            e.currentTarget.style.borderColor = "var(--kern-color-form-input-border, #171a2b)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--kern-color-form-input-background, #f7f7f9)";
                            e.currentTarget.style.borderColor = "var(--kern-color-form-input-border, #171a2b)";
                          }}
                        >
                          <KernText bold>
                            {index + 1}. {rec.label}
                          </KernText>
                        </div>
                      </KernColumn>
                    </KernRow>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}

      {/* Step 3: Nebentätigkeit */}
      {currentStep === 3 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Nebentätigkeit</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Wird dein Startup erstmal eine Nebentätigkeit sein?
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernRadioGroup
                name="isSideActivity"
                legend="Nebentätigkeit"
                selected={formData.isSideActivity}
                items={sideActivityOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                onChange={handleSideActivityChange}
              />
            </KernColumn>
          </KernRow>

          {formData.isSideActivity === "yes" && (
            <KernRow>
              <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                <KernAlert
                  title="Gut zu wissen"
                  variant="info"
                  body="Sie bleiben über Ihren Hauptjob krankenversichert. Dadurch sparen Sie hohe zusätzliche Kosten für Ihre Versicherung. Das gilt aber nur, wenn Sie maximal 20 Stunden pro Woche für Ihr neues Unternehmen arbeiten."
                />
              </KernColumn>
            </KernRow>
          )}
        </>
      )}

      {/* Step 4: Angestellte */}
      {currentStep === 4 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Angestellte</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Startest du mit oder ohne Angestellten?
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernRadioGroup
                name="hasEmployees"
                legend="Angestellte"
                selected={formData.hasEmployees}
                items={hasEmployeesOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                onChange={handleHasEmployeesChange}
              />
            </KernColumn>
          </KernRow>
        </>
      )}

      {/* Step 5: Checkliste */}
      {currentStep === 5 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Checkliste</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Basierend auf Ihren Angaben haben wir eine Checkliste für die nächsten Schritte erstellt.
              </KernText>
            </KernColumn>
          </KernRow>

          {/* Section: Vorbereiten */}
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <CustomCard preline="Vorbereiten">
                <KernContainer>
                  {/* Name prüfen */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Name prüfen</KernHeading>
                      <KernText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>

                  {/* Gesellschaftsvertrag aufsetzen */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Gesellschaftsvertrag aufsetzen</KernHeading>
                      <KernText>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>

                  {/* Notartermin vereinbaren */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Notartermin vereinbaren</KernHeading>
                      <KernText>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>
                </KernContainer>
              </CustomCard>
            </KernColumn>
          </KernRow>

          {/* Section: Gründen */}
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <CustomCard preline="Gründen">
                <KernContainer>
                  {/* Notariell gründen */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Notariell gründen</KernHeading>
                      <KernText>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>

                  {/* Geschäftskonto öffnen */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Geschäftskonto öffnen</KernHeading>
                      <KernText>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>

                  {/* Stammkapitel einzahlen und nachweisen */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Stammkapitel einzahlen und nachweisen</KernHeading>
                      <KernText>
                        Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>

                  {/* Handelsregistereintrag */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Handelsregistereintrag</KernHeading>
                      <KernText>
                        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>

                  {/* Unternehmen anmelden */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Unternehmen anmelden</KernHeading>
                      <KernText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>
                </KernContainer>
              </CustomCard>
            </KernColumn>
          </KernRow>

          {/* Section: Mitarbeiter einstellen */}
          {formData.hasEmployees === "with" && (
            <KernRow>
              <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                <CustomCard preline="Mitarbeiter einstellen">
                  <KernContainer>
                    {/* Unvallversicherung bei Berufsgenossenschaft */}
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernHeading level={4}>Unvallversicherung bei Berufsgenossenschaft</KernHeading>
                        <KernText>
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </KernText>
                        <KernRow>
                          <KernColumn sizes={12}>
                            <KernButton text="Mehr lesen" onClick={() => {}} />
                          </KernColumn>
                        </KernRow>
                      </KernColumn>
                    </KernRow>

                    {/* Betriebsnummer beantragen */}
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernHeading level={4}>Betriebsnummer beantragen</KernHeading>
                        <KernText>
                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </KernText>
                        <KernRow>
                          <KernColumn sizes={12}>
                            <KernButton text="Mehr lesen" onClick={() => {}} />
                          </KernColumn>
                        </KernRow>
                      </KernColumn>
                    </KernRow>
                  </KernContainer>
                </CustomCard>
              </KernColumn>
            </KernRow>
          )}

          {/* Section: Weitere Schritte */}
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <CustomCard preline="Weitere Schritte">
                <KernContainer>
                  {/* IHK Anmeldung */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>IHK Anmeldung</KernHeading>
                      <KernText>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>

                  {/* Sozialversicherungspflicht prüfen */}
                  <KernRow>
                    <KernColumn sizes={12}>
                      <KernHeading level={4}>Sozialversicherungspflicht prüfen</KernHeading>
                      <KernText>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                      </KernText>
                      <KernRow>
                        <KernColumn sizes={12}>
                          <KernButton text="Mehr lesen" onClick={() => {}} />
                        </KernColumn>
                      </KernRow>
                    </KernColumn>
                  </KernRow>
                </KernContainer>
              </CustomCard>
            </KernColumn>
          </KernRow>
        </>
      )}

      {/* Step 6: Zusammenfassung */}
      {currentStep === 6 && (
        <>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernHeading level={2}>Zusammenfassung</KernHeading>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernText>
                Bitte überprüfen Sie Ihre Angaben.
              </KernText>
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernCard
                title="Ihre Angaben"
                body={
                  <KernContainer>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Rechtsform:</KernText>
                        <KernText>{getRechtsformLabel(formData.rechtsform)}</KernText>
                      </KernColumn>
                    </KernRow>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Tätigkeit:</KernText>
                        <KernText>{getTaetigkeitLabel(formData.taetigkeit)}</KernText>
                      </KernColumn>
                    </KernRow>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Nebentätigkeit:</KernText>
                        <KernText>{getSideActivityLabel(formData.isSideActivity)}</KernText>
                      </KernColumn>
                    </KernRow>
                    <KernRow>
                      <KernColumn sizes={12}>
                        <KernText bold>Angestellte:</KernText>
                        <KernText>{getHasEmployeesLabel(formData.hasEmployees)}</KernText>
                      </KernColumn>
                    </KernRow>
                  </KernContainer>
                }
              />
            </KernColumn>
          </KernRow>

          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <KernAlert
                title="Hinweis"
                variant="info"
                body="Dies ist ein Prototyp. In einer echten Anwendung würden hier weitere Schritte und eine Übermittlung der Daten folgen."
              />
            </KernColumn>
          </KernRow>
        </>
      )}

      {/* Navigation buttons */}
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernRow justify="between">
            <KernColumn sizes={6}>
              {currentStep > 1 && (
                <KernButton
                  text="Zurück"
                  variant="secondary"
                  onClick={handleBack}
                />
              )}
            </KernColumn>
            <KernColumn sizes={6} align="end">
              {currentStep < TOTAL_STEPS && (
                <KernButton
                  text="Weiter"
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceed()}
                />
              )}
              {currentStep === TOTAL_STEPS && (
                <KernButton
                  text="Absenden"
                  variant="primary"
                  onClick={() => alert("Formular abgesendet!")}
                />
              )}
            </KernColumn>
          </KernRow>
        </KernColumn>
      </KernRow>
    </KernContainer>
  );
}
