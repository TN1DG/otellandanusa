export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "BiSRide",
    description:
      "A mobile delivery marketplace connecting businesses with riders in Lagos, Nigeria. Businesses post delivery requests and riders submit proposals — like a marketplace for last-mile delivery. Features real-time messaging, GPS tracking, a proposal system, and role-based dashboards for both businesses and riders.",
    techStack: ["Expo", "TypeScript", "Firebase", "Supabase", "Zustand"],
    liveUrl: "https://bisride.vercel.app",
    repoUrl: "https://github.com/TN1DG/BiSRide",
    image: "/images/projects/bisride.svg",
  },
  {
    id: 2,
    title: "Get More Diners",
    description:
      "A complete SaaS application for restaurant owners to attract more customers through AI-powered marketing campaigns. Features a full authentication system, restaurant dashboard with analytics, profile management, and AI-generated marketing content powered by OpenAI APIs.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI API"],
    liveUrl: "https://get-more-diners-gules.vercel.app",
    repoUrl: "https://github.com/TN1DG/get-more-diners",
    image: "/images/projects/get-more-diners.svg",
  },
  {
    id: 3,
    title: "YTG Landing Page",
    description:
      "A modern, responsive landing page for YTG — a portfolio validation and ranking platform. Built with a focus on conversions, featuring smooth Framer Motion animations, custom branding, clear CTAs, and full SEO optimization. Designed to be mobile-first and deployed on Vercel.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://ytg-landing-page-v2.vercel.app",
    repoUrl: "https://github.com/TN1DG/ytg-landing-page-v2",
    image: "/images/projects/ytg-landing.svg",
  },
  {
    id: 4,
    title: "Nexus Todo",
    description:
      "A cyberpunk-themed task management app with a futuristic interface featuring neon colors, glowing effects, and smooth animations. Supports priority levels, filtering, real-time stats, and local storage persistence — all built with zero dependencies using vanilla HTML, CSS, and JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://futuristic-todo-app.vercel.app",
    repoUrl: "https://github.com/TN1DG/futuristic-todo-app",
    image: "/images/projects/nexus-todo.svg",
  },
];
