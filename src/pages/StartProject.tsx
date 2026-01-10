// Purpose: What happens if I contact you?

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const StartProject = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        type: [] as string[],
        budget: "",
        timeline: "",
        details: ""
    });

    const projectTypes = ["Branding", "Web Design", "Development", "Marketing", "App Design", "Other"];
    const budgets = ["< $10k", "$10k - $25k", "$25k - $50k", "$50k - $100k", "> $100k"];
    const timelines = ["ASAP", "1-3 Months", "3-6 Months", "Flexible"];

    const toggleType = (type: string) => {
        setFormData(prev => ({
            ...prev,
            type: prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        toast({
            title: "Request Received",
            description: "We'll be in touch within 24 hours to schedule a discovery call.",
        });
    };

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">

                {/* Header */}
                <div className="mb-16 animate-fade-up">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Start a Project</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
                        Let's build something extraordinary.
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        We take on a limited number of projects each year to ensure maximum focus and quality.
                        Tell us about your vision.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12 animate-fade-in delay-100">

                    {/* 1. Project Type */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-heading font-semibold">1. What can we help you with?</h3>
                        <div className="flex flex-wrap gap-4">
                            {projectTypes.map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => toggleType(type)}
                                    className={`px-6 py-3 rounded-full border transition-all duration-300 ${formData.type.includes(type)
                                            ? "bg-primary/20 border-primary text-primary"
                                            : "bg-card border-border text-muted-foreground hover:border-primary/50"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Project Details */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-heading font-semibold">2. Project Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="bg-card border-border focus:border-primary h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="bg-card border-border focus:border-primary h-12"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Company / Organization</label>
                                <Input
                                    placeholder="Company Name"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    className="bg-card border-border focus:border-primary h-12"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Global Context */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-heading font-semibold">3. Budget Range</h3>
                            <div className="space-y-3">
                                {budgets.map(b => (
                                    <label key={b} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.budget === b ? "border-primary" : "border-muted-foreground group-hover:border-primary"}`}>
                                            {formData.budget === b && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="budget"
                                            value={b}
                                            checked={formData.budget === b}
                                            onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                            className="hidden"
                                        />
                                        <span className={`${formData.budget === b ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{b}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-heading font-semibold">4. Approx. Timeline</h3>
                            <div className="space-y-3">
                                {timelines.map(t => (
                                    <label key={t} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.timeline === t ? "border-primary" : "border-muted-foreground group-hover:border-primary"}`}>
                                            {formData.timeline === t && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="timeline"
                                            value={t}
                                            checked={formData.timeline === t}
                                            onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                                            className="hidden"
                                        />
                                        <span className={`${formData.timeline === t ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{t}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 5. Additional Details */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-heading font-semibold">5. Anything else?</h3>
                        <Textarea
                            placeholder="Tell us about your project goals, competitors, or any specific requirements..."
                            value={formData.details}
                            onChange={e => setFormData({ ...formData, details: e.target.value })}
                            className="bg-card border-border focus:border-primary min-h-[150px]"
                        />
                    </div>

                    <div className="pt-8">
                        <Button type="submit" size="lg" className="w-full md:w-auto text-lg px-12 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground group">
                            Submit Project Request
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <p className="mt-4 text-sm text-muted-foreground text-center md:text-left">
                            We respect your privacy. Non-disclosure agreements available upon request.
                        </p>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default StartProject;
