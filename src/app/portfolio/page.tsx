import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectSection } from "@/components/ProjectSection";
import { GitHubActivity } from "@/components/GitHubActivity";
import { PageBackground } from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Ideas I've brought to life — from concept to launch. Products and tools built to solve real problems.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-16 md:pt-24 pb-16 md:pb-24">
      <PageBackground
        desktopSrc="/images/backgrounds/portfolio-desktop.jpg"
        mobileSrc="/images/backgrounds/portfolio-mobile.jpg"
        alt=""
      />

      {/* Page header */}
      <div className="mx-auto max-w-6xl px-6 text-center mb-14 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
          What I&apos;ve Built
        </h1>
        <div className="w-16 h-px bg-neutral-600 mx-auto mb-6" />
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          Every project starts with a problem worth solving. Here are
          some of the ideas I&apos;ve taken from zero to one.
        </p>

        <nav aria-label="Projects on this page" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <a
                  href={`#${project.slug}`}
                  className="group inline-flex items-center gap-2 py-1 text-sm text-neutral-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                  style={{ "--accent": project.accent } as CSSProperties}
                >
                  <span className="h-2 w-2 bg-(--accent) transition-transform group-hover:rotate-45 group-focus-visible:rotate-45" />
                  <span className="border-b border-transparent group-focus-visible:border-(--accent)">
                    {project.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* One full-width section per project */}
      <div className="border-b border-neutral-800">
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            reversed={index % 2 === 1}
            eager={index === 0}
          />
        ))}
      </div>

      {/* Live GitHub activity */}
      <div className="mx-auto max-w-6xl px-6 mt-20">
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
  );
}
