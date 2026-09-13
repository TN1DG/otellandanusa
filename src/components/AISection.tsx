'use client';

import { motion } from 'motion/react';
import { Bot, Workflow, Terminal, Wand2, BrainCircuit } from 'lucide-react';
import { GlitchText } from '@/components/GlitchText';

const skills = [
  { label: 'Claude Code', icon: Terminal },
  { label: 'Agentic Workflows', icon: Workflow },
  { label: 'LLM API Integration', icon: BrainCircuit },
  { label: 'AI SDK', icon: Bot },
  { label: 'Prompt Engineering', icon: Wand2 },
];

export function AISection() {
  return (
    <section className="px-6 py-20 md:py-28 border-t border-neutral-800">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
          <GlitchText text="Also: I Build With AI Agents" trigger="mount" />
        </h2>
        <div className="w-16 h-px bg-neutral-600 mx-auto mb-6" />
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          I build production software in agentic workflows, directing Claude Code
          end-to-end and using Claude Code Skills to move faster. Swole ships an
          in-app vision model (Claude Haiku via the AI SDK) for photo-based
          nutrition logging, and Get More Diners generates marketing campaigns via
          the OpenAI API — real LLM integrations, not demos.
        </p>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {skills.map(({ label, icon: Icon }) => (
            <motion.span
              key={label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="flex items-center gap-2 clip-angular-sm border border-neutral-700 px-4 py-2 text-sm font-mono text-neutral-300"
            >
              <Icon className="h-4 w-4 text-glitch-magenta" />
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
