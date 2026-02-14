import Link from 'next/link';
import RelationalDb from '@/components/sections/RelationalDb';

export default function RelationalDbPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-accent-500" />
          <span className="text-foreground/70 text-sm">Portafolio</span>
        </div>
        <Link
          href="/"
          className="px-4 py-2 border border-primary-500/40 text-primary-400 rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
        >
          Volver al inicio
        </Link>
      </header>

      <RelationalDb />
    </main>
  );
}
