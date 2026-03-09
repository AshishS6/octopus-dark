import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WorkSamples = () => {
  const [filter, setFilter] = useState("all");

  const categories = ["all", "branding", "web", "advertising", "social"];

  const projects = [
    { id: 1, title: "Brand Identity Design", category: "branding", image: "bg-white/5" },
    { id: 2, title: "E-commerce Platform", category: "web", image: "bg-white/10" },
    { id: 3, title: "Digital Campaign", category: "advertising", image: "bg-white/[0.08]" },
    { id: 4, title: "Social Media Strategy", category: "social", image: "bg-white/5" },
    { id: 5, title: "Corporate Website", category: "web", image: "bg-white/[0.03]" },
    { id: 6, title: "Brand Guidelines", category: "branding", image: "bg-white/[0.07]" },
  ];

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="work" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="text-sm font-medium text-white/50 uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium mt-4 mb-6 tracking-tight text-white">
            Selected Work
          </h2>
          <p className="text-lg text-white/50 font-light">
            A curated selection of our finest engineered experiences and strategic brand identities.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={filter === category
                ? "bg-white text-black hover:bg-white/90 rounded-full px-6"
                : "border-white/20 text-white hover:bg-white/10 rounded-full px-6 font-light"}
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
              className="group relative overflow-hidden bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-700 animate-scale-in cursor-pointer rounded-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-[4/3] ${project.image} relative overflow-hidden transition-transform duration-700 group-hover:scale-105`}>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-widest mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-heading font-medium text-white opacity-90 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    {project.title}
                  </h3>

                  {/* Subtle underline indicator instead of loud CTA */}
                  <div className="w-0 h-px bg-white mt-4 group-hover:w-12 transition-all duration-700 ease-out delay-200"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 animate-fade-up">
          <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 hover:text-white rounded-full px-8 py-6 font-light">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkSamples;
