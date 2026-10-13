import type { Metadata } from "next";
import { Geist, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/context/ContactModalContext";
import { ContactModal } from "@/components/ContactModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://otellandanusa.vercel.app"),
  title: {
    default: "TN1DCreator | Full-Stack & QA Engineer",
    template: "%s | TN1DCreator",
  },
  description:
    "Full-stack and QA engineer in London. I build and test care-records software and live web apps with Next.js, TypeScript, PostgreSQL and Playwright.",
  openGraph: {
    title: "Oluwatobi Tella Ndanusa | Full-Stack & QA Engineer",
    description:
      "I build software for places where mistakes matter, and I test it as if they do. Supstaff, Swole and more, with the code.",
    url: "https://otellandanusa.vercel.app",
    siteName: "TN1DCreator",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwatobi Tella Ndanusa | Full-Stack & QA Engineer",
    description:
      "I build software for places where mistakes matter, and I test it as if they do.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oluwatobi Tella Ndanusa",
  jobTitle: "Full-Stack & QA Engineer",
  url: "https://otellandanusa.vercel.app",
  sameAs: [
    "https://github.com/TN1DG",
    "https://www.linkedin.com/in/oluwatobi-tella-ndanusa/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-(--color-ground) text-neutral-200">
        <ContactModalProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}
