"use client";

import {
  KernContainer,
  KernRow,
  KernColumn,
  KernHeading,
  KernText,
  KernAccordion,
  KernList,
} from "@kern-ux-annex/kern-react-kit";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function BestaetigungPage() {
  const accordionItems = [
    {
      title: "Das Gewerbeschein",
      body: (
        <KernList
          type="bullet"
          items={[
            { content: "Das Gewerbeamt prüft jetzt Ihren Antrag." },
            { content: "In ein paar Tagen erhalten Sie den Gewerbeschein zugeschickt." },
            { content: "Das ist die offizielle Bestätigung der Gewerbeanmeldung und ein rechtlicher Nachweis für Ihren Geschäftsbetrieb" },
          ]}
        />
      ),
    },
    {
      title: "Ihre Steuernummer",
      body: (
        <KernList
          type="bullet"
          items={[
            { content: "Das Finanzamt prüft Ihre Angaben, um Sie steuerlich richtig einzuordnen." },
            { content: "Sobald diese Prüfung abgeschlossen ist, erhalten Sie Ihre neue Steuernummer automatisch per Post." },
            { content: "Sie benötigen diese Nummer, damit Sie offizielle Rechnungen an Ihre Kunden stellen können." },
            { content: "Anschließend erhalten Sie auch Ihre Umsatzsteuer-Identifikationsnummer, die Sie für den Kauf oder Verkauf von Dienstleistungen und Waren innerhalb der EU benötigen." },
          ]}
        />
      ),
    },
    {
      title: "IHK Willkommensbrief",
      body: (
        <KernList
          type="bullet"
          items={[
            { content: "Sie werden automatisch Mitglied der Industrie- und Handelskammer (IHK)." },
            { content: "In dem Willkommensbrief finden Sie Ihre Mitgliednummer." },
            { content: "Als Neugründer müssen Sie in den ersten beiden Jahren wahrscheinlich keinen Mitgliedsbeitrag zahlen." },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <Topbar />
      <Header />
      <KernContainer>
        <KernRow>
          <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
            
              {/* Checkmark Icon */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-8"
              >
                <circle cx="100" cy="100" r="100" fill="#006B51" />
                <path
                  d="M60 100L85 125L140 70"
                  stroke="white"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Confirmation Text */}
              <KernHeading level={1} size="x-large">
                Wir haben Ihren Antrag erhalten
              </KernHeading>

              <KernText>Ihr Antrag wird nun geprüft. Anschließend erhalten Sie:</KernText>
            
          </KernColumn>
        </KernRow>

        <KernRow>
          <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
            <KernAccordion items={accordionItems} />
          </KernColumn>
        </KernRow>
      </KernContainer>
      <Footer />
    </>
  );
}
