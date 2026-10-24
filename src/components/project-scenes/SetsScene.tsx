'use client';

import { AnimatePresence, motion } from 'motion/react';
import { SceneShell } from './SceneShell';
import { useSceneStep } from './useSceneStep';

const SETS = [60, 80, 90, 100, 105] as const; // kg
const PREVIOUS_BEST = 100;
const TOP = 125; // the bar area's ceiling, in kg (leaves room for labels)
// Frame 0: empty. Frame n: n sets logged. The last frame holds the new record.
const DURATIONS = [700, 480, 480, 480, 480, 3200] as const;

/** Swole: logging bench-press sets until the last one beats the old record. */
export function SetsScene() {
  const { ref, step, cycle, still } = useSceneStep(DURATIONS);
  const logged = step;
  const isRecord = logged === SETS.length;

  return (
    <SceneShell
      sceneRef={ref}
      label="Animation: five bench press sets are logged one at a time, rising from 60 to 105 kilograms, and the last set is marked as a new personal record over the previous best of 100."
      className="flex flex-col px-5 py-4"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-neutral-300">Bench press</p>
        <AnimatePresence>
          {isRecord && (
            <motion.p
              key={`pr-${cycle}`}
              initial={still ? false : { scale: 0.4, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 520, damping: 14 }}
              className="clip-angular-sm bg-(--accent) px-2.5 py-1 font-mono text-xs font-bold text-black"
            >
              New PR, 105 kg
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mt-2 flex-1">
        {/* The record to beat */}
        <div
          className="absolute inset-x-0 border-t border-dashed border-neutral-600"
          style={{ bottom: `${(PREVIOUS_BEST / TOP) * 100}%` }}
        >
          <span className="absolute right-0 -top-4 font-mono text-[10px] text-neutral-500">
            best {PREVIOUS_BEST}
          </span>
        </div>

        <div className="absolute inset-0 flex items-end gap-[6%] pr-14">
          {SETS.map((kg, i) => {
            const shown = i < logged;
            const record = kg > PREVIOUS_BEST;
            return (
              <div key={kg} className="relative flex h-full flex-1 items-end">
                <motion.div
                  key={`${cycle}-${kg}`}
                  className="w-full origin-bottom"
                  style={{
                    height: `${(kg / TOP) * 100}%`,
                    background: record ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 45%, transparent)',
                  }}
                  initial={still ? false : { scaleY: 0 }}
                  animate={{ scaleY: shown ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 15 }}
                />
                <motion.span
                  className="absolute inset-x-0 text-center font-mono text-[10px] text-neutral-400"
                  style={{ bottom: `calc(${(kg / TOP) * 100}% + 2px)` }}
                  initial={false}
                  animate={{ opacity: shown ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: shown && !still ? 0.15 : 0 }}
                >
                  {kg}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
}
