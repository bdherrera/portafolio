"use client";

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import Presentation from '@/components/sections/Presentation';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

const presentationVideoUrl = 'https://www.youtube.com/embed/WY1F14A5gKo';

export default function Home() {
  return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Presentation videoUrl={presentationVideoUrl} />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />

        {/* Footer */}
        <footer className="py-8 border-t border-primary-500/20 text-center">
          <p className="text-foreground/60">
            Construido con dedicacion usando Next.js, TypeScript y Tailwind CSS
          </p>
          <p className="text-foreground/40 text-sm mt-2">
            Copyright {new Date().getFullYear()} - Todos los derechos reservados
          </p>
        </footer>
      </main>
  );
}
