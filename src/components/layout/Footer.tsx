"use client";

import { Beaker, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEasterEgg } from '@/components/context/EasterEggContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/context/LanguageContext';

const Footer = () => {
    const { activateEasterEgg, isEasterEggEnabled, toggleEasterEggEnabled, deactivateEasterEgg } = useEasterEgg();
    const { dict } = useLanguage();

    const handleToggle = (checked: boolean) => {
        toggleEasterEggEnabled();
        if (!checked) {
            deactivateEasterEgg();
        }
    }

    return (
        <footer id="footer" className="border-t border-border/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © {new Date().getFullYear()} Eduardo Sacahui. {dict.footer.rightsReserved}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={activateEasterEgg}>
                                    <Beaker className="h-5 w-5" />
                                    <span className="sr-only">{dict.footer.easterEgg}</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{dict.footer.easterEgg}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div className="flex items-center space-x-2">
                        <Switch id="easter-egg-mode" checked={isEasterEggEnabled} onCheckedChange={handleToggle} />
                        <Label htmlFor="easter-egg-mode" className="text-sm text-muted-foreground">{dict.footer.animations}</Label>
                    </div>

                    <a href="https://github.com" target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="icon">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Button>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="icon">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Button>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
