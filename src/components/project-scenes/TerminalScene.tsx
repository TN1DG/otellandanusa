'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SceneShell } from './SceneShell';
import { useSceneStep } from './useSceneStep';

const LINES = [
  { kind: 'command', text: 'add "Ship portfolio v2" --priority high' },
  { kind: 'output', text: 'task added: 4 active, 1 critical' },
  { kind: 'command', text: 'filter --status active' },
  { kind: 'output', text: '4 tasks shown' },
] as const;
// One frame per line; the last frame holds the finished session.
const DURATIONS = [2100, 700, 1500, 3200] as const;

/** Nexus Todo: adding and filtering tasks from a neon command line. */
export function TerminalScene() {
  const { ref, step, cycle, live } = useSceneStep(DURATIONS);

  return (
    <SceneShell
      sceneRef={ref}
      label="Animation: a neon command line where a high-priority task is added and the list is filtered to active tasks."
      className="scanline-overlay bg-black/40 px-5 py-4 font-mono text-[11px] leading-6 sm:text-xs lg:text-[13px]"
    >
      {LINES.slice(0, step + 1).map((line, i) => {
        const current = i === step;
        const typing = current && live && line.kind === 'command';
        return line.kind === 'command' ? (
          <p key={`${cycle}-${i}`} className="whitespace-nowrap">
            <span className="text-(--accent)">&gt; </span>
            <span className="text-glitch-cyan">
              {typing ? <Typed text={line.text} /> : line.text}
            </span>
            {current && <Cursor />}
          </p>
        ) : (
          <motion.p
            key={`${cycle}-${i}`}
            initial={live ? { opacity: 0, x: -4 } : false}
            animate={{ opacity: [0, 1, 0.4, 1], x: 0 }}
            transition={{ duration: 0.35, times: [0, 0.3, 0.6, 1] }}
            className="whitespace-nowrap pl-3 text-neutral-400"
          >
            {line.text}
            {current && <Cursor />}
          </motion.p>
        );
      })}
    </SceneShell>
  );
}

const CHAR_MS = 38;

function Typed({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), CHAR_MS);
    return () => clearTimeout(timer);
  }, [count, text.length]);

  return <>{text.slice(0, count)}</>;
}

function Cursor() {
  return <span aria-hidden="true" className="terminal-cursor ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-(--accent)" />;
}
