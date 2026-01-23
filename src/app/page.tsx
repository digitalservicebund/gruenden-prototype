"use client";

import {
  KernContainer,
  KernRow,
  KernColumn,
  KernHeading,
  KernText,
} from "@kern-ux-annex/kern-react-kit";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PrimaryButton } from "@/components/PrimaryButton";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Topbar />
      <Header />
      <KernContainer>
        <KernRow>
          <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
            <KernHeading level={1} size="x-large">
              Gründen Sie Ihr Unternehmen in Deutschlend.
            </KernHeading>

            <KernText>
              Schritt für Schritt zur Gründung. Kombi-Antrag für Gewerbe und Steuernummer inklusive.
            </KernText>

            <div style={{ marginTop: "2rem" }}>
              <Link href="/application">
                <PrimaryButton text="Jetzt starten" onClick={() => {}} />
              </Link>
            </div>
          </KernColumn>
        </KernRow>
      </KernContainer>
      <Footer />
    </>
  );
}
