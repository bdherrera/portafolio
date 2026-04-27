'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface PresentationProps {
    videoUrl?: string;
    title?: string;
    description?: string;
}

const defaultTitle = 'Presentacion';
const defaultDescription = 'Conoce en pocos minutos mi perfil, experiencia y enfoque de trabajo.';

export default function Presentation({
    videoUrl,
    title = defaultTitle,
    description = defaultDescription,
}: PresentationProps) {
    return (
        <section id="presentation" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">{title}</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                    <p className="text-lg text-foreground/70 mt-6 max-w-2xl mx-auto">
                        {description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-4 md:p-6"
                >
                    {videoUrl ? (
                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black/40">
                            <iframe
                                src={videoUrl}
                                title="Video de presentacion"
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="aspect-video w-full rounded-xl bg-black/40 flex items-center justify-center text-foreground/70">
                            <div className="flex items-center gap-3">
                                <Play size={28} className="text-primary-400" />
                                <span></span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}