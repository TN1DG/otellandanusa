'use client';

import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import { GlitchText } from '@/components/GlitchText';
import { useContactModal } from '@/context/ContactModalContext';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function HeroSection() {
  const { openModal } = useContactModal();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="max-w-3xl text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="text-neutral-500 font-mono font-medium text-lg mb-4 tracking-wide uppercase"
        >
          Hello, I&apos;m
        </motion.p>
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight"
        >
          <GlitchText text="Oluwatobi Tella Ndanusa" trigger="mount" />
        </motion.h1>
        <motion.div variants={item} className="w-16 h-px bg-neutral-600 mx-auto mb-6" />
        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-neutral-300 mb-4 font-display"
        >
          Builder &middot; Innovator &middot; QA Engineer
        </motion.p>
        <motion.p
          variants={item}
          className="text-lg text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I don&apos;t just write code — I build products that solve real problems,
          and I make sure they actually work. Playwright automation, manual test
          design, and Jira/TestRail-driven QA process keep what I ship reliable.
        </motion.p>
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="clip-angular border border-neutral-500 px-8 py-3 text-lg font-medium text-white transition-all hover:bg-neutral-800 hover:border-glitch-cyan"
          >
            See What I&apos;ve Built
          </Link>
          <button
            type="button"
            onClick={openModal}
            className="clip-angular border border-neutral-700 px-8 py-3 text-lg font-medium text-neutral-400 transition-all hover:bg-neutral-800 hover:text-neutral-200 hover:border-glitch-magenta"
          >
            Get In Touch
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
