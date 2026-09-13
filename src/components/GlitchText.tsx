'use client';

import { useEffect, useState, type ElementType } from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  trigger?: 'mount' | 'hover';
}

export function GlitchText({ text, as: Tag = 'span', className = '', trigger = 'mount' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(trigger === 'mount');

  useEffect(() => {
    if (trigger !== 'mount') return;
    const timeout = setTimeout(() => setGlitching(false), 500);
    return () => clearTimeout(timeout);
  }, [trigger]);

  const offsets = glitching
    ? [
        { x: -2, y: 0 },
        { x: 2, y: 1 },
        { x: -1, y: -1 },
        { x: 0, y: 0 },
      ]
    : [{ x: 0, y: 0 }];

  return (
    <Tag
      className={`relative inline-block ${className}`}
      onMouseEnter={trigger === 'hover' ? () => setGlitching(true) : undefined}
      onMouseLeave={trigger === 'hover' ? () => setGlitching(false) : undefined}
    >
      <span aria-hidden="true" className="absolute inset-0 pointer-events-none text-glitch-cyan mix-blend-screen">
        <motion.span
          className="block"
          animate={{ x: offsets.map((o) => o.x), y: offsets.map((o) => o.y) }}
          transition={{ duration: 0.4, repeat: glitching ? Infinity : 0, repeatType: 'mirror' }}
        >
          {text}
        </motion.span>
      </span>
      <span aria-hidden="true" className="absolute inset-0 pointer-events-none text-glitch-magenta mix-blend-screen">
        <motion.span
          className="block"
          animate={{ x: offsets.map((o) => -o.x), y: offsets.map((o) => -o.y) }}
          transition={{ duration: 0.4, repeat: glitching ? Infinity : 0, repeatType: 'mirror' }}
        >
          {text}
        </motion.span>
      </span>
      <span className="relative">{text}</span>
    </Tag>
  );
}
