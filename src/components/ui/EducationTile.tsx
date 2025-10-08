"use client";

import type { Education } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import RadioactiveIcon from "./RadioactiveIcon";
import { useEasterEgg } from "../context/EasterEggContext";
import { cn } from "@/lib/utils";

interface EducationTileProps {
    education: Education;
}

const EducationTile = ({ education }: EducationTileProps) => {
    const { isEasterEggEnabled } = useEasterEgg();

    return (
        <Card className={cn("relative overflow-hidden border-2 border-primary/50", isEasterEggEnabled && "animate-pulse-border")}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{education.title}</CardTitle>
                     {isEasterEggEnabled && <RadioactiveIcon className="h-6 w-6 text-primary/80" />}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{education.school}</p>
                <p className="text-sm font-semibold text-primary">{education.status}</p>
            </CardContent>
        </Card>
    );
}

export default EducationTile;
