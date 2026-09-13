'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export function ProjectCard({ project, reversed }: ProjectCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex flex-col ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } gap-8 md:gap-12 items-center py-12 border-b border-neutral-800 last:border-b-0`}
    >
      {/* Project image — shown in full at its real aspect ratio, never cropped */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="clip-angular overflow-hidden border border-neutral-700 bg-neutral-800 rgb-split-hover max-h-[70vh]">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={385}
            height={764}
            className="w-auto h-auto max-h-[70vh] object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Project info */}
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold font-display text-white">
          {project.title}
        </h3>
        <div className="w-10 h-px bg-neutral-600" />
        <p className="text-neutral-400 leading-relaxed">
          {project.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 border border-neutral-700 text-neutral-400 clip-angular-sm text-sm font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 clip-angular-sm border border-neutral-500 px-6 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800 hover:border-glitch-cyan"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 clip-angular-sm border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
          >
            <Code2 className="h-4 w-4" />
            Source Code
          </a>
        </div>
      </div>
    </motion.section>
  );
}
