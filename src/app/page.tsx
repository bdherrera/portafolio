﻿import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import RelationalDb from '@/components/sections/RelationalDb';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <RelationalDb />
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
