import Image from 'next/image';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export function ProjectCard({ project, reversed }: ProjectCardProps) {
  return (
    <section
      className={`flex flex-col ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } gap-8 md:gap-12 items-center py-12 border-b border-neutral-800 last:border-b-0`}
    >
      {/* Project image */}
      <div className="w-full md:w-1/2">
        <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-700 bg-neutral-800">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Project info */}
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white">
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
              className="px-3 py-1 border border-neutral-700 text-neutral-400 rounded-full text-sm font-medium"
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
            className="rounded-full border border-neutral-500 px-6 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800 hover:border-neutral-400"
          >
            Live Demo
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
          >
            Source Code
          </a>
        </div>
      </div>
    </section>
  );
}
