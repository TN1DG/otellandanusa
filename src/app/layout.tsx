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
    default: "Otellandanusa | Full-Stack Developer",
    template: "%s | Otellandanusa",
  },
  description:
    "Full-stack developer specializing in modern web applications. View my portfolio and let's build something great together.",
  openGraph: {
    title: "Otellandanusa | Full-Stack Developer",
    description:
      "Full-stack developer specializing in modern web applications. View my portfolio and let's build something great together.",
    url: "https://otellandanusa.vercel.app",
    siteName: "Otellandanusa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Otellandanusa | Full-Stack Developer",
    description:
      "Full-stack developer specializing in modern web applications.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Otellandanusa",
  jobTitle: "Full-Stack Developer",
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
