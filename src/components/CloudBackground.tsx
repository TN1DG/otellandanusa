'use client';

import { useScrollPosition } from '@/hooks/useScrollPosition';

const clouds = [
  { className: 'cloud cloud-1', top: '8%', left: '-200px', rate: 0.08, delay: '0s' },
  { className: 'cloud cloud-2', top: '20%', left: '-160px', rate: 0.15, delay: '-12s' },
  { className: 'cloud cloud-3', top: '35%', left: '-240px', rate: 0.05, delay: '-25s' },
  { className: 'cloud cloud-4', top: '55%', left: '-140px', rate: 0.12, delay: '-8s' },
  { className: 'cloud cloud-5', top: '70%', left: '-180px', rate: 0.07, delay: '-18s' },
  { className: 'cloud cloud-2', top: '85%', left: '-160px', rate: 0.1, delay: '-30s' },
];

export function CloudBackground() {
  const scrollY = useScrollPosition();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-white" />

      {/* Cloud layers */}
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className={cloud.className}
          style={{
            top: cloud.top,
            left: cloud.left,
            transform: `translateY(${scrollY * cloud.rate}px)`,
            animationDelay: cloud.delay,
          }}
        />
      ))}
    </div>
  );
}
