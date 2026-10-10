"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'heisenberg' | 'jesse';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('heisenberg');

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem('portfolio-theme');
    } catch {
      // Theme preference remains usable when browser storage is disabled.
    }
    if (savedTheme === 'jesse') {
      setTheme('jesse');
      document.documentElement.classList.add('theme-jesse');
    } else {
      document.documentElement.classList.remove('theme-jesse');
    }
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'heisenberg' ? 'jesse' : 'heisenberg';

    const switchTheme = () => {
      setTheme(nextTheme);
      try {
        localStorage.setItem('portfolio-theme', nextTheme);
      } catch {
        // The visual toggle still works without persistent browser storage.
      }
      if (nextTheme === 'jesse') {
        document.documentElement.classList.add('theme-jesse');
      } else {
        document.documentElement.classList.remove('theme-jesse');
      }
    };

    const docWithTransition = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    // Keyboard activation and reduced-motion requests should not trigger a
    // pointer-originating cinematic transition.
    if (
      !docWithTransition.startViewTransition ||
      event.detail === 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      switchTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = docWithTransition.startViewTransition(() => {
      switchTheme();
    });

    transition.ready.then(() => {
      if (!document.documentElement.animate) return;
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    }).catch(() => {
      // An interrupted view transition must not become an unhandled rejection.
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
