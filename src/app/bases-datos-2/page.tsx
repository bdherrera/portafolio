import Navbar from '@/components/ui/Navbar';
import DatabaseTwo from '@/components/sections/DatabaseTwo';

export default function BasesDatos2Page() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <DatabaseTwo />

            <footer className="py-8 border-t border-primary-500/20 text-center">
                <p className="text-foreground/60">
                    Construido con dedicación usando Next.js, TypeScript y Tailwind CSS
                </p>
                <p className="text-foreground/40 text-sm mt-2">
                    Copyright {new Date().getFullYear()} - Todos los derechos reservados
                </p>
            </footer>
        </main>
    );
}
