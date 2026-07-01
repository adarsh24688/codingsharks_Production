"use client";

// Minimal, self-contained global error boundary (renders its own <html>/<body>).
// No shared/context imports — avoids the null React dispatcher that crashed the
// default global-error during static prerender.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}>
        <div style={{ textAlign: "center", padding: 24, maxWidth: 480 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#d24509",
            }}>
            Error
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "12px 0" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "10px 24px",
              borderRadius: 9999,
              border: "none",
              background: "#d24509",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
