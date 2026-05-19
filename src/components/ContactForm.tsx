'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4 text-neutral-300">&#10003;</div>
        <h3 className="text-2xl font-bold text-white mb-2">
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
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-300 mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-300 mb-2"
        >
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-300 mb-2"
        >
          Project Idea / Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition resize-none"
          placeholder="Tell me about the project you have in mind..."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full border border-neutral-500 py-3 text-lg font-medium text-white transition-all hover:bg-neutral-800 hover:border-neutral-400"
      >
        Send Message
      </button>
    </form>
  );
}
