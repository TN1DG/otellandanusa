import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a tech project idea? Let's collaborate and build something amazing together. Get in touch with Otellandanusa.",
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
              I&apos;m always excited to collaborate on new tech projects.
              Whether you have a startup idea, need a technical co-founder,
              or want to team up on an open-source project — I&apos;d love
              to hear from you.
            </p>
            <div className="space-y-0 border-t border-neutral-800">
              <div className="flex items-start gap-4 py-4 border-b border-neutral-800">
                <span className="mt-0.5 text-neutral-600 text-sm">01</span>
                <div>
                  <p className="font-medium text-neutral-200">Web Applications</p>
                  <p className="text-sm text-neutral-500">Full-stack apps from concept to deployment</p>
                </div>
              </div>
              <div className="flex items-start gap-4 py-4 border-b border-neutral-800">
                <span className="mt-0.5 text-neutral-600 text-sm">02</span>
                <div>
                  <p className="font-medium text-neutral-200">API Development</p>
                  <p className="text-sm text-neutral-500">Scalable backends and integrations</p>
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
                  <p className="font-medium text-neutral-200">Startup Ideas</p>
                  <p className="text-sm text-neutral-500">Turning concepts into MVPs</p>
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
