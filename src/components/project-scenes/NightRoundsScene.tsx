'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Check, Moon, Sunrise } from 'lucide-react';
import { SceneShell } from './SceneShell';
import { useSceneStep } from './useSceneStep';

/** A night shift from 22:00 to 07:00; `at` is hours after 22:00. */
const ENTRIES = [
  { at: 0, time: '22:00', text: 'Handover read' },
  { at: 1.5, time: '23:30', text: 'Building check done' },
  { at: 3, time: '01:00', text: 'Room 4 checked, asleep' },
  { at: 5, time: '03:00', text: 'Fire doors checked' },
  { at: 8, time: '06:00', text: 'Medication signed with PIN' },
  { at: 9, time: '07:00', text: 'Handover written for day staff' },
] as const;
const SHIFT_HOURS = 9;
const DURATIONS = [1300, 1300, 1300, 1300, 1300, 3400] as const;
const VISIBLE_ROWS = 3;

/** Supstaff: a night shift's checks landing in the log, newest first. */
export function NightRoundsScene() {
  const { ref, step, cycle, still } = useSceneStep(DURATIONS);
  const logged = ENTRIES.slice(0, step + 1);
  const recent = logged.slice(-VISIBLE_ROWS).reverse();
  const progress = ENTRIES[step].at / SHIFT_HOURS;

  return (
    <SceneShell
      sceneRef={ref}
      label="Animation: a night shift from 22:00 to 07:00, with each check written to the log as it happens."
      className="flex flex-col justify-between px-5 py-4"
    >
      <ul className="space-y-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {recent.map((entry) => (
            <motion.li
              key={`${cycle}-${entry.time}`}
              layout={!still}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-sm"
            >
              <span className="w-11 shrink-0 font-mono text-xs text-neutral-500">{entry.time}</span>
              <Check className="h-3.5 w-3.5 shrink-0 text-(--accent)" strokeWidth={2.5} />
              <span className="truncate text-neutral-300">{entry.text}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
          <Moon className="h-3 w-3" /> 22:00
        </span>
        <div className="relative h-px flex-1 bg-neutral-700">
          <motion.div
            className="absolute inset-y-0 left-0 bg-(--accent)"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          {ENTRIES.map((entry, i) => (
            <span
              key={entry.time}
              className={`absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${
                i <= step ? 'bg-(--accent)' : 'bg-neutral-600'
              }`}
              style={{ left: `${(entry.at / SHIFT_HOURS) * 100}%` }}
            />
          ))}
        </div>
        <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
          07:00 <Sunrise className="h-3 w-3" />
        </span>
      </div>
    </SceneShell>
  );
}
