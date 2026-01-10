// Purpose: Is this right for me?

import { Palette, Megaphone, Share2, Code, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";

const ServicesPage = () => {
    const services = [
        {
            slug: "branding",
            icon: Palette,
            title: "Branding",
            headline: "Build a brand people remember.",
            description: "We create clear, consistent brand identities — from logos to complete visual systems — so your business looks confident, credible, and future-ready.",
            area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
        },
        {
            slug: "web-development",
            icon: Code,
            title: "Web Development",
            headline: "Websites built to convert and scale.",
            description: "High-performance, responsive websites designed for speed, clarity, and growth — whether you’re launching, pivoting, or scaling.",
            area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/8/2/13]",
        },
        {
            slug: "advertising",
            icon: Megaphone,
            title: "Advertising",
            headline: "Campaigns with purpose and precision.",
            description: "Creative advertising strategies that cut through noise, attract the right audience, and drive measurable results.",
            area: "md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/5]",
        },
        {
            slug: "social-media",
            icon: Share2,
            title: "Social Media Marketing",
            headline: "Turn attention into engagement.",
            description: "We help brands build presence, consistency, and momentum across social platforms with content that connects and converts.",
            area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/5/3/8]",
        },
        {
            slug: "seo-analytics",
            icon: ChartBar,
            title: "SEO & Analytics",
            headline: "Decisions backed by data.",
            description: "We track, analyze, and optimize — ensuring your creative efforts are aligned with real business performance.",
            area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
        }
    ];

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
                        Expertise that drives growth.
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Everything we do is designed to help your brand grow, connect, and perform.
                    </p>
                </div>

                {/* Services Grid */}
                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                    {services.map((service, index) => (
                        <li
                            key={index}
                            className={`min-h-[14rem] list-none group relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 animate-fade-up ${service.area}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <Link to={`/services/${service.slug}`} className="block h-full">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-card/50 backdrop-blur-sm p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 transition-colors group-hover:bg-card/80">

                                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                                        {/* Icon */}
                                        <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                                            <service.icon className="w-5 h-5 text-foreground" />
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-3">
                                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground group-hover:text-primary transition-colors">
                                                {service.title}
                                            </h3>
                                            {/* Headline */}
                                            <p className="font-semibold text-sm md:text-base text-primary/80">
                                                {service.headline}
                                            </p>
                                            <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                                                {service.description}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn More <span className="ml-2">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ServicesPage;
