import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gründen Prototype",
  description: "Prototyp mit KERN UX Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
