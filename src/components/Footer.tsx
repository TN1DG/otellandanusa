import { Code2, Briefcase, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500 font-mono">
          &copy; {new Date().getFullYear()} Oluwatobi Tella Ndanusa. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/TN1DG"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-glitch-cyan transition-colors"
          >
            <Code2 className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/oluwatobi-tella-ndanusa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-glitch-cyan transition-colors"
          >
            <Briefcase className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="mailto:otellandanusa@gmail.com"
            aria-label="Email"
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-glitch-cyan transition-colors"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
