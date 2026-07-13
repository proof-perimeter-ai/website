import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { MockupShell } from "./_components/MockupShell";
import "./mockup.css";

const mockSans = IBM_Plex_Sans({
  variable: "--font-mock-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Proof Perimeter mockup",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function MockupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <MockupShell className={mockSans.variable}>{children}</MockupShell>;
}
