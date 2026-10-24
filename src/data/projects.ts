/** Which motion scene, background and entrance a project's section uses. */
export type ProjectTheme =
  | 'night-rounds'
  | 'ledger'
  | 'sets'
  | 'route'
  | 'campaign'
  | 'ranking'
  | 'terminal';

export interface Project {
  id: number;
  /** Used as the section's anchor, e.g. /portfolio#swole. */
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  /** Omit when there is no public demo (e.g. the app needs a staff login). */
  liveUrl?: string;
  repoUrl: string;
  image: string;
  /** Intrinsic size of `image`. Defaults to the 385×764 phone screenshot. */
  imageWidth?: number;
  imageHeight?: number;
  theme: ProjectTheme;
  /** Accent colour for the project's section, taken from the product's own UI. */
  accent: string;
}

export const projects: Project[] = [
  {
    id: 5,
    slug: "supstaff",
    title: "Supstaff",
    theme: "night-rounds",
    accent: "#9ad4b8",
    description:
      "A records system for supported-living services, designed around the night shifts I work as a social care worker. It replaces paper handovers, the medication administration record (eMAR), night building checks and maintenance reports. Four roles are enforced on the server, signing off medication needs a PIN, and every change is written to an audit log in the same transaction. Screenshot shows seeded demo data.",
    techStack: ["Next.js 16", "TypeScript", "Drizzle", "PostgreSQL", "Auth.js"],
    repoUrl: "https://github.com/TN1DG/supstaff",
    image: "/images/projects/supstaff.jpg",
    imageWidth: 1440,
    imageHeight: 900,
  },
  {
    id: 7,
    slug: "boardready",
    title: "BoardReady",
    theme: "ledger",
    accent: "#8fa3ff",
    description:
      "Closes a startup's month on Seapoint and drafts its investor update, built so the language model never types a number. Code writes the exact arguments for every Seapoint query and the agent only runs them, read-only. The model writes placeholders, code fills in every figure, and any amount the model typed itself is flagged as unverified. A fix to the books runs only after a person clicks Approve, through a separate agent limited to two write tools, and every write is logged. Built on my own at the Seapoint FinOps Hackathon in London. Screenshot shows Seapoint staging data.",
    techStack: ["Python", "Claude Code CLI", "Seapoint MCP", "JavaScript"],
    repoUrl: "https://github.com/TN1DG/boardready",
    image: "/images/projects/boardready.jpg",
    imageWidth: 1440,
    imageHeight: 900,
  },
  {
    id: 6,
    slug: "swole",
    title: "Swole",
    theme: "sets",
    accent: "#ff7a3d",
    description:
      "A live workout and nutrition app. Log sets and track personal records, log food by hand or let a vision model estimate it from a photo, and train alongside friends with a feed, chat and streak challenges. A real-time Convex backend keeps a workout in sync across devices, and 441 automated tests run in CI on every push.",
    techStack: ["React", "TypeScript", "Convex", "Vercel AI SDK", "Vitest"],
    liveUrl: "https://swole.day",
    repoUrl: "https://github.com/TN1DG/swole",
    image: "/images/projects/swole.jpg",
    imageWidth: 500,
    imageHeight: 959,
  },
  {
    id: 1,
    slug: "bisride",
    title: "BiSRide",
    theme: "route",
    accent: "#33d66b",
    description:
      "A mobile delivery marketplace connecting businesses with riders in Lagos, Nigeria. Businesses post delivery requests and riders submit proposals — like a marketplace for last-mile delivery. Features real-time messaging, GPS tracking, a proposal system, and role-based dashboards for both businesses and riders.",
    techStack: ["Expo", "TypeScript", "Firebase", "Supabase", "Zustand"],
    liveUrl: "https://bisride.vercel.app",
    repoUrl: "https://github.com/TN1DG/BiSRide",
    image: "/images/projects/bisride.jpg",
  },
  {
    id: 2,
    slug: "get-more-diners",
    title: "Get More Diners",
    theme: "campaign",
    accent: "#f0804e",
    description:
      "A complete SaaS application for restaurant owners to attract more customers through AI-powered marketing campaigns. Features a full authentication system, restaurant dashboard with analytics, profile management, and AI-generated marketing content powered by OpenAI APIs.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI API"],
    liveUrl: "https://get-more-diners-gules.vercel.app",
    repoUrl: "https://github.com/TN1DG/get-more-diners",
    image: "/images/projects/get-more-diners.jpg",
  },
  {
    id: 3,
    slug: "ytg",
    title: "YTG Landing Page",
    theme: "ranking",
    accent: "#9b7bff",
    description:
      "A modern, responsive landing page for YTG — a portfolio validation and ranking platform. Built with a focus on conversions, featuring smooth Framer Motion animations, custom branding, clear CTAs, and full SEO optimization. Designed to be mobile-first and deployed on Vercel.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://ytg-landing-page-v2.vercel.app",
    repoUrl: "https://github.com/TN1DG/ytg-landing-page-v2",
    image: "/images/projects/ytg-landing.jpg",
  },
  {
    id: 4,
    slug: "nexus-todo",
    title: "Nexus Todo",
    theme: "terminal",
    accent: "#c46bff",
    description:
      "A cyberpunk-themed task management app with a futuristic interface featuring neon colors, glowing effects, and smooth animations. Supports priority levels, filtering, real-time stats, and local storage persistence — all built with zero dependencies using vanilla HTML, CSS, and JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://futuristic-todo-app.vercel.app",
    repoUrl: "https://github.com/TN1DG/futuristic-todo-app",
    image: "/images/projects/nexus-todo.jpg",
  },
];
