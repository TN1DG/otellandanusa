import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore my projects — from e-commerce platforms to AI interfaces. Full-stack applications built with modern technologies.",
};

export default function PortfolioPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Work
          </h1>
          <div className="w-16 h-px bg-neutral-600 mx-auto mb-6" />
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            A selection of projects I&apos;ve built. Each one taught me
            something new and pushed me to grow as a developer.
          </p>
        </div>

        {/* Project cards — alternating layout with line separators */}
        <div className="border-t border-neutral-800">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
