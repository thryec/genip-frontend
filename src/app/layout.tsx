import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenIP - Molecular IP on Story Protocol",
  description:
    "Secure molecular discoveries with programmable IP infrastructure. Register, verify, and manage IP rights with zero-knowledge privacy on Story Protocol.",
  keywords: [
    "molecular IP",
    "intellectual property",
    "Story Protocol",
    "zero-knowledge proofs",
    "blockchain",
    "SMILES",
    "molecular structures",
    "pharmaceutical IP",
    "chemical compounds",
    "IP registration",
    "molecular ownership",
    "crypto chemistry",
    "Web3 science",
    "decentralized IP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
