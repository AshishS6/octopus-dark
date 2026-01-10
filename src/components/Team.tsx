import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import AshishImg from "@/assets/Gemini_Generated_.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Saril KS",
      role: "Chief Creative Officer",
      bio: "Digital banking platform for SMEs, startups, freelancers and more customers."
    },
    {
      name: "Ashish S",
      role: "Developer",
      image: AshishImg,
      bio: "Crafting beautiful and functional experiences."
    },
    {
      name: "Nibin N",
      role: "Visual Designer",
      bio: "Creating stunning visuals that tell your story."
    },
    {
      name: "Ajmal S",
      role: "Developer",
      bio: "Building robust and scalable solutions."
    },
    {
      name: "Rythwik M",
      role: "Developer",
      bio: "Building scalable Tech solutions."
    }
  ];

  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Team</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
            Meet the Experts
          </h2>
          <p className="text-lg text-muted-foreground">
            A multidisciplinary team driven by curiosity, creativity, and problem-solving.
          </p>
          <p className="mt-4 text-muted-foreground/80">
            Designers, developers, strategists, and thinkers — collaborating to build meaningful digital work.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Avatar */}
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  {/* Icon or Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-24 h-24 text-primary/30" />
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Name and role on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-1 md:hidden">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3 md:hidden">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
