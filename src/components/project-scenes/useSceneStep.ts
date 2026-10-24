'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const noopSubscribe = () => () => {};

/** False during server render and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Steps a looping scene through its frames. `durations[i]` is how long frame
 * `i` is held before moving on; after the last frame it starts again at 0.
 *
 * The loop only runs while the scene is on screen. With reduced motion it
 * never runs and the scene shows its last frame, which should be the
 * complete state.
 */
export function useSceneStep(durations: readonly number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const hydrated = useHydrated();
  const prefersReduced = useReducedMotion();
  const still = hydrated && prefersReduced === true;
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView || still) return;
    const timer = setTimeout(() => {
      const next = (step + 1) % durations.length;
      if (next === 0) setCycle((c) => c + 1);
      setStep(next);
    }, durations[step]);
    return () => clearTimeout(timer);
  }, [inView, still, step, durations]);

  return {
    ref,
    step: still ? durations.length - 1 : step,
    /** Increments each time the loop restarts; use as a key to replay. */
    cycle,
    still,
    live: inView && !still,
  };
}
