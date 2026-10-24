'use client';

import Image from 'next/image';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { Maximize2, X } from 'lucide-react';
import type { Project } from '@/data/projects';

/** Matches the default in `Project`: a 385×764 phone screenshot. */
const DEFAULT_WIDTH = 385;
const DEFAULT_HEIGHT = 764;

const SPRING = { stiffness: 260, damping: 24, mass: 0.5 };

/** What the browser frame's address bar shows. */
function addressLabel(project: Project) {
  if (!project.liveUrl) return 'localhost';
  try {
    return new URL(project.liveUrl).host;
  } catch {
    return project.liveUrl;
  }
}

/**
 * A project screenshot shown on a fixed-shape stage, so every card on the
 * portfolio page has the same footprint whatever the screenshot's shape.
 * Tall screenshots sit in a phone frame, wide ones in a browser frame.
 * With a mouse, the device tilts toward the pointer and splits into
 * cyan/magenta fringes; clicking or tapping opens the full-size screenshot.
 */
export function ProjectPreview({
  project,
  eager = false,
}: {
  project: Project;
  /** Load the screenshot straight away, for a preview near the top of the page. */
  eager?: boolean;
}) {
  const loading = eager ? 'eager' : undefined;
  const width = project.imageWidth ?? DEFAULT_WIDTH;
  const height = project.imageHeight ?? DEFAULT_HEIGHT;
  const isPhone = height > width;
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Pointer position over the stage, from -0.5 to 0.5 on each axis.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const split = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);
  const splitOpacity = useSpring(split, SPRING);

  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const cyanX = useTransform(x, (v) => v * -18);
  const cyanY = useTransform(y, (v) => v * -12);
  const magentaX = useTransform(x, (v) => v * 18);
  const magentaY = useTransform(y, (v) => v * 12);
  const fringeOpacity = useTransform(splitOpacity, [0, 1], [0, 0.7]);

  function settle() {
    pointerX.set(0);
    pointerY.set(0);
    split.set(0);
  }

  function handlePointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    split.set(1);
  }

  // Keyboard focus gets the same treatment as a hover, held at a fixed angle.
  function handleFocus(e: FocusEvent<HTMLButtonElement>) {
    if (reduceMotion || !e.currentTarget.matches(':focus-visible')) return;
    pointerX.set(0.22);
    pointerY.set(-0.18);
    split.set(1);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={settle}
        onFocus={handleFocus}
        onBlur={settle}
        aria-haspopup="dialog"
        aria-label={`Enlarge screenshot of ${project.title}`}
        className="preview-stage group relative block w-full aspect-square lg:aspect-[6/5] clip-angular border border-neutral-800 cursor-zoom-in outline-none"
        style={{ perspective: 1100 }}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="relative block"
            style={{
              rotateX,
              rotateY,
              ...(isPhone
                ? { height: '88%', aspectRatio: `${width} / ${height}` }
                : { width: '90%' }),
            }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 clip-angular bg-glitch-cyan mix-blend-screen"
              style={{ x: cyanX, y: cyanY, opacity: fringeOpacity }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 clip-angular bg-glitch-magenta mix-blend-screen"
              style={{ x: magentaX, y: magentaY, opacity: fringeOpacity }}
            />
            {isPhone ? (
              <PhoneFrame project={project} loading={loading} />
            ) : (
              <BrowserFrame project={project} width={width} height={height} loading={loading} />
            )}
          </motion.span>
        </span>

        <span aria-hidden="true" className="preview-focus" />
        <span
          aria-hidden="true"
          className="preview-hint absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center clip-angular-sm border border-neutral-700 bg-ground/85 text-neutral-300"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      <ScreenshotDialog
        project={project}
        width={width}
        height={height}
        isPhone={isPhone}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function PhoneFrame({ project, loading }: { project: Project; loading?: 'eager' }) {
  return (
    <span className="relative block h-full clip-angular bg-neutral-600 p-px">
      <span className="block h-full clip-angular bg-[#0e0e11] p-[6px]">
        <span className="relative block h-full clip-angular-sm overflow-hidden bg-neutral-900">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 767px) 45vw, 240px"
            loading={loading}
            className="object-cover object-top"
          />
        </span>
      </span>
    </span>
  );
}

function BrowserFrame({
  project,
  width,
  height,
  loading,
}: {
  project: Project;
  width: number;
  height: number;
  loading?: 'eager';
}) {
  return (
    <span className="relative block clip-angular bg-neutral-600 p-px">
      <span className="block clip-angular bg-[#0e0e11]">
        <span className="flex h-7 items-center justify-center border-b border-neutral-800 px-4">
          <span className="truncate font-mono text-[11px] text-neutral-500">
            {addressLabel(project)}
          </span>
        </span>
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width={width}
          height={height}
          sizes="(max-width: 767px) 92vw, 520px"
          loading={loading}
          className="block h-auto w-full"
        />
      </span>
    </span>
  );
}

function ScreenshotDialog({
  project,
  width,
  height,
  isPhone,
  open,
  onClose,
}: {
  project: Project;
  width: number;
  height: number;
  isPhone: boolean;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Stop the page behind from scrolling while the screenshot is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  // Never larger than the screenshot itself, and always inside the viewport.
  const imageStyle = isPhone
    ? { height: `min(80dvh, ${height}px)`, width: 'auto', maxWidth: 'calc(100vw - 2rem)' }
    : { width: `min(calc(100vw - 2rem), ${width}px, calc(80dvh * ${width / height}))`, height: 'auto' };

  return (
    <dialog
      ref={ref}
      aria-labelledby={headingId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 text-neutral-200 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {open && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex flex-col gap-3 p-4"
        >
          <div className="flex items-center justify-between gap-6">
            <h2 id={headingId} className="font-display text-lg font-bold text-white">
              {project.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close screenshot"
              className="p-1 text-neutral-400 transition-colors hover:text-glitch-cyan focus-visible:text-glitch-cyan focus-visible:outline focus-visible:outline-1 focus-visible:outline-glitch-cyan"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mx-auto clip-angular border border-neutral-700 bg-neutral-900">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={width}
              height={height}
              sizes={isPhone ? '(max-width: 767px) 90vw, 420px' : '(max-width: 767px) 100vw, 1440px'}
              className="block object-contain"
              style={imageStyle}
            />
          </div>
        </motion.div>
      )}
    </dialog>
  );
}
