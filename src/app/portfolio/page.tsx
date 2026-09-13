import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { GitHubActivity } from "@/components/GitHubActivity";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Ideas I've brought to life — from concept to launch. Products and tools built to solve real problems.",
};

export default function PortfolioPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            What I&apos;ve Built
          </h1>
          <div className="w-16 h-px bg-neutral-600 mx-auto mb-6" />
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Every project starts with a problem worth solving. Here are
            some of the ideas I&apos;ve taken from zero to one.
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

        {/* Live GitHub activity */}
        <div className="mt-20 pt-16 border-t border-neutral-800">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-3">
              Recent Activity
            </h2>
            <p className="text-neutral-500 font-mono text-sm">
              Straight from{" "}
              <a
                href="https://github.com/TN1DG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-glitch-cyan hover:underline"
              >
                github.com/TN1DG
              </a>
            </p>
          </div>
          <GitHubActivity limit={6} />
        </div>
      </div>
    </div>
  );
}
