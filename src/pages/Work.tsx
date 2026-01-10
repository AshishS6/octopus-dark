// Purpose: Have you solved problems like mine?

import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/data";

const Work = () => {
    const [filter, setFilter] = useState("all");

    const categories = ["all", "Branding", "Web Design", "Development", "Product Design", "Marketing", "SEO"];

    const filteredProjects = filter === "all"
        ? caseStudies
        : caseStudies.filter(project => project.services.some(service => service.includes(filter)));

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Work</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
                        Selected Projects
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        We don't just design. We solve business problems with creativity and technology.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={filter === category ? "default" : "outline"}
                            onClick={() => setFilter(category)}
                            className={filter === category ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/10"}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredProjects.map((project, index) => (
                        <Link to={`/work/${project.slug}`} key={project.slug}>
                            <Card
                                className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 animate-scale-in h-full flex flex-col"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Project Image Placeholder */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                                    <img
                                        src={project.visuals.hero}
                                        alt={project.client}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Content on hover */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {project.industry}
                                        </span>
                                        <div className="flex items-center gap-2 mt-auto text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 font-bold">
                                            <span>View Case Study</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {project.client}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.services.slice(0, 3).map(s => (
                                            <span key={s} className="text-xs text-muted-foreground border border-border px-2 py-1 rounded-full">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">No projects found for this category.</p>
                        <Button variant="link" onClick={() => setFilter("all")} className="mt-4 text-primary">View all projects</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Work;
