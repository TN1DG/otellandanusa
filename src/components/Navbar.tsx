'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useContactModal } from '@/context/ContactModalContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scrollY = useScrollPosition();
  const pathname = usePathname();
  const { openModal } = useContactModal();

  const scrolled = scrollY > 50;
  const blurred = scrolled && !hovered && !mobileOpen;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
  ];

  function handleTalkClick() {
    setMobileOpen(false);
    openModal();
  }

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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl clip-angular"
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 3000)}
    >
      {/* Background layer that blurs — sits behind content, doesn't block touches */}
      <div
        className={`absolute inset-0 clip-angular border transition-all duration-500 ${
          scrolled
            ? 'bg-(--color-ground)/80 backdrop-blur-md border-neutral-700/50 shadow-lg shadow-black/20'
            : 'bg-(--color-ground)/60 backdrop-blur-sm border-neutral-800/50'
        } ${blurred ? 'opacity-40' : 'opacity-100'}`}
      />
      <div className="relative px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-neutral-100 hover:text-white transition-colors"
        >
          <motion.span
            whileHover={{ x: [0, -1.5, 1.5, -1, 0] }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-0.5 tracking-tight font-display"
          >
            <span className="text-white font-extrabold">TN</span>
            <span className="text-glitch-cyan font-black text-2xl leading-none -mt-0.5">1</span>
            <span className="text-white font-extrabold">D</span>
            <span className="text-glitch-magenta font-mono font-medium lowercase text-base ml-0.5">creator</span>
          </motion.span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium font-mono uppercase tracking-wide transition-colors hover:text-white ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-neutral-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleTalkClick}
            className="clip-angular-sm border border-neutral-600 px-5 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800 hover:border-glitch-cyan"
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-neutral-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <motion.span
            key={mobileOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative md:hidden border-t border-neutral-700/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium font-mono uppercase tracking-wide transition-colors hover:text-white ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-neutral-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleTalkClick}
                className="clip-angular-sm border border-neutral-600 px-5 py-2 text-sm font-medium text-neutral-200 text-center transition-colors hover:bg-neutral-800"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
