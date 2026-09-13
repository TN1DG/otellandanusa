import Image from 'next/image';

interface PageBackgroundProps {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

export function PageBackground({ desktopSrc, mobileSrc, alt }: PageBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-(--color-ground)">
      <Image
        src={mobileSrc}
        alt={alt}
        fill
        priority
        className="object-cover md:hidden"
        sizes="100vw"
      />
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        priority
        className="hidden object-cover md:block"
        sizes="100vw"
      />
      {/* Dark scrim so photo stays atmospheric, not competing with foreground text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-(--color-ground)/75 to-(--color-ground)/95" />
    </div>
  );
}
