import { CheckCircle2 } from "lucide-react";

const WhoWeAre = () => {
  const highlights = [
    "Award-Winning Creative Team",
    "Data-Driven Strategies",
    "ROI-Focused Approach"
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        >
          <source src="/animations/hero video.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better content readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-up">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Who We Are</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Octopus Media is a creative studio where strategy, design, and technology come together.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              We work with startups and brands that want more than visuals — they want <strong className="text-foreground">clarity, consistency, and results</strong>.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              From shaping brand identities to building scalable websites and launching growth-driven campaigns, we approach every project with depth, intent, and adaptability — just like the ocean we’re inspired by.
            </p>

            {/* Highlights */}
            <div className="space-y-4 pt-4">
              {[
                "Strategy-first creative thinking",
                "Design that communicates, not decorates",
                "Technology built for performance and scale"
              ].map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Value Proposition / Proof Card */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
              {/* Abstract decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-5xl md:text-6xl font-heading font-bold text-primary mb-4">100%</div>
                <div className="text-2xl font-bold text-foreground mb-2">Client Satisfaction</div>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Built on long-term partnerships, not one-off projects. We measure success by outcomes — not just aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
