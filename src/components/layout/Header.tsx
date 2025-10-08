"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code } from 'lucide-react';

const navLinks = [
    { href: "#skills", label: "Skills" },
    { href: "#migrations", label: "Migrations" },
    { href: "#experience", label: "Experience" },
    { href: "#casestudies", label: "Case Studies" },
    { href: "#education", label: "Education" },
];

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <a href="#" className="mr-6 flex items-center space-x-2">
                    <Code className="h-6 w-6 text-primary" />
                    <span className="hidden font-bold sm:inline-block">Eduardo Sacahui</span>
                </a>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">{link.label}</a>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end gap-2">
                    <Button asChild>
                        <a href="#contact">Contact Me</a>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium mt-8">
                                <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                                     <Code className="h-6 w-6 text-primary" />
                                    <span>Eduardo Sacahui</span>
                                </a>
                                {navLinks.map(link => (
                                    <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">{link.label}</a>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
