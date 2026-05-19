'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scrollY = useScrollPosition();
  const pathname = usePathname();

  const scrolled = scrollY > 50;
  const blurred = scrolled && !hovered && !mobileOpen;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      aria-label="Main navigation"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setHovered(false);
        }
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-2xl"
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 3000)}
    >
      {/* Background layer that blurs — sits behind content, doesn't block touches */}
      <div
        className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? 'bg-[#1a1a1a]/80 backdrop-blur-md border-neutral-700/50 shadow-lg shadow-black/20'
            : 'bg-[#1a1a1a]/60 backdrop-blur-sm border-neutral-800/50'
        } ${blurred ? 'opacity-40' : 'opacity-100'}`}
      />
      <div className="relative px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-neutral-100 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-0.5 tracking-tight">
            <span className="text-white font-extrabold">TN</span>
            <span className="text-emerald-400 font-black text-2xl leading-none -mt-0.5">1</span>
            <span className="text-white font-extrabold">DG</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-neutral-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-neutral-600 px-5 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800 hover:border-neutral-500"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-neutral-300 transition-transform ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-neutral-300 transition-opacity ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-neutral-300 transition-transform ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="relative md:hidden border-t border-neutral-700/50">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-neutral-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-neutral-600 px-5 py-2 text-sm font-medium text-neutral-200 text-center transition-colors hover:bg-neutral-800"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
