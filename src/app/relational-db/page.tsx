import Navbar from '@/components/ui/Navbar';
import RelationalDb from '@/components/sections/RelationalDb';

export default function RelationalDbPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <RelationalDb />

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
