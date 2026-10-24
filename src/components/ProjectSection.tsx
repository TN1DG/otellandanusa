'use client';

import type { CSSProperties } from 'react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
  type Target,
  type Transition,
  type Variants,
} from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import type { Project, ProjectTheme } from '@/data/projects';
import { ProjectPreview } from '@/components/ProjectPreview';
import { ProjectScene } from '@/components/project-scenes';

const OUT = [0.22, 1, 0.36, 1] as const;
const CLIP_OPEN = 'inset(-15% -2% -25% -2%)';
const CLIP_SHUT = 'inset(-15% 100% -25% -2%)';

interface Entrance {
  /** Delay between one element and the next arriving. */
  stagger: number;
  /** How the title arrives. */
  title: { hidden: Target; show: Target; transition: Transition };
  /** How every other element arrives. */
  item: { hidden: Target; show: Target; transition: Transition };
}

/**
 * Each section arrives in a way that matches its project. `side` is -1 when
 * the words sit on the left of the screenshot and 1 when they sit on the right.
 */
function entranceFor(theme: ProjectTheme, side: 1 | -1): Entrance {
  switch (theme) {
    // Supstaff: written in, like entries in a night log.
    case 'night-rounds':
      return {
        stagger: 0.14,
        title: {
          hidden: { opacity: 0, clipPath: CLIP_SHUT },
          show: { opacity: 1, clipPath: CLIP_OPEN },
          transition: { duration: 1.1, ease: OUT },
        },
        item: {
          hidden: { opacity: 0, x: -14 },
          show: { opacity: 1, x: 0 },
          transition: { duration: 0.8, ease: OUT },
        },
      };
    // BoardReady: figures resolve out of a blur, the way placeholders get filled.
    case 'ledger': {
      const resolve = {
        hidden: { opacity: 0, filter: 'blur(8px)' },
        show: { opacity: 1, filter: 'blur(0px)' },
        transition: { duration: 0.55, ease: 'easeOut' },
      } satisfies Entrance['item'];
      return { stagger: 0.07, title: resolve, item: resolve };
    }
    // Swole: everything lands with a springy rep.
    case 'sets': {
      const spring: Transition = {
        type: 'spring',
        stiffness: 420,
        damping: 17,
        opacity: { duration: 0.3, ease: 'easeOut' },
      };
      return {
        stagger: 0.07,
        title: { hidden: { opacity: 0, y: 56, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1 }, transition: spring },
        item: { hidden: { opacity: 0, y: 40, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1 }, transition: spring },
      };
    }
    // BiSRide: content rides in from the side, like a delivery arriving.
    case 'route': {
      const ride = {
        hidden: { opacity: 0, x: side * 72 },
        show: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      } satisfies Entrance['item'];
      return { stagger: 0.1, title: ride, item: ride };
    }
    // Get More Diners: a slow, warm rise.
    case 'campaign': {
      const rise = {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0 },
        transition: { duration: 1.1, ease: 'easeOut' },
      } satisfies Entrance['item'];
      return { stagger: 0.18, title: rise, item: rise };
    }
    // YTG: rows drop into place, top to bottom, like a leaderboard.
    case 'ranking': {
      const drop = {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0 },
        transition: {
          type: 'spring',
          stiffness: 320,
          damping: 26,
          opacity: { duration: 0.3, ease: 'easeOut' },
        },
      } satisfies Entrance['item'];
      return { stagger: 0.06, title: drop, item: drop };
    }
    // Nexus Todo: a short neon glitch before each element settles.
    case 'terminal': {
      const glitch = {
        hidden: { opacity: 0, x: 0 },
        show: { opacity: [0, 1, 0.25, 1, 0.6, 1], x: [-10, 8, -4, 2, 0, 0] },
        transition: { duration: 0.5, ease: 'linear' },
      } satisfies Entrance['item'];
      return { stagger: 0.09, title: glitch, item: glitch };
    }
  }
}

/** With reduced motion, every element simply fades to its resting state. */
const REST: Target = { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)', clipPath: CLIP_OPEN };
function calm(hidden: Target): Target {
  const keys = Object.keys(hidden) as (keyof Target)[];
  return Object.fromEntries(keys.map((k) => [k, REST[k]])) as Target;
}

function toVariants(
  part: Entrance['item'],
  reduce: boolean,
): Variants {
  return {
    hidden: part.hidden,
    show: reduce
      ? { ...calm(part.hidden), transition: { duration: 0.35 } }
      : { ...part.show, transition: part.transition },
  };
}

interface ProjectSectionProps {
  project: Project;
  /** Put the words on the left and the screenshot on the right. */
  reversed?: boolean;
  /** Load the screenshot straight away (the first section on the page). */
  eager?: boolean;
}

export function ProjectSection({ project, reversed = false, eager = false }: ProjectSectionProps) {
  const reduce = useReducedMotion() === true;
  const entrance = entranceFor(project.theme, reversed ? -1 : 1);
  const title = toVariants(entrance.title, reduce);
  const item = toVariants(entrance.item, reduce);
  const group: Variants = { hidden: {}, show: { transition: { staggerChildren: entrance.stagger } } };
  const headingId = `${project.slug}-title`;

  return (
    <section
      id={project.slug}
      aria-labelledby={headingId}
      className={`project-section theme-${project.theme} relative scroll-mt-4 border-t border-neutral-800`}
      style={{ '--accent': project.accent } as CSSProperties}
    >
      <div aria-hidden="true" className="project-backdrop" />

      <MotionConfig reducedMotion="user">
        <motion.div
          className="project-grid relative mx-auto max-w-6xl px-6 py-20 md:py-28"
          data-reversed={reversed || undefined}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={group}
        >
          <motion.div variants={group} className="space-y-4 self-center [grid-area:text]">
            <motion.h2
              id={headingId}
              variants={title}
              className="text-3xl md:text-4xl font-bold font-display text-white"
            >
              {project.title}
            </motion.h2>
            <motion.div variants={item} className="h-px w-10 bg-(--accent)" />
            <motion.p variants={item} className="text-neutral-400 leading-relaxed">
              {project.description}
            </motion.p>
            <motion.ul variants={item} className="flex flex-wrap gap-2" aria-label="Built with">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="px-3 py-1 border border-neutral-700 text-neutral-400 clip-angular-sm text-sm font-mono"
                >
                  {tech}
                </li>
              ))}
            </motion.ul>
            <motion.div variants={item} className="flex gap-4 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 clip-angular-sm border border-neutral-500 px-6 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800 hover:border-(--accent) focus-visible:border-(--accent) focus-visible:outline-none"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 clip-angular-sm border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300 focus-visible:text-neutral-200 focus-visible:border-(--accent) focus-visible:outline-none"
              >
                <Code2 className="h-4 w-4" />
                Source Code
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="[grid-area:stage]">
            <ProjectPreview project={project} eager={eager} />
          </motion.div>

          <motion.div variants={item} className="scene-card clip-angular [grid-area:scene]">
            <ProjectScene theme={project.theme} />
          </motion.div>
        </motion.div>
      </MotionConfig>
    </section>
  );
}
