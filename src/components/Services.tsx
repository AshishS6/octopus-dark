import { Palette, Megaphone, Share2, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Branding",
      description: "Leverage our creative expertise and customizable brand identity solutions including logos, visual systems, and brand guidelines that resonate.",
      color: "from-primary to-primary/70"
    },
    {
      icon: Megaphone,
      title: "Advertisement",
      description: "Increase customer acquisition growth by targeting new segments and acquiring customers digitally with minimal overhead costs through strategic campaigns.",
      color: "from-accent to-accent/70"
    },
    {
      icon: Share2,
      title: "Social Media Managing",
      description: "See growth in engagement, reach, and conversions through expert social media management, content strategy, and community building.",
      color: "from-primary to-accent"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Build responsive, high-performance websites and web applications that deliver exceptional user experiences and drive business results.",
      color: "from-accent to-primary"
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-secondary/30">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">What We Do</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital solutions tailored to elevate your brand and drive measurable growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardContent className="p-8 relative">
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} relative`}>
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
