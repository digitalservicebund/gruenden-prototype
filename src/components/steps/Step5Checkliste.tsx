import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernContainer,
  KernAlert,
  KernAccordion,
} from "@kern-ux-annex/kern-react-kit";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import {
  type FormData,
  type Rechtsform,
  type SideActivity,
  type HasEmployees,
  rechtsformOptions,
  taetigkeitOptions,
  sideActivityOptions,
  hasEmployeesOptions,
} from "@/app/types";

interface Step5ChecklisteProps {
  formData: FormData;
}

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

const getHasEmployeesTextForSummary = (value: HasEmployees) => {
  const textMap: Record<HasEmployees, string> = {
    with: "mit Angestellten",
    without: "ohne Angestellte",
    "": "",
  };
  return textMap[value] || "";
};

function SummaryText({ formData }: { formData: FormData }) {
  return (
    <KernText>
      Sie möchten eine <strong>{getRechtsformLabel(formData.rechtsform)}</strong> gründen mit der Tätigkeit <strong>{getTaetigkeitLabel(formData.taetigkeit)}</strong>. Dies ist eine <strong>{getSideActivityLabel(formData.isSideActivity) === "Ja" ? "Nebentätigkeit" : "Haupttätigkeit"}</strong> und Sie planen <strong>{getHasEmployeesTextForSummary(formData.hasEmployees)}</strong>.
    </KernText>
  );
}

export function Step5Checkliste({ formData }: Step5ChecklisteProps) {
  const isGmbH = formData.rechtsform === "gmbh";

  // GmbH accordion items
  const gmbhAccordionItems = [
    {
      title: "Gründung vorbereiten",
      defaultOpen: true,
      body: (
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>
        </KernContainer>
      ),
    },
    {
      title: "Rechtliche Gründung",
      body: (
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
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
                  <PrimaryButton text="Antrag starten" onClick={() => {}} />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>
        </KernContainer>
      ),
    },
    ...(formData.hasEmployees === "with"
      ? [
          {
            title: "Mitarbeiter einstellen",
            body: (
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
                        <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
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
                        <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                      </KernColumn>
                    </KernRow>
                  </KernColumn>
                </KernRow>
              </KernContainer>
            ),
          },
        ]
      : []),
    {
      title: "Weitere Schritte",
      body: (
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
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
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>
        </KernContainer>
      ),
    },
  ];

  // Generic accordion items for non-GmbH
  const genericAccordionItems = [
    {
      title: "Schritt A",
      defaultOpen: true,
      body: (
        <KernContainer>
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Schritt A</KernHeading>
              <KernText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>
        </KernContainer>
      ),
    },
    {
      title: "Schritt B",
      body: (
        <KernContainer>
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Schritt B</KernHeading>
              <KernText>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>
        </KernContainer>
      ),
    },
    {
      title: "Schritt C",
      body: (
        <KernContainer>
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Schritt C</KernHeading>
              <KernText>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>
        </KernContainer>
      ),
    },
  ];

  return (
    <>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernText muted>
            Fertig
          </KernText>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={2}>Ihre Aufgabenliste für die Gründung</KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <SummaryText formData={formData} />
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernText>
            Basierend auf Ihren Angaben haben wir eine Checkliste für die nächsten Schritte erstellt.
          </KernText>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernAccordion items={isGmbH ? gmbhAccordionItems : genericAccordionItems} />
        </KernColumn>
      </KernRow>
    </>
  );
}
