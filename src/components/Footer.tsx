export function Footer() {
  return (
    <footer className="border-t border-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Oluwatobi Tella Ndanusa. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/oluwatobi-tella-ndanusa/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@example.com"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
