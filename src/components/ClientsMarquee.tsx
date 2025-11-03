const ClientsMarquee = () => {
  const clients = [
    "Brother", "Canon", "Dell", "Develop", "Epson",
    "Kodak", "Konica Minolta", "Kyocera", "Lexmark",
    "Memorex", "OKI", "Panasonic", "Philips"
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary/20 relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Trusted By</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-4">
            Our Clients
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/20 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/20 to-transparent z-10"></div>

        {/* First Row - Left to Right */}
        <div className="flex overflow-hidden mb-8">
          <div className="flex animate-marquee">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-32 h-20 flex items-center justify-center bg-card/50 rounded-lg border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <span className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {client}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden="true">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`row1-duplicate-${index}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-32 h-20 flex items-center justify-center bg-card/50 rounded-lg border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <span className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {client}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee" style={{ animationDirection: "reverse" }}>
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-32 h-20 flex items-center justify-center bg-card/50 rounded-lg border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <span className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {client}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee" style={{ animationDirection: "reverse" }} aria-hidden="true">
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
              <div
                key={`row2-duplicate-${index}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-32 h-20 flex items-center justify-center bg-card/50 rounded-lg border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <span className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {client}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
