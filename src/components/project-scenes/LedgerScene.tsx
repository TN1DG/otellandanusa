'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { SceneShell } from './SceneShell';
import { useSceneStep } from './useSceneStep';

const ROWS = [
  { label: 'cash', placeholder: '[[cash]]', value: '£2,459,110' },
  { label: 'runway', placeholder: '[[runway]]', value: '20.1 months' },
  { label: 'net burn', placeholder: '[[net_burn]]', value: '-£122,504' },
] as const;
// Frame 0: all placeholders. Frame n: the first n rows filled by code.
const DURATIONS = [1200, 900, 900, 3400] as const;
const VERIFIED = '#5fd68f';

/** BoardReady: the model writes placeholders, code fills in each figure. */
export function LedgerScene() {
  const { ref, step, still } = useSceneStep(DURATIONS);
  const filled = step;

  return (
    <SceneShell
      sceneRef={ref}
      label="Animation: placeholders such as [[cash]] in a drafted investor update are replaced one by one with figures filled in by code, each marked as verified."
      className="flex flex-col justify-between px-5 py-4 font-mono text-sm"
    >
      <dl className="space-y-2">
        {ROWS.map((row, i) => {
          const done = i < filled;
          return (
            <div key={row.label} className="grid grid-cols-[5.5rem_1fr_1rem] items-center gap-3">
              <dt className="text-xs text-neutral-500">{row.label}</dt>
              <dd className="tabular-nums">
                {done ? (
                  still ? (
                    <span className="text-white">{row.value}</span>
                  ) : (
                    <Scramble value={row.value} />
                  )
                ) : (
                  <span className="border-b border-dashed border-(--accent)/60 text-(--accent)">
                    {row.placeholder}
                  </span>
                )}
              </dd>
              <span className="flex justify-end">
                <AnimatePresence>
                  {done && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20, delay: still ? 0 : 0.35 }}
                    >
                      <Check className="h-3.5 w-3.5" style={{ color: VERIFIED }} strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </div>
          );
        })}
      </dl>

      <p className="flex items-center justify-between border-t border-neutral-800 pt-3 text-xs">
        <span className="text-neutral-500">Figures filled by code</span>
        <span
          className="tabular-nums transition-colors duration-500"
          style={{ color: filled === ROWS.length ? VERIFIED : undefined }}
        >
          {filled}/{ROWS.length} verified
        </span>
      </p>
    </SceneShell>
  );
}

const FRAMES = 9;
const FRAME_MS = 45;

/** Digits flicker through random values, settling left to right. */
function Scramble({ value }: { value: string }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (frame >= FRAMES) return;
    const timer = setTimeout(() => setFrame((f) => f + 1), FRAME_MS);
    return () => clearTimeout(timer);
  }, [frame]);

  const settled = Math.ceil((frame / FRAMES) * value.length);
  const text = value
    .split('')
    .map((ch, i) =>
      i < settled || !/\d/.test(ch) ? ch : String((i * 7 + frame * 3) % 10),
    )
    .join('');

  return <span className={frame >= FRAMES ? 'text-white' : 'text-neutral-400'}>{text}</span>;
}
