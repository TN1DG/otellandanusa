import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://otellandanusa.vercel.app"),
  title: {
    default: "Oluwatobi Tella Ndanusa | Builder & Innovator",
    template: "%s | Oluwatobi Tella Ndanusa",
  },
  description:
    "Innovator and builder turning bold ideas into real products. Explore my work and let's create something that matters.",
  openGraph: {
    title: "Oluwatobi Tella Ndanusa | Builder & Innovator",
    description:
      "Innovator and builder turning bold ideas into real products. Explore my work and let's create something that matters.",
    url: "https://otellandanusa.vercel.app",
    siteName: "Oluwatobi Tella Ndanusa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwatobi Tella Ndanusa | Builder & Innovator",
    description:
      "Innovator and builder turning bold ideas into real products.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oluwatobi Tella Ndanusa",
  jobTitle: "Builder & Innovator",
  url: "https://otellandanusa.vercel.app",
  sameAs: [
    "https://github.com/otellandanusa",
    "https://linkedin.com/in/otellandanusa",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#1a1a1a] text-neutral-200">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
