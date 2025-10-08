import { cn } from "@/lib/utils";
import React from "react";

const RadioactiveIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("lucide lucide-radioactive", className)}
            {...props}
        >
            <path d="M13.2 13.2a6.9 6.9 0 1 0-9.7 0 6.9 6.9 0 1 0 9.7 0" />
            <path d="M12 12.5 16 4.5" />
            <path d="m5.5 10 9 3.5" />
            <path d="m18.5 10-9 3.5" />
        </svg>
    );
};

export default RadioactiveIcon;
