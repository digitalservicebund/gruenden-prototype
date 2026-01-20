"use client";

import {
  KernButton,
  KernCard,
  KernAlert,
  KernHeading,
  KernText,
  KernContainer,
} from "@kern-ux-annex/kern-react-kit";

export default function Home() {
  return (
    <KernContainer>
      <KernHeading level={1}>Willkommen</KernHeading>
      <KernText>
        Dies ist ein Prototyp mit dem KERN UX Design System.
      </KernText>

      <KernCard
        title="KERN React Kit"
        body={
          <>
            <KernAlert
              title="Einrichtung abgeschlossen"
              variant="info"
              body="Das KERN UX Design System wurde erfolgreich eingerichtet."
            />
            <KernText>
              KERN ist ein offener UX-Standard für die deutsche öffentliche Verwaltung.
            </KernText>
            <KernButton
              text="Mehr erfahren"
              variant="primary"
              href="https://www.kern-ux.de"
              target="_blank"
            />
          </>
        }
      />
    </KernContainer>
  );
}
