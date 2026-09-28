/** Static, always-on atmosphere — no GSAP targets. Keeps the cinematic stage
 * from ever feeling like a stark, empty backdrop while staying out of the
 * way of the one thing the scene is about: the tin itself. */
export function CollectionBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_55%_at_50%_44%,rgba(166,184,110,0.14),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_105%,rgba(200,169,110,0.09),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55))]" />
      <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}
