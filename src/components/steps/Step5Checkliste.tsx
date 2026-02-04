import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernContainer,
  KernAccordion,
} from "@kern-ux-annex/kern-react-kit";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import Link from "next/link";
import {
  type FormData,
  type Rechtsform,
  type SideActivity,
  type HasEmployees,
  rechtsformOptions,
  rechtsformArticle,
  taetigkeitOptions,
  sideActivityOptions,
} from "@/app/types";

interface Step5ChecklisteProps {
  formData: FormData;
}

const getRechtsformLabel = (value: Rechtsform | "") => {
  if (!value) return "";
  return rechtsformOptions.find((opt) => opt.value === value)?.label ?? "";
};

const getTaetigkeitLabels = (value: string) => {
  if (!value) return "";
  // Split comma-separated IDs and look up each label
  const ids = value.split(',').filter(id => id.trim());

  // Mock search results that match Step2Taetigkeit
  const searchResults = [
    { id: "reparatur-moebel", title: "Reparatur von Möbeln und Einrichtungsgegenständen" },
    { id: "bautischlerei-schlosserei", title: "Bautischlerei und -schlosserei" },
    { id: "herstellung-sonstige-moebel", title: "Herstellung von sonstigen Möbeln a. n. g." },
  ];

  const labels = ids.map(id => {
    const result = searchResults.find(r => r.id === id);
    return result?.title ?? id;
  });

  return labels.join(', ');
};

const getSideActivityLabel = (value: SideActivity) => {
  if (!value) return "";
  return sideActivityOptions.find((opt) => opt.value === value)?.label ?? "";
};

const getHasEmployeesTextForSummary = (value: HasEmployees) => {
  if (value === "with") {
    return <>Sie planen <strong>Mitarbeiter einzustellen</strong>.</>;
  } else if (value === "without") {
    return <>Sie planen <strong>nicht Mitarbeiter einzustellen</strong>.</>;
  }
  return "";
};

function SummaryText({ formData }: { formData: FormData }) {
  const article = formData.rechtsform ? rechtsformArticle[formData.rechtsform] : "eine";

  return (
    <KernText>
      Sie möchten {article} <strong>{getRechtsformLabel(formData.rechtsform)}</strong> gründen mit der Tätigkeit <strong>{getTaetigkeitLabels(formData.taetigkeit)}</strong>. Dies ist eine <strong>{getSideActivityLabel(formData.isSideActivity) === "Nebenberuflich" ? "Nebentätigkeit" : "Haupttätigkeit"}</strong>. {getHasEmployeesTextForSummary(formData.hasEmployees)}
    </KernText>
  );
}

