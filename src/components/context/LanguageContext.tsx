"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  defaultLocale,
  isLocale,
  translations,
  type Locale,
  type TranslationDictionary,
} from '@/lib/i18n';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: TranslationDictionary;
};

const STORAGE_KEY = 'portfolio-locale';

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    let storedLocale: string | null = null;
    try {
      storedLocale = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Language selection remains available when storage is blocked.
    }
    if (storedLocale && isLocale(storedLocale)) {
      setLocaleState(storedLocale);
      return;
    }

    const browserLocale = navigator.language.split('-')[0].toLowerCase();
    if (isLocale(browserLocale)) {
      setLocaleState(browserLocale);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // The language still changes without persistence.
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleState,
      dict: translations[locale],
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
