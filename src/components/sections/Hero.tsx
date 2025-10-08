import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, MapPin } from "lucide-react";
import { awards } from "@/lib/data";

const heroInfo = {
  name: "Eduardo Sacahui",
  title: "Platform Architect & Engineering Lead — AI-First Apps, Data Platforms, and Automation",
  location: "Remote — Colombia / Guatemala (AMER)",
  email: "eduardo.sacahui@gmail.com",
  languages: ["Spanish (Native)", "English (Proficient)", "Portuguese (Proficient)"],
  badges: [
    ...awards.map(a => `${a.title} (${a.date})`),
    "UiPath RPA Solution Architect", 
    "Microsoft Certified App Maker", 
    "Microsoft Data Analyst", 
    "Professional Python Developer", 
    "Harvard ManageMentor — Coaching"
  ],
};

const Hero = () => {
  return (
    <section id="hero" className="bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        
        <div className="container relative z-10 pt-20 pb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {heroInfo.name}
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
                {heroInfo.title}
            </p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{heroInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${heroInfo.email}`} className="hover:text-primary">{heroInfo.email}</a>
                </div>
            </div>
            <div className="mt-4 flex justify-center gap-2">
                {heroInfo.languages.map(lang => (
                    <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
            </div>
            <div className="mt-10 flex gap-4 justify-center">
                <Button size="lg" asChild>
                    <a href="/Eduardo_Sacahui_Resume.pdf" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                    </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <a href="#contact">Contact Me</a>
                </Button>
            </div>
             <div className="mt-8 max-w-4xl mx-auto">
                <p className="text-sm font-semibold text-muted-foreground mb-4">AWARDS & CERTIFICATIONS</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {heroInfo.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{badge}</Badge>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
