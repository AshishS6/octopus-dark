import { CheckCircle2 } from "lucide-react";

const WhoWeAre = () => {
  const highlights = [
    "Award-Winning Creative Team",
    "Data-Driven Strategies",
    "ROI-Focused Approach"
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Sleek Dark Background Setup */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-up">
            <div className="inline-block">
              <span className="text-sm font-medium text-white/50 uppercase tracking-widest">Who We Are</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight text-white tracking-tight">
              A creative studio where strategy, design, and technology converge.
            </h2>

            <p className="text-lg text-white/60 leading-relaxed font-light">
              We work with ambitious startups and global brands that want more than just aesthetics — they demand <strong className="text-white font-medium">clarity, consistency, and scalable results</strong>.
            </p>

            <p className="text-lg text-white/60 leading-relaxed font-light">
              From shaping iconic brand identities to engineering high-performance web applications and launching data-driven campaigns, we approach every project with uncompromising precision and intent.
            </p>

            {/* Highlights */}
            <div className="space-y-4 pt-6">
              {[
                "Strategy-first creative thinking",
                "Design that communicates, not decorates",
                "Technology engineered for scale"
              ].map((highlight, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/80 font-light tracking-wide">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Value Proposition / Proof Card */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              {/* Abstract subtle glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[120%] h-[120%] bg-white/[0.03] rounded-full blur-[100px]"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="text-7xl md:text-8xl font-heading font-light text-white mb-6 tracking-tighter">100<span className="text-white/40">%</span></div>
                <div className="text-xl md:text-2xl font-light text-white mb-4 tracking-wide">Client Satisfaction</div>
                <div className="w-12 h-px bg-white/20 mb-6"></div>
                <p className="text-white/50 max-w-[280px] mx-auto font-light leading-relaxed">
                  Built on long-term partnerships, not one-off projects. We measure success by tangible business outcomes.
                </p>
              </div>
            </div>

            {/* Decorative subtle border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-3xl blur-sm opacity-50 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
