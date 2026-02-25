import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, MapPin } from "lucide-react";
import { awards } from "@/lib/data";

const heroInfo = {
  name: "Eduardo Sacahui",
  title: "AI Solution Architect & Technical Product Owner (Hands-on)",
  location: "Remote — Colombia / Guatemala (AMER)",
  emailUser: ["eduardo", ".sacahui"].join(""),
  emailDomain: ["gmail", ".com"].join(""),
  summary:
    "Arquitecto de Soluciones AI y Product Owner técnico con enfoque hands-on en entrega rápida de productos. Lidero definición funcional, arquitectura y desarrollo end-to-end de plataformas inteligentes basadas en LLMs, integraciones Google Workspace y orquestación con n8n bajo principios de seguridad (least privilege, backend-owned OAuth, trazabilidad y validación estricta de JSON). Capaz de convertir visión ejecutiva en MVPs demoables y rutas claras a producción, cubriendo UX, backend, calidad y operación.",
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

const heroEmail = `${heroInfo.emailUser}@${heroInfo.emailDomain}`;

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
            <div className="mt-8 max-w-4xl mx-auto rounded-lg border border-border/60 bg-card/40 p-5 text-left">
                <h2 className="text-base font-semibold text-primary">Professional Summary</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    {heroInfo.summary}
                </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{heroInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${heroEmail}`} className="hover:text-primary">{heroEmail}</a>
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
