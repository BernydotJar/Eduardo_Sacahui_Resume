"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface EasterEggContextType {
  isEasterEggActive: boolean;
  activateEasterEgg: () => void;
  deactivateEasterEgg: () => void;
  isEasterEggEnabled: boolean;
  toggleEasterEggEnabled: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isEasterEggEnabled, setIsEasterEggEnabled] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const activateEasterEgg = useCallback(() => {
    if (!isEasterEggEnabled) return;
    
    setIsEasterEggActive(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setIsEasterEggActive(false);
    }, 10000);
    setTimeoutId(newTimeoutId);
  }, [isEasterEggEnabled, timeoutId]);

  const deactivateEasterEgg = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsEasterEggActive(false);
    setTimeoutId(null);
  }, [timeoutId]);

  const toggleEasterEggEnabled = useCallback(() => {
    setIsEasterEggEnabled(prev => {
        const newState = !prev;
        if (!newState) {
            deactivateEasterEgg();
        }
        return newState;
    });
  }, [deactivateEasterEgg]);


  return (
    <EasterEggContext.Provider value={{ isEasterEggActive, activateEasterEgg, deactivateEasterEgg, isEasterEggEnabled, toggleEasterEggEnabled }}>
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEgg = () => {
  const context = useContext(EasterEggContext);
  if (context === undefined) {
    throw new Error('useEasterEgg must be used within an EasterEggProvider');
  }
  return context;
};
