import type { ReactNode, Ref } from 'react';

/**
 * The box every scene draws into. Screen readers get the label as a single
 * image description instead of the moving parts inside.
 */
export function SceneShell({
  sceneRef,
  label,
  className = '',
  children,
}: {
  sceneRef: Ref<HTMLDivElement>;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      ref={sceneRef}
      role="img"
      aria-label={label}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
