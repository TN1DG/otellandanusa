'use client';

import { Fragment } from 'react';
import { motion } from 'motion/react';
import { Check, Mail, MessageSquare, Sparkles, type LucideIcon } from 'lucide-react';
import { SceneShell } from './SceneShell';
import { useSceneStep } from './useSceneStep';

const DRAFT =
  'Cold evening? Warm up with our new autumn menu: 2-for-1 starters, Monday to Thursday.';
const WORDS = DRAFT.split(' ');
const CHANNELS: { name: string; icon: LucideIcon }[] = [
  { name: 'SMS', icon: MessageSquare },
  { name: 'Email', icon: Mail },
];
// Frame 0: the draft is written. Frames 1 and 2: each channel is sent. Frame 3: hold.
const DURATIONS = [2600, 800, 800, 3000] as const;
const HIDDEN_WORD = { opacity: 0, y: 4, filter: 'blur(3px)' };
const SHOWN_WORD = { opacity: 1, y: 0, filter: 'blur(0px)' };

/** Get More Diners: an AI-written offer goes out by SMS and email. */
export function CampaignScene() {
  const { ref, step, cycle, still, live } = useSceneStep(DURATIONS);
  // Write the draft only once it is on screen, so the reveal is actually seen.
  const written = still || live || step > 0;

  return (
    <SceneShell
      sceneRef={ref}
      label="Animation: an AI-written restaurant offer appears word by word, then is sent to diners by SMS and by email."
      className="flex flex-col justify-between px-5 py-4"
    >
      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-xs text-(--accent)">
          <Sparkles className="h-3.5 w-3.5" /> Drafted by AI
        </p>
        <p key={cycle} className="text-sm leading-relaxed text-neutral-200">
          {WORDS.map((word, i) => (
            <Fragment key={i}>
              <motion.span
                className="inline-block"
                initial={still ? false : HIDDEN_WORD}
                animate={written ? SHOWN_WORD : HIDDEN_WORD}
                transition={{ duration: 0.35, delay: written ? i * 0.12 : 0, ease: 'easeOut' }}
              >
                {word}
              </motion.span>{' '}
            </Fragment>
          ))}
        </p>
      </div>

      <div className="flex gap-2">
        {CHANNELS.map(({ name, icon: Icon }, i) => {
          const sent = step > i;
          return (
            <span
              key={name}
              className={`relative flex items-center gap-1.5 clip-angular-sm border px-2.5 py-1 text-xs transition-colors duration-300 ${
                sent ? 'border-(--accent) text-(--accent)' : 'border-neutral-700 text-neutral-500'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {name}
              {sent && (
                <motion.span
                  initial={still ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="flex items-center gap-1"
                >
                  sent <Check className="h-3 w-3" strokeWidth={3} />
                </motion.span>
              )}
            </span>
          );
        })}
      </div>
    </SceneShell>
  );
}
