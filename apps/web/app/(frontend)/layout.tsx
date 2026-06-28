import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/navigation/footer";
import { Header } from "@/components/navigation/header";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Work4Change",
  description: "Career platform for the non-profit and impact sectors across Asia and Pacific.",
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
