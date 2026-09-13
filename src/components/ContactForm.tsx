'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { CheckCircle2, Send, TriangleAlert } from 'lucide-react';
import { sendContactEmail } from '@/app/actions/send-contact-email';

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');

    startTransition(async () => {
      const result = await sendContactEmail({ name, email, message });
      if (result.ok) {
        setSubmitted(true);
        onSuccess?.();
      } else {
        setError(result.error ?? 'Something went wrong. Please try again.');
      }
    });
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-glitch-cyan" />
        <h3 className="text-2xl font-bold text-white font-display mb-2">
          Message Sent!
        </h3>
        <p className="text-neutral-400">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-start gap-3 border border-glitch-magenta/40 bg-glitch-magenta/10 px-4 py-3 clip-angular-sm text-sm text-neutral-200">
          <TriangleAlert className="h-5 w-5 shrink-0 text-glitch-magenta" />
          <p>{error}</p>
        </div>
      )}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-300 mb-2 font-mono uppercase tracking-wide"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full clip-angular-sm border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:border-glitch-cyan focus:ring-1 focus:ring-glitch-cyan focus:outline-none transition"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-300 mb-2 font-mono uppercase tracking-wide"
        >
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full clip-angular-sm border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:border-glitch-cyan focus:ring-1 focus:ring-glitch-cyan focus:outline-none transition"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-300 mb-2 font-mono uppercase tracking-wide"
        >
          Project Idea / Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full clip-angular-sm border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:border-glitch-cyan focus:ring-1 focus:ring-glitch-cyan focus:outline-none transition resize-none"
          placeholder="Tell me about the project you have in mind..."
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 clip-angular border border-neutral-500 py-3 text-lg font-medium text-white transition-all hover:bg-neutral-800 hover:border-glitch-cyan disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-5 w-5" />
        {isPending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
