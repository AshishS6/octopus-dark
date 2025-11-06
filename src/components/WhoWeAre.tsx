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
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Who We Are?
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a dynamic creative agency driving growth by targeting new segments and acquiring customers digitally with minimal overhead costs. Our expertise spans branding, web development, advertising, and social media management.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With a passion for innovation and a commitment to excellence, we transform ideas into impactful digital experiences that resonate with audiences and deliver measurable results.
            </p>

            {/* Highlights */}
            <div className="space-y-4 pt-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
              {/* Abstract decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-heading font-bold text-primary">100%</div>
                  <div className="text-xl font-medium text-foreground">Client Satisfaction</div>
                  <div className="text-muted-foreground">Committed to Excellence</div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-6 shadow-lg animate-float max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Fast Delivery</div>
                  <div className="text-sm text-muted-foreground">On time, every time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
