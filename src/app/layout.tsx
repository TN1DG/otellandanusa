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
    default: "TN1DCreator | Builder, Innovator & QA Engineer",
    template: "%s | TN1DCreator",
  },
  description:
    "Builder and QA engineer turning bold ideas into real, well-tested products — from Playwright automation to production launches.",
  openGraph: {
    title: "TN1DCreator | Builder, Innovator & QA Engineer",
    description:
      "Builder and QA engineer turning bold ideas into real, well-tested products — from Playwright automation to production launches.",
    url: "https://otellandanusa.vercel.app",
    siteName: "TN1DCreator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TN1DCreator | Builder, Innovator & QA Engineer",
    description:
      "Builder and QA engineer turning bold ideas into real, well-tested products.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oluwatobi Tella Ndanusa",
  jobTitle: "Builder, Innovator & QA Engineer",
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
