import { Palette, Megaphone, Share2, Code, ChartBar } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Sleek Minimal Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-up">
          <span className="text-sm font-medium text-white/50 uppercase tracking-widest">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium mt-6 mb-8 tracking-tight text-white leading-tight">
            Engineered to scale. Designed to perform.
          </h2>
          <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">
            Comprehensive digital solutions that elevate your brand and drive measurable business outcomes.
          </p>
        </div>

        {/* Services Grid */}
        <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[36rem] xl:grid-rows-2">
          {[
            {
              icon: Palette,
              title: "Brand Architecture",
              headline: "Iconic, memorable identities.",
              description: "We build authoritative brand systems — from core messaging to visual language — ensuring confident positioning in competitive markets.",
              area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
            },
            {
              icon: Code,
              title: "Digital Platforms",
              headline: "High-performance web applications.",
              description: "Robust, scalable, and obsessively engineered digital products designed for speed, security, and exceptional user experience.",
              area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/8/2/13]",
            },
            {
              icon: Megaphone,
              title: "Strategic Campaigns",
              headline: "Precision-targeted marketing.",
              description: "Data-driven advertising strategies built to acquire users, enhance lifetime value, and maximize return on ad spend.",
              area: "md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/5]",
            },
            {
              icon: Share2,
              title: "Growth & Social",
              headline: "Building audience momentum.",
              description: "Cultivating engaged communities and driving viral growth through intelligent, platform-native content strategies.",
              area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/5/3/8]",
            },
            {
              icon: ChartBar,
              title: "Data & Analytics",
              headline: "Decisions backed by truth.",
              description: "Advanced tracking architectures and actionable intelligence that turn raw data into significant business leverage.",
              area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
            }
          ].map((service, index) => (
            <li
              key={index}
              className={`min-h-[16rem] list-none group relative h-full rounded-[1.5rem] border border-white/5 p-2 animate-fade-up ${service.area}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 transition-colors duration-500 group-hover:bg-white/[0.04]">
                <div className="relative flex flex-1 flex-col justify-between gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <service.icon className="w-5 h-5 text-white/90" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-heading font-medium tracking-tight text-white group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-medium text-white/70 tracking-wide text-sm">
                      {service.headline}
                    </p>
                    <p className="font-light text-white/50 leading-relaxed text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul> {/* End of list */}
      </div>
    </section>
  );
};

export default Services;
