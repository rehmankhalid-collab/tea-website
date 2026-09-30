import { TeaLeaf } from "@/components/ui/tea-leaf";

/**
 * A small, still pile of loose leaves — the section's opening subject. Built
 * from the same `TeaLeaf` mark used elsewhere on the site (rather than a
 * photograph that doesn't exist yet), scattered tightly enough, and varied
 * enough in size, rotation and tone, to read as a handful of real leaves
 * rather than a repeated icon. Every leaf is static here; `data-ritual-leaf`
 * only lets the whole cluster move as one body (a slow camera approach), not
 * any individual leaf — restraint is the point.
 */
const LEAVES = [
  { top: "34%", left: "47%", width: "26%", rotate: "8deg", tone: "text-leaf" },
  { top: "26%", left: "31%", width: "21%", rotate: "-30deg", tone: "text-moss" },
  { top: "40%", left: "61%", width: "19%", rotate: "58deg", tone: "text-gold/80" },
  { top: "54%", left: "37%", width: "17%", rotate: "-16deg", tone: "text-stone/90" },
  { top: "48%", left: "52%", width: "15%", rotate: "104deg", tone: "text-leaf/80" },
  { top: "31%", left: "56%", width: "13%", rotate: "142deg", tone: "text-moss/70 blur-[0.5px]" },
  { top: "58%", left: "53%", width: "16%", rotate: "-64deg", tone: "text-leaf/90" },
] as const;

export function RitualLeaves() {
  return (
    <div
      data-ritual-leaves
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem]"
    >
      {/* Ground shadow — the same soft, wide contact shadow used under the
          hero's tin, grounding the leaves on an implied surface below. */}
      <div
        aria-hidden="true"
        className="absolute bottom-[16%] left-1/2 h-[10%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl"
      />
      {/* A faint warm wash standing in for a single raking light source,
          not a glow effect — low enough opacity to read as light, not haze. */}
      <div
        aria-hidden="true"
        className="absolute top-[8%] left-[10%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.16),transparent_72%)] blur-2xl"
      />

      {LEAVES.map((leaf, index) => (
        <TeaLeaf
          key={index}
          className={`absolute drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)] ${leaf.tone}`}
          style={{
            top: leaf.top,
            left: leaf.left,
            width: leaf.width,
            transform: `translate(-50%, -50%) rotate(${leaf.rotate})`,
          }}
        />
      ))}
    </div>
  );
}