export function Step5Checkliste({ formData }: Step5ChecklisteProps) {
  const isGmbH = formData.rechtsform === "gmbh";
  const isEinzelunternehmen = formData.rechtsform === "einzelunternehmen";

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
              <KernHeading level={4}>Wunschnamen auf Verfügbarkeit prüfen</KernHeading>
              <KernText>
               Um eine reibungslose Eintragung in das Handelsregister zu gewährleisten, sollten Sie Ihren gewünschten Unternehmensnamen vor der notariellen Beurkundung prüfen. Die IHK Berlin bietet hierfür einen speziellen Service zur Vorabklärung an.
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
                Der Gesellschaftsvertrag bildet das rechtliche Fundament Ihres Unternehmens. Hierin legen Sie wichtige Vereinbarungen wie die Gewinnverteilung und die Geschäftsführung fest. Ein sorgfältig aufgesetzter Vertrag sorgt von Anfang an für Klarheit zwischen den Gesellschaftern und beugt späteren Konflikten vor.
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
                Die Gründung einer GmbH erfordert eine notarielle Beurkundung des Gesellschaftsvertrages. Dieser Termin kann auch digital über eine Videokonferenz durchgeführt werden. Dabei erfolgen die Identitätsprüfung und die Unterzeichnung der Dokumente rein digital.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>

          {/* Geschäftskonto eröffnen */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Geschäftskonto eröffnen</KernHeading>
              <KernText>
                Direkt nach der notariellen Beurkundung ist die Eröffnung eines Geschäftskontos erforderlich. Auf dieses Konto ist das im Gesellschaftsvertrag festgelegte Stammkapital einzuzahlen. Für die Kontoeröffnung benötigt die Bank den beurkundeten Gesellschaftsvertrag, die Gründungsurkunde sowie in der Regel die Gesellschafterliste.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>

          {/* Stammkapitel nachweisen */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Stammkapitel nachweisen</KernHeading>
              <KernText>
                Nachdem Sie das Stammkapital auf Ihr Geschäftskonto eingezahlt haben, reichen Sie den Nachweis der Einzahlung bei Ihrem Notar ein. Dies ist die Voraussetzung für die Einreichung der Gründungsunterlagen beim Handelsregister.
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
               Der Notar veranlasst nun die Eintragung beim Registergericht. Dieser Vorgang läuft für Sie automatisch ab. Im Anschluss erhalten Sie vom zuständigen Gericht eine Rechnung über die Eintragungsgebühren. 
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>

          {/* Kombiantrag: Gewerbe & Steuern */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Kombiantrag: Gewerbe & Steuern</KernHeading>
              <KernText>
                Für Ihren Unternehmensstart sind die Gewerbeanzeige und die steuerliche Erfassung beim Finanzamt erforderlich. Dieser Kombiantrag bündelt beide Prozesse und übermittelt Ihre Unterlagen direkt digital an die zuständigen Stellen.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <Link href="/antrag">
                    <PrimaryButton text="Antrag starten" onClick={() => {}} />
                  </Link>
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
                {/* Unfallversicherung bei den Berufsgenossenschaft */}
                <KernRow>
                  <KernColumn sizes={12}>
                    <KernHeading level={4}>Unvallversicherung bei Berufsgenossenschaft</KernHeading>
                    <KernText>
                      Sobald Sie Mitarbeitende beschäftigen, müssen Sie Ihr Unternehmen bei der zuständigen Berufsgenossenschaft versichern. Als Träger der gesetzlichen Unfallversicherung ist die Berufsgenossenschaft für die Absicherung Ihrer Mitarbeitende zuständig.                    </KernText>
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
                      Für die Einstellung von Mitarbeitenden ist die Beantragung einer Betriebsnummer erforderlich. Sie dient der Identifikation Ihres Unternehmens gegenüber den Sozialversicherungsträgern. Der Antrag kann online beim Betriebsnummern-Service der Bundesagentur für Arbeit gestellt werden.
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
          {/* Eintrag ins Transparenzregister */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Eintrag ins Transparenzregister</KernHeading>
              <KernText>
                Nach der Gründung tragen Sie die Gesellschaft in das Transparenzregister ein. In diesem Register werden die wirtschaftlich berechtigten Personen der Gesellschaft erfasst. Um den gesetzlichen Anforderungen zu entsprechen, sollte dieser Schritt zeitnah nach der  Eintragungs ins Handelsreigster abgeschlossen werden.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>

          {/* IHK Anmeldung */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>IHK Anmeldung</KernHeading>
              <KernText>
                Aufgrund Ihrer Tätigkeit erfolgt die Mitgliedschaft in der Industrie- und Handelskammer (IHK) automatisch. Diese Mitgliedschaft bietet Ihnen zahlreiche Vorteile und unterstützt Sie bei Ihrem geschäftlichen Erfolg.
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
                Bei der Deutschen Rentenversicherung können Sie prüfen lassen, ob Sie sozialversicherungspflichtig sind. Dieses Verfahren gibt Ihnen Sicherheit und schützt Sie vor teuren Nachzahlungen        
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

  // Einzelunternehmen accordion items
  const einzelunternehmenAccordionItems = [
    {
      title: "Rechtliche Gründung",
      defaultOpen: true,
      body: (
        <KernContainer>
          {/* Kombiantrag: Gewerbe & Steuern */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Kombiantrag: Gewerbe & Steuern</KernHeading>
              <KernText>
                Für Ihren Unternehmensstart sind die Gewerbeanzeige und die steuerliche Erfassung beim Finanzamt erforderlich. Dieser Kombi-Antrag bündelt beide Prozesse und übermittelt Ihre Unterlagen direkt digital an die zuständigen Stellen.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <Link href="/antrag">
                    <PrimaryButton text="Antrag starten" onClick={() => {}} />
                  </Link>
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
                      Für die Einstellung von Mitarbeitern ist die Beantragung einer Betriebsnummer erforderlich. Sie dient der Identifikation Ihres Unternehmens gegenüber den Sozialversicherungsträgern. Der Antrag kann online beim Betriebsnummern-Service der Bundesagentur für Arbeit gestellt werden
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
          {/* Geschäftskonto */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Geschäftskonto eröffnen</KernHeading>
              <KernText>
                Eröffnen Sie ein Geschäftskonto, um private und geschäftliche Finanzen klar zu trennen. Damit stellen Sie sicher, dass Ihre Transaktionen rechtssicher dokumentiert werden und Sie jederzeit den Überblick über Ihre Finanzen behalten.
              </KernText>
              <KernRow>
                <KernColumn sizes={12}>
                  <SecondaryButton text="Mehr lesen" onClick={() => {}} icon="arrow-forward" iconPlacement="right" />
                </KernColumn>
              </KernRow>
            </KernColumn>
          </KernRow>

          {/* Mitglied bei der IHK werden */}
          <KernRow>
            <KernColumn sizes={12}>
              <KernHeading level={4}>Mitglied bei der IHK werden</KernHeading>
              <KernText>
                Aufgrund Ihrer Tätigkeit erfolgt die Mitgliedschaft in der Industrie- und Handelskammer (IHK) automatisch. Diese Mitgliedschaft bietet Ihnen zahlreiche Vorteile und unterstützt Sie bei Ihrem geschäftlichen Erfolg.
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
                Bei der Deutschen Rentenversicherung können Sie prüfen lassen, ob Sie sozialversicherungspflichtig sind. Dieses Verfahren gibt Ihnen Sicherheit und schützt Sie vor teuren Nachzahlungen.
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
          <KernAccordion
            items={
              isGmbH
                ? gmbhAccordionItems
                : isEinzelunternehmen
                ? einzelunternehmenAccordionItems
                : genericAccordionItems
            }
          />
        </KernColumn>
      </KernRow>
    </>
  );
}
