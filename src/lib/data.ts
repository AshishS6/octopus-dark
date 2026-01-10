export interface CaseStudy {
    slug: string;
    client: string;
    industry: string;
    services: string[];
    problem: string;
    strategy: string;
    execution: string[];
    outcome: string[];
    visuals: {
        hero: string;
        flow?: string;
        beforeAfter?: string;
    };
}

export const caseStudies: CaseStudy[] = [
    {
        slug: "brand-x",
        client: "Brand X",
        industry: "SaaS",
        services: ["Branding", "Web Design", "Development"],
        problem: "Brand X was struggling to convert enterprise clients due to a dated visual identity that didn't reflect their cutting-edge AI technology.",
        strategy: "We repositioned Brand X as the 'Operating System for the Future', creating a visual language based on clarity, precision, and depth.",
        execution: [
            "Completed a full brand identity overhaul including logo, typography, and color system",
            "Designed and developed a new marketing website with WebGL interactions",
            "Created a comprehensive design system for their product team"
        ],
        outcome: [
            "40% increase in enterprise demo requests within 3 months",
            "Coverage in TechCrunch and Awwwards Mention",
            "Reduced bounce rate by 25% on the homepage"
        ],
        visuals: {
            hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
            flow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop"
        }
    },
    {
        slug: "techflow-labs",
        client: "TechFlow Labs",
        industry: "Fintech",
        services: ["Product Design", "UX Research"],
        problem: "Users were dropping off during the complex onboarding process for their crypto trading platform.",
        strategy: "We simplified the onboarding flow by breaking it down into bite-sized, gamified steps that reduced cognitive load.",
        execution: [
            "Conducted user interviews to identify friction points",
            "Redesigned the onboarding UI with a focus on progress and rewards",
            "Implemented a 'learning mode' for new users"
        ],
        outcome: [
            "65% improvement in onboarding completion rate",
            "2x increase in first-week trading volume",
            "Customer support tickets related to signup dropped by 80%"
        ],
        visuals: {
            hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop"
        }
    },
    {
        slug: "biolife-health",
        client: "BioLife Health",
        industry: "Healthcare",
        services: ["Marketing Site", "SEO", "Content Strategy"],
        problem: "BioLife needed to launch a direct-to-consumer supplement line but lacked a digital presence.",
        strategy: "We built a trust-focused e-commerce experience that highlighed the scientific backing of their products.",
        execution: [
            "Developed a Shopify Plus storefront with custom headless frontend",
            "Created 3D product renders and educational animations",
            "Executed an SEO content strategy targeting health-conscious professionals"
        ],
        outcome: [
            "$50k revenue in the first month of launch",
            "3.5% conversion rate (industry avg 1.5%)",
            "Ranked #1 for key search terms within 4 months"
        ],
        visuals: {
            hero: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2370&auto=format&fit=crop"
        }
    }
];
