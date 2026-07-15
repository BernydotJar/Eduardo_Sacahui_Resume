"use client";

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/context/LanguageContext';
import { isLocale, localeLabels } from '@/lib/i18n';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, dict } = useLanguage();

  const navLinks = [
    { href: '#products', label: dict.header.nav.products },
    { href: '#platforms', label: dict.header.nav.platforms },
    { href: '#approach', label: dict.header.nav.approach },
    { href: '#leadership', label: dict.header.nav.leadership },
    { href: '#engagements', label: dict.header.nav.engagements },
    { href: '#contact', label: dict.header.nav.contact },
  ];

  const handleLocaleChange = (value: string) => {
    if (isLocale(value)) setLocale(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/72">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <a href="#hero" className="mr-6 flex items-center gap-2.5" aria-label={dict.header.goToTop}>
          <span className="element-tile h-8 w-8 text-sm font-bold" aria-hidden="true">
            <span className="element-tile-number text-[8px]">99</span>
            Ed
          </span>
          <span className="hidden leading-tight sm:block">
            <strong className="block text-sm">Eduardo Sacahui</strong>
            <span className="block font-code text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{dict.header.brandTagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 text-xs xl:flex" aria-label={dict.header.primaryNavLabel}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="font-medium text-foreground/70 transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <Select value={locale} onValueChange={handleLocaleChange}>
              <SelectTrigger className="h-9 w-[126px]" aria-label={dict.app.languageSelector}>
                <SelectValue placeholder={dict.app.language} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{localeLabels.en}</SelectItem>
                <SelectItem value="es">{localeLabels.es}</SelectItem>
                <SelectItem value="pt">{localeLabels.pt}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">{dict.header.contactMe}</a>
          </Button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-expanded={mobileMenuOpen} aria-controls="mobile-nav">
                <Menu className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{dict.header.menuToggle}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav id="mobile-nav" className="mt-8 grid gap-5 text-lg font-medium" aria-label={dict.header.mobileNavLabel}>
                <a href="#hero" className="flex items-center gap-3 text-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>
                  <span className="element-tile h-9 w-9 text-sm font-bold" aria-hidden="true">
                    <span className="element-tile-number text-[8px]">99</span>
                    Ed
                  </span>
                  Eduardo Sacahui
                </a>
                <div className="space-y-2 border-y border-border py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{dict.app.language}</p>
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
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </a>
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
