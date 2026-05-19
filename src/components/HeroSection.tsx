import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="text-neutral-500 font-medium text-lg mb-4 tracking-wide uppercase">
          Hello, I&apos;m
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Oluwatobi Tella Ndanusa
        </h1>
        <div className="w-16 h-px bg-neutral-600 mx-auto mb-6" />
        <p className="text-xl md:text-2xl text-neutral-300 mb-4">
          Builder &middot; Innovator &middot; Developer
        </p>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
          I don&apos;t just write code — I build products that solve real problems.
          From concept to launch, I turn bold ideas into working software
          that people actually use.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="rounded-full border border-neutral-500 px-8 py-3 text-lg font-medium text-white transition-all hover:bg-neutral-800 hover:border-neutral-400"
          >
            See What I&apos;ve Built
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-neutral-700 px-8 py-3 text-lg font-medium text-neutral-400 transition-all hover:bg-neutral-800 hover:text-neutral-200 hover:border-neutral-600"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
