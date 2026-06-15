"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, MapPin, Trophy } from "lucide-react";
import { awards } from "@/lib/data";
import { useLanguage } from "@/components/context/LanguageContext";

const heroInfo = {
  name: "Eduardo Sacahui",
  emailUser: ["eduardo", ".sacahui"].join(""),
  emailDomain: ["gmail", ".com"].join(""),
  certBadges: [
    "UiPath RPA Solution Architect",
    "Microsoft Certified App Maker",
    "Microsoft Data Analyst",
    "Professional Python Developer",
    "Harvard ManageMentor — Coaching"
  ],
};

const heroEmail = `${heroInfo.emailUser}@${heroInfo.emailDomain}`;

// Quantified outcomes pulled from the experience record; labels live in i18n.
const impactStats = [
  { value: "10+", labelKey: "years" },
  { value: "3+", labelKey: "ai" },
  { value: "300%", labelKey: "roi" },
  { value: "$120K+", labelKey: "savings" },
  { value: "99.9%", labelKey: "uptime" },
  { value: "$50M+", labelKey: "transactions" },
] as const;

const Hero = () => {
  const { dict } = useLanguage();

  return (
    <section id="hero" className="bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-emerald-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

        <div className="container relative z-10 pt-20 pb-16 text-center">
            <h1
                aria-label={heroInfo.name}
                className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight text-foreground"
            >
                <span aria-hidden="true" className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
                    <span className="inline-flex items-center">
                        <span className="element-tile mr-1 px-2 py-1 leading-none">
                            <span className="element-tile-number">99</span>
                            Ed
                        </span>
                        <span>uardo</span>
                    </span>
                    <span className="inline-flex items-center">
                        <span className="element-tile mr-1 px-2 py-1 leading-none">
                            <span className="element-tile-number">16</span>
                            Sa
                        </span>
                        <span>cahui</span>
                    </span>
                </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
                {dict.hero.title}
            </p>
            <div className="mt-8 max-w-4xl mx-auto rounded-lg border border-border/60 bg-card/40 p-5 text-left">
                <h2 className="text-base font-semibold text-primary">{dict.hero.summaryHeading}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    {dict.hero.summary}
                </p>
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
                <p className="mb-4 font-code text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {dict.hero.statsHeading}
                </p>
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {impactStats.map(stat => (
                        <div
                            key={stat.labelKey}
                            className="rounded-md border border-primary/30 bg-card/60 px-3 py-4 transition-colors hover:border-primary/70"
                        >
                            <dd className="font-code text-2xl font-bold text-primary [text-shadow:0_0_14px_hsl(var(--primary)/0.5)]">
                                {stat.value}
                            </dd>
                            <dt className="mt-1 text-xs leading-4 text-muted-foreground">
                                {dict.hero.stats[stat.labelKey]}
                            </dt>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{dict.hero.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <a href={`mailto:${heroEmail}`} className="hover:text-primary">{heroEmail}</a>
                </div>
            </div>
            <div className="mt-4 flex justify-center gap-2">
                {dict.hero.languages.map(lang => (
                    <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
            </div>
            <div className="mt-10 flex gap-4 justify-center">
                <Button size="lg" asChild>
                    <a href="/Eduardo_Sacahui_Resume.pdf" download>
                        <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                        {dict.hero.downloadCv}
                    </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <a href="#contact">{dict.hero.contactMe}</a>
                </Button>
            </div>
             <div className="mt-8 max-w-4xl mx-auto border-t border-border/60 pt-6">
                <p className="text-sm font-semibold text-muted-foreground mb-4">{dict.hero.awardsAndCertifications}</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {awards.map(award => (
                        <Badge
                            key={award.title}
                            variant="outline"
                            className="border-hazmat/60 text-xs text-hazmat [box-shadow:0_0_10px_hsl(var(--hazmat)/0.25)]"
                        >
                            <Trophy className="mr-1 h-3 w-3" aria-hidden="true" />
                            {`${award.title} (${award.date})`}
                        </Badge>
                    ))}
                    {heroInfo.certBadges.map(badge => (
                        <Badge key={badge} variant="outline" className="text-xs">{badge}</Badge>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
