import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Got a big idea? Let's turn it into something real. Get in touch with Oluwatobi Tella Ndanusa.",
};

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left — CTA copy */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Build Something Together
            </h1>
            <div className="w-16 h-px bg-neutral-600 mb-6" />
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              I&apos;m driven by ideas that push boundaries. Whether you&apos;re
              launching a startup, need a technical partner to bring a vision
              to life, or want to collaborate on something ambitious — let&apos;s
              make it happen.
            </p>
            <div className="space-y-0 border-t border-neutral-800">
              <div className="flex items-start gap-4 py-4 border-b border-neutral-800">
                <span className="mt-0.5 text-neutral-600 text-sm">01</span>
                <div>
                  <p className="font-medium text-neutral-200">Product Building</p>
                  <p className="text-sm text-neutral-500">From napkin sketch to launched product</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-4 border-b border-neutral-800">
                <span className="mt-0.5 text-neutral-600 text-sm">02</span>
                <div>
                  <p className="font-medium text-neutral-200">Technical Innovation</p>
                  <p className="text-sm text-neutral-500">Solving hard problems with creative engineering</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-4 border-b border-neutral-800">
                <span className="mt-0.5 text-neutral-600 text-sm">03</span>
                <div>
                  <p className="font-medium text-neutral-200">Open Source</p>
                  <p className="text-sm text-neutral-500">Contributing to and building community projects</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-4 border-b border-neutral-800">
                <span className="mt-0.5 text-neutral-600 text-sm">04</span>
                <div>
                  <p className="font-medium text-neutral-200">Ventures & Startups</p>
                  <p className="text-sm text-neutral-500">Building MVPs and scaling ideas into reality</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="rounded-lg p-8 border border-neutral-800 bg-[#1f1f1f]">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
