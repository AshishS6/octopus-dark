// Purpose: Is this right for me?

import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

// Placeholder data - in a real app this would come from the same data source/CMS
const serviceDetails = {
    "branding": {
        title: "Branding",
        headline: "Build a brand that demands attention.",
        description: "Your brand is more than a logo. It's the feeling you invoke. We help you define your voice, your look, and your story.",
        deliverables: ["Brand Strategy", "Visual Identity", "Voice & Tone", "Brand Guidelines", "Collateral Design"],
        caseStudyLink: "/work?category=Branding"
    },
    "web-development": {
        title: "Web Development",
        headline: "Websites that perform.",
        description: "We build fast, secure, and scalable websites that turn visitors into customers. No bloat, just performance.",
        deliverables: ["Custom Development", "CMS Integration", "E-commerce", "Performance Optimization", "Accessibility"],
        caseStudyLink: "/work?category=Web Design"
    },
    "advertising": {
        title: "Advertising",
        headline: "Campaigns that convert.",
        description: "Data-driven advertising strategies that reach your target audience and drive real business results.",
        deliverables: ["Paid Social", "Search (PPC)", "Display Advertising", "Campaign Strategy", "Creative Production"],
        caseStudyLink: "/work?category=Marketing"
    },
    "social-media": {
        title: "Social Media",
        headline: "Connect with your community.",
        description: "We help you build a loyal following and meaningful engagement through strategic content and community management.",
        deliverables: ["Content Strategy", "Community Management", "Social Analysis", "Influencer Marketing", "Creative Content"],
        caseStudyLink: "/work?category=Social"
    },
    "seo-analytics": {
        title: "SEO & Analytics",
        headline: "Growth you can measure.",
        description: "Stop guessing. We provide the data and insights you need to make informed decisions and improve your search rankings.",
        deliverables: ["Technical SEO", "Content Optimization", "Competitor Analysis", "Conversion Tracking", "Reporting Dashboards"],
        caseStudyLink: "/work?category=SEO"
    }
};

const ServiceDetail = () => {
    const { service } = useParams();
    const details = serviceDetails[service as keyof typeof serviceDetails];

    if (!details) {
        return <Navigate to="/services" replace />;
    }

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Back Link */}
                <Link to="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Services
                </Link>

                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-24 animate-fade-in">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Service Details</span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
                        {details.title}
                    </h1>
                    <p className="text-2xl md:text-3xl font-light text-primary/80 mb-6">
                        "{details.headline}"
                    </p>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {details.description}
                    </p>
                </div>

                {/* Deliverables */}
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-24 max-w-5xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-ocean opacity-20 blur-3xl rounded-full"></div>
                        <div className="relative bg-card/50 backdrop-blur-md border border-border rounded-3xl p-8 lg:p-12">
                            <h3 className="text-2xl font-heading font-bold mb-8">What you get</h3>
                            <ul className="space-y-4">
                                {details.deliverables.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle2 className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-8">
                        <h3 className="text-3xl font-heading font-bold">Why it matters</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            In today's digital landscape, {details.title.toLowerCase()} is not just a nice-to-have, it's a critical driver of business success. We take a strategic approach to ensure every dollar you spend delivers ROI.
                        </p>
                        <div className="pt-4">
                            <Button asChild variant="outline" size="lg" className="mr-4">
                                <Link to={details.caseStudyLink}>See Relevant Work</Link>
                            </Button>
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                <Link to="/start-project">Start {details.title} Project</Link>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServiceDetail;
