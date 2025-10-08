"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Migrations from '@/components/sections/Migrations';
import Experience from '@/components/sections/Experience';
import CaseStudies from '@/components/sections/CaseStudies';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import DetailDrawer from '@/components/DetailDrawer';
import { AnimatePresence } from 'framer-motion';

type DrawerContent = {
  type: 'skill' | 'project';
  id: string;
};

export default function Home() {
  const [drawerContent, setDrawerContent] = useState<DrawerContent | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setDrawerContent(null);
        return;
      }
      
      try {
        const [type, id] = hash.split('=');
        if ((type === 'skill' || type === 'project') && id) {
          setDrawerContent({ type, id });
        } else {
          setDrawerContent(null);
        }
      } catch (error) {
        setDrawerContent(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const openDrawer = (type: 'skill' | 'project', id: string) => {
    const newHash = `#${type}=${id}`;
    if (window.location.hash !== newHash) {
       window.location.hash = newHash;
    } else {
      // If hash is already set, update state directly
      setDrawerContent({ type, id });
    }
  };

  const closeDrawer = () => {
    // Check if there is content in drawer before changing hash
    if (drawerContent) {
      // Using history.pushState to avoid triggering hashchange and creating a loop
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    setDrawerContent(null);
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Skills onTileClick={(id) => openDrawer('skill', id)} />
        <Migrations onCardClick={(id) => openDrawer('project', id)} />
        <Experience />
        <CaseStudies onCardClick={(id) => openDrawer('project', id)} />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>
        {drawerContent && (
          <DetailDrawer
            content={drawerContent}
            isOpen={!!drawerContent}
            onClose={closeDrawer}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
