'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { SceneShell } from './SceneShell';
import { useSceneStep } from './useSceneStep';

const ROUTE = 'M 60 124 H 168 V 58 H 318 V 108 H 458';
const PICKUP = { x: 60, y: 124 };
const DROPOFF = { x: 458, y: 108 };
// Streets run well past the 520×168 frame so narrow cards are still filled.
const STREETS = [
  'M -400 124 H 920', 'M -400 58 H 920', 'M -400 108 H 920', 'M -400 22 H 920', 'M -400 154 H 920',
  'M 168 -200 V 368', 'M 318 -200 V 368', 'M 60 -200 V 368', 'M 458 -200 V 368', 'M 240 -200 V 368',
  'M -60 -200 V 368', 'M -180 -200 V 368', 'M 580 -200 V 368', 'M 700 -200 V 368',
];
const STATUS = ['Delivery posted', 'Proposal accepted', 'Rider on the way', 'Delivered'] as const;
const DURATIONS = [1000, 1300, 2700, 3000] as const;
const RIDE_SECONDS = 2.4;

/** BiSRide: a posted delivery is accepted, then the rider travels the route. */
export function RouteScene() {
  const { ref, step, live } = useSceneStep(DURATIONS);
  const pathRef = useRef<SVGPathElement>(null);
  const travelled = useMotionValue(0);

  useEffect(() => {
    if (step < 2) {
      travelled.set(0);
      return;
    }
    if (step === 2 && live) {
      const ride = animate(travelled, 1, { duration: RIDE_SECONDS, ease: 'easeInOut' });
      return () => ride.stop();
    }
    travelled.set(1);
  }, [step, live, travelled]);

  const point = (v: number) => {
    const path = pathRef.current;
    if (!path) return PICKUP;
    return path.getPointAtLength(v * path.getTotalLength());
  };
  const riderX = useTransform(travelled, (v) => point(v).x);
  const riderY = useTransform(travelled, (v) => point(v).y);

  return (
    <SceneShell
      sceneRef={ref}
      label="Animation: a delivery is posted, a rider's proposal is accepted, and the rider travels along the route from pickup to drop-off until it is delivered."
    >
      <svg viewBox="0 0 520 168" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" overflow="visible">
        <g stroke="currentColor" className="text-neutral-800" strokeWidth="1" fill="none">
          {STREETS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Plain copy of the route, used only to measure the rider's position */}
        <path ref={pathRef} d={ROUTE} fill="none" stroke="none" />
        {/* Route ahead: drawn once the proposal is accepted */}
        <motion.path
          d={ROUTE}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.35"
          strokeWidth="2"
          initial={false}
          animate={{ pathLength: step >= 1 ? 1 : 0, opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        {/* Route travelled: solid behind the rider */}
        <motion.path
          d={ROUTE}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          style={{ pathLength: travelled }}
        />

        <Pin x={PICKUP.x} y={PICKUP.y} label="Pickup" />
        <Pin x={DROPOFF.x} y={DROPOFF.y} label="Drop-off" pulse={step === 3 && live} />

        <motion.g style={{ x: riderX, y: riderY }} initial={false} animate={{ opacity: step >= 2 ? 1 : 0 }}>
          <circle r="9" fill="var(--accent)" fillOpacity="0.25" />
          <circle r="5" fill="var(--accent)" />
        </motion.g>
      </svg>

      <div className="absolute left-4 top-3 flex items-center gap-2 clip-angular-sm border border-neutral-700 bg-ground/90 px-2.5 py-1">
        <span className="h-1.5 w-1.5 bg-(--accent)" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={STATUS[step]}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="font-mono text-xs text-neutral-200"
          >
            {STATUS[step]}
          </motion.span>
        </AnimatePresence>
      </div>
    </SceneShell>
  );
}

function Pin({ x, y, label, pulse = false }: { x: number; y: number; label: string; pulse?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {pulse && (
        <motion.circle
          r="6"
          fill="none"
          stroke="var(--accent)"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <rect x="-6" y="-6" width="12" height="12" fill="#0a0a0c" stroke="var(--accent)" strokeWidth="2" transform="rotate(45)" />
      <text y="26" textAnchor="middle" className="fill-neutral-400 font-mono" fontSize="11">
        {label}
      </text>
    </g>
  );
}
