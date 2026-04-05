/**
 * SignalMarquee — dual-direction discipline strip between sections.
 * Pure CSS animation (off main thread). Pauses on hover.
 */

const ROW_A = [
  "Design", "Development", "Strategy", "Branding",
  "Motion", "Web Apps", "Systems", "Identity",
  "Design", "Development", "Strategy", "Branding",
  "Motion", "Web Apps", "Systems", "Identity",
];

const ROW_B = [
  "Results", "Craft", "Precision", "Taste",
  "Detail", "Speed", "Clarity", "Depth",
  "Results", "Craft", "Precision", "Taste",
  "Detail", "Speed", "Clarity", "Depth",
];

const MarqueeRow = ({
  items,
  direction,
}: {
  items: string[];
  direction: "normal" | "reverse";
}) => (
  <div className="flex overflow-hidden group">
    {[0, 1].map((copy) => (
      <div
        key={copy}
        className="flex shrink-0"
        aria-hidden={copy === 1}
        style={{
          animation: `${direction === "normal" ? "marquee" : "marquee-reverse"} 45s linear infinite`,
          animationPlayState: "running",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[10px] text-white/[0.16] uppercase tracking-[0.28em] whitespace-nowrap px-5"
          >
            {item}
            <span className="mx-4 text-white/[0.07]">·</span>
          </span>
        ))}
      </div>
    ))}
  </div>
);

const SignalMarquee = () => (
  <div
    className="border-y border-white/[0.05] py-3 overflow-hidden bg-background select-none"
    style={{ cursor: "default" }}
  >
    <div className="space-y-2.5 [&:hover_div]:![animation-play-state:paused]">
      <MarqueeRow items={ROW_A} direction="normal" />
      <MarqueeRow items={ROW_B} direction="reverse" />
    </div>
  </div>
);

export default SignalMarquee;
