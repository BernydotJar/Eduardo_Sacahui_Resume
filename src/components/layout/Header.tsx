
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code, Rocket } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/context/LanguageContext";
import { isLocale, localeLabels } from "@/lib/i18n";

interface HeaderProps {
    onStartTour: () => void;
}

const Header = ({ onStartTour }: HeaderProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { locale, setLocale, dict } = useLanguage();

    const navLinks = [
        { href: "#skills", label: dict.header.nav.skills },
        { href: "#migrations", label: dict.header.nav.migrations },
        { href: "#experience", label: dict.header.nav.experience },
        { href: "#casestudies", label: dict.header.nav.caseStudies },
        { href: "#education", label: dict.header.nav.education },
    ];

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    const handleLocaleChange = (value: string) => {
        if (isLocale(value)) {
            setLocale(value);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <a href="#" className="mr-6 flex items-center space-x-2" aria-label={dict.header.goToTop}>
                    <Code className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span className="hidden font-bold sm:inline-block">Eduardo Sacahui</span>
                </a>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="transition-colors hover:text-foreground text-foreground/80">{link.label}</a>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end gap-2">
                    <div className="hidden md:block">
                        <Select value={locale} onValueChange={handleLocaleChange}>
                            <SelectTrigger className="h-9 w-[132px]" aria-label={dict.app.languageSelector}>
                                <SelectValue placeholder={dict.app.language} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">{localeLabels.en}</SelectItem>
                                <SelectItem value="es">{localeLabels.es}</SelectItem>
                                <SelectItem value="pt">{localeLabels.pt}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" size="sm" onClick={onStartTour} className="hidden sm:inline-flex">
                        <Rocket className="mr-2 h-4 w-4" />
                        {dict.header.tourTech}
                    </Button>
                    <Button asChild className="hidden sm:inline-flex">
                        <a href="#contact">{dict.header.contactMe}</a>
                    </Button>
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-nav"
                            >
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">{dict.header.menuToggle}</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav id="mobile-nav" className="grid gap-6 text-lg font-medium mt-8">
                                <a href="#" className="flex items-center gap-2 text-lg font-semibold" onClick={handleNavClick} aria-label={dict.header.goToTop}>
                                     <Code className="h-6 w-6 text-primary" aria-hidden="true" />
                                    <span>Eduardo Sacahui</span>
                                </a>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">{dict.app.language}</p>
                                    <Select value={locale} onValueChange={handleLocaleChange}>
                                        <SelectTrigger className="w-full" aria-label={dict.app.languageSelector}>
                                            <SelectValue placeholder={dict.app.language} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">{localeLabels.en}</SelectItem>
                                            <SelectItem value="es">{localeLabels.es}</SelectItem>
                                            <SelectItem value="pt">{localeLabels.pt}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {navLinks.map(link => (
                                    <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground" onClick={handleNavClick}>{link.label}</a>
                                ))}
                                <Button variant="outline" onClick={() => { onStartTour(); handleNavClick(); }}>
                                    <Rocket className="mr-2 h-4 w-4" />
                                    {dict.header.tourTech}
                                </Button>
                                <Button asChild onClick={handleNavClick}>
                                    <a href="#contact">{dict.header.contactMe}</a>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
