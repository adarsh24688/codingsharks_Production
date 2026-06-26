import type { CSSProperties } from "react";

interface MicrositeShellProps {
  children: React.ReactNode;
  title: string;
  backHref?: string;
  backLabel?: string;
  theme?: { acc: string; ink: string };
}

/**
 * Injects the per-article accent/ink onto the article subtree.
 * Chrome (header/footer) + the base light theme come from app/blog/layout.tsx.
 */
export function MicrositeShell({ children, theme }: MicrositeShellProps) {
  const style = {
    "--acc": theme?.acc ?? "#ff6b2c",
    "--ink": theme?.ink ?? "#1b1b29",
  } as CSSProperties;

  return <div style={style}>{children}</div>;
}
