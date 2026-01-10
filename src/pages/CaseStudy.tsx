// Purpose: How do you think and execute?

import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/data";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const CaseStudy = () => {
    const { slug } = useParams();
    const project = caseStudies.find((p) => p.slug === slug);

    if (!project) {
        return <Navigate to="/work" replace />;
    }

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Back Link */}
                <Link to="/work" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Work
                </Link>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 animate-fade-in">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="text-sm font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">{project.industry}</span>
                            {project.services.map(s => (
                                <span key={s} className="text-sm text-muted-foreground border border-border px-3 py-1 rounded-full">{s}</span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            {project.client}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.problem}
                        </p>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                        <img src={project.visuals.hero} alt={project.client} className="object-cover w-full h-full" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                    </div>
                </div>

                {/* Challenge & Strategy */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-heading font-bold text-foreground">The Challenge</h3>
                        <p className="text-muted-foreground leading-loose">{project.problem} They needed a partner who could understand their technical complexity and translate it into a compelling narrative.</p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-heading font-bold text-foreground">Our Strategy</h3>
                        <p className="text-muted-foreground leading-loose">{project.strategy}</p>
                    </div>
                </div>

                {/* Execution & Visuals */}
                <div className="space-y-12 mb-24">
                    <h3 className="text-2xl font-heading font-bold text-center">Execution</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {project.execution.map((item, i) => (
                            <div key={i} className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">{i + 1}</div>
                                <p className="text-muted-foreground">{item}</p>
                            </div>
                        ))}
                    </div>
                    {project.visuals.flow && (
                        <div className="rounded-2xl overflow-hidden border border-border/50 my-12">
                            <img src={project.visuals.flow} alt="Project Flow" className="w-full h-auto" />
                        </div>
                    )}
                </div>

                {/* Outcomes */}
                <div className="bg-secondary/20 rounded-3xl p-8 md:p-12 mb-24 border border-border">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">The Outcome</h2>
                        <p className="text-muted-foreground">Tangible results that moved the needle.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {project.outcome.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-background/50 rounded-xl border border-border/50">
                                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                                <p className="font-medium text-lg">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center animate-fade-up">
                    <h2 className="text-3xl font-heading font-bold mb-6">Ready to get similar results?</h2>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto">
                        <Link to="/start-project">Start Similar Project</Link>
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default CaseStudy;
