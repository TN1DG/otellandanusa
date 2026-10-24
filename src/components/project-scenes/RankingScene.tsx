'use client';

import { motion } from 'motion/react';
import { SceneShell } from './SceneShell';
import { useSceneStep } from './useSceneStep';

const ENTRIES = [
  { id: 'you', name: 'Your portfolio', scores: [64, 79, 93] },
  { id: 'design', name: 'Design system', scores: [88, 88, 88] },
  { id: 'ml', name: 'ML notebook', scores: [82, 82, 82] },
  { id: 'mobile', name: 'Mobile app', scores: [75, 75, 75] },
] as const;
const DURATIONS = [1500, 1500, 3200] as const;

/** YTG: as your work is validated, your portfolio climbs the ranking. */
export function RankingScene() {
  const { ref, step, still } = useSceneStep(DURATIONS);
  const ranked = [...ENTRIES]
    .map((e) => ({ ...e, score: e.scores[step] }))
    .sort((a, b) => b.score - a.score);

  return (
    <SceneShell
      sceneRef={ref}
      label="Animation: a leaderboard of four projects where your portfolio's score rises from 64 to 93 and it climbs from fourth to first place."
      className="px-5 py-3"
    >
      <ol className="space-y-1">
        {ranked.map((entry, i) => {
          const you = entry.id === 'you';
          return (
            <motion.li
              key={entry.id}
              layout={!still}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className={`grid grid-cols-[1.75rem_1fr_2rem] items-center gap-3 border-l-2 py-0.5 pl-2 text-sm ${
                you ? 'border-(--accent) bg-(--accent)/10 text-white' : 'border-transparent text-neutral-400'
              }`}
            >
              <span className="font-mono text-xs text-neutral-500">#{i + 1}</span>
              <span className="min-w-0">
                <span className="block truncate">{entry.name}</span>
                <span className="mt-1 block h-0.5 bg-neutral-800">
                  <motion.span
                    className={`block h-full ${you ? 'bg-(--accent)' : 'bg-neutral-600'}`}
                    initial={false}
                    animate={{ width: `${entry.score}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </span>
              </span>
              <motion.span
                key={entry.score}
                initial={still || !you ? false : { scale: 1.5, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-right font-mono text-xs tabular-nums"
              >
                {entry.score}
              </motion.span>
            </motion.li>
          );
        })}
      </ol>
    </SceneShell>
  );
}
