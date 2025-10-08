"use client";

import { Beaker, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEasterEgg } from '@/components/context/EasterEggContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Footer = () => {
    const { activateEasterEgg, isEasterEggEnabled, toggleEasterEggEnabled, deactivateEasterEgg } = useEasterEgg();

    const handleToggle = (checked: boolean) => {
        toggleEasterEggEnabled();
        if (!checked) {
            deactivateEasterEgg();
        }
    }

    return (
        <footer className="border-t border-border/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © {new Date().getFullYear()} Eduardo Sacahui. All Rights Reserved.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={activateEasterEgg}>
                                    <Beaker className="h-5 w-5" />
                                    <span className="sr-only">Yeah, Science!</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Yeah, Science!</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div className="flex items-center space-x-2">
                        <Switch id="easter-egg-mode" checked={isEasterEggEnabled} onCheckedChange={handleToggle} />
                        <Label htmlFor="easter-egg-mode" className="text-sm text-muted-foreground">Animations</Label>
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
