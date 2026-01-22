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

export default function AntragPage() {
  return (
    <>
      <Topbar />
      <Header />
      <KernContainer>
        <KernRow>
          <KernColumn sizes={{ xs: 12, md: 10, lg: 8 }}>
            <KernHeading level={1} size="x-large">
              Unternehmensanmeldung
            </KernHeading>

            <KernText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </KernText>

            <KernText>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </KernText>

            <KernText>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </KernText>
          </KernColumn>
        </KernRow>
      </KernContainer>
      <Footer />
    </>
  );
}
