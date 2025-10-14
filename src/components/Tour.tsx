
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import tourData from '@/data/tour.json';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TourProps {
  onComplete: () => void;
}

const Tour = ({ onComplete }: TourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const step = useMemo(() => tourData[currentStep], [currentStep]);
  const targetElement = useMemo(() => {
    if (typeof window === 'undefined' || !step) return null;
    return document.getElementById(step.targetId);
  }, [step]);
  
  useEffect(() => {
    setPopoverOpen(true);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.style.transition = 'box-shadow 0.3s ease-in-out';
      targetElement.style.boxShadow = '0 0 0 4px hsl(var(--primary))';
      targetElement.style.borderRadius = '8px';
    }

    return () => {
      if (targetElement) {
        targetElement.style.boxShadow = '';
      }
    };
  }, [currentStep, targetElement]);

  const handleNext = () => {
    if (currentStep < tourData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setPopoverOpen(false);
    onComplete();
  };
  
  if (!step || !targetElement) {
    return null;
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      </PopoverTrigger>
      <PopoverContent
        side={step.popoverSide as "top" | "bottom" | "left" | "right"}
        align="center"
        className="w-80 z-[101]"
        onInteractOutside={(e) => e.preventDefault()}
        sideOffset={15}
        ref={(node) => {
            if (node) {
              const rect = targetElement.getBoundingClientRect();
              const top = window.scrollY + rect.top + rect.height / 2 - node.offsetHeight / 2;
              const left = window.scrollX + rect.left + rect.width / 2 - node.offsetWidth / 2;
              
              if(step.popoverSide === 'top') {
                 node.style.top = `${window.scrollY + rect.top - node.offsetHeight - 15}px`;
                 node.style.left = `${left}px`;
              } else if (step.popoverSide === 'bottom') {
                 node.style.top = `${window.scrollY + rect.bottom + 15}px`;
                 node.style.left = `${left}px`;
              }
            }
          }}
      >
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold leading-none">{step.title}</h4>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleComplete}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
          <p className="text-sm text-muted-foreground">
            {step.content}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{currentStep + 1} / {tourData.length}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4"/> Prev
              </Button>
              <Button size="sm" onClick={handleNext}>
                {currentStep === tourData.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Tour;
