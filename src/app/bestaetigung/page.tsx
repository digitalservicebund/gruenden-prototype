"use client";

import {
  KernContainer,
  KernRow,
  KernColumn,
  KernHeading,
} from "@kern-ux-annex/kern-react-kit";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function BestaetigungPage() {
  return (
    <>
      <Topbar />
      <Header />
      <KernContainer>
        <KernRow>
          <KernColumn sizes={{ xs: 12 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                textAlign: "center",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
            >
              {/* Large Checkmark Icon */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginBottom: "2rem" }}
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
            </div>
          </KernColumn>
        </KernRow>
      </KernContainer>
      <Footer />
    </>
  );
}
