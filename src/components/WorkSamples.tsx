import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WorkSamples = () => {
  const [filter, setFilter] = useState("all");

  const categories = ["all", "branding", "web", "advertising", "social"];

  const projects = [
    { id: 1, title: "Brand Identity Design", category: "branding", image: "bg-gradient-to-br from-primary to-primary/50" },
    { id: 2, title: "E-commerce Platform", category: "web", image: "bg-gradient-to-br from-accent to-accent/50" },
    { id: 3, title: "Digital Campaign", category: "advertising", image: "bg-gradient-to-br from-primary to-accent" },
    { id: 4, title: "Social Media Strategy", category: "social", image: "bg-gradient-to-br from-accent to-primary" },
    { id: 5, title: "Corporate Website", category: "web", image: "bg-gradient-to-br from-primary/70 to-accent/70" },
    { id: 6, title: "Brand Guidelines", category: "branding", image: "bg-gradient-to-br from-accent/70 to-primary/70" },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="work" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
            Work Samples
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our latest projects and see how we transform ideas into reality.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={filter === category ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/10"}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-[4/3] ${project.image} relative overflow-hidden`}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <span>View Project</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-up">
          <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkSamples;
