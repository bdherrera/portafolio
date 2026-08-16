'use client';

import { motion } from 'framer-motion';
import {
    BookOpen,
    ClipboardList,
    Database,
    FileText,
    PlayCircle,
    UserRound,
    Video,
} from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const presentationVideoUrl = 'https://www.youtube.com/embed/l6gSzE8qGOE';

const sectionMenu = [
    { label: 'Presentación', href: '#presentacion-bd2', icon: Video },
    { label: 'Plan de trabajo', href: '#plan-bd2', icon: ClipboardList },
    { label: 'Evidencias', href: '#evidencias-bd2', icon: FileText },
];

const plannedTopics = [
    'Diseño físico de bases de datos',
    'Consultas SQL avanzadas',
    'Procedimientos, funciones y triggers',
    'Optimización y planes de ejecución',
];

const evidenceCategories = [
    {
        title: 'SQL',
        description: 'Consultas, ejercicios, laboratorios y resultados relacionados con SQL.',
    },
    {
        title: 'PL/SQL Scripts',
        description: 'Procedimientos, funciones, triggers, bloques anónimos y scripts PL/SQL.',
    },
    {
        title: 'NoSQL',
        description: 'Modelos, consultas y evidencias asociadas a bases de datos NoSQL.',
    },
    {
        title: 'Proyecto',
        description: 'Entregables, documentación y avances del proyecto de la asignatura.',
    },
];

export default function DatabaseTwo() {
    return (
        <section id="bases-datos-2" className="pt-24 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/10 text-primary-300 text-sm font-semibold mb-5">
                        <Database size={18} />
                        Portafolio académico
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-5">
                        <span className="text-gradient">Bases de Datos 2</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-foreground/70 leading-relaxed">
                        Sección preparada para documentar la presentación, el avance de la asignatura
                        y las evidencias que se irán integrando durante el curso.
                    </p>
                </motion.div>

                <motion.nav
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-14"
                    aria-label="Menú de Bases de Datos 2"
                >
                    {sectionMenu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary-500/20 bg-background/70 text-foreground/80 hover:border-primary-500/50 hover:text-primary-300 transition-colors"
                            >
                                <Icon size={18} />
                                <span className="font-medium">{item.label}</span>
                            </a>
                        );
                    })}
                </motion.nav>

                <motion.div
                    id="presentacion-bd2"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="scroll-mt-24 grid lg:grid-cols-[0.75fr_1.25fr] gap-8 mb-16"
                >
                    <div className="rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-8">
                        <div className="aspect-square max-w-[260px] mx-auto rounded-2xl border border-primary-500/20 bg-background/70 flex items-center justify-center mb-6">
                            <div className="text-center">
                                <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                    <UserRound size={58} className="text-white" />
                                </div>
                                <p className="text-3xl font-bold text-gradient">BH</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                            {personalInfo.name}
                        </h2>
                        <p className="text-center text-foreground/65 leading-relaxed">
                            {personalInfo.subtitle}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-primary-500/20 bg-background/70 overflow-hidden">
                        <div className="p-6 border-b border-primary-500/10">
                            <div className="flex items-center gap-3 mb-2">
                                <PlayCircle size={24} className="text-primary-400" />
                                <h2 className="text-2xl font-bold text-foreground">Presentación</h2>
                            </div>
                            <p className="text-foreground/65 leading-relaxed">
                                Video de presentación correspondiente a Bases de Datos 2.
                            </p>
                        </div>

                        <div className="aspect-video bg-black">
                            <iframe
                                src={presentationVideoUrl}
                                title="Video de presentación Bases de Datos 2"
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </motion.div>

                <div id="plan-bd2" className="scroll-mt-24 mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen size={28} className="text-accent-400" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Plan de trabajo</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {plannedTopics.map((topic, index) => (
                            <motion.div
                                key={topic}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.05 }}
                                className="rounded-xl border border-accent-500/15 bg-accent-500/10 p-5"
                            >
                                <p className="text-sm text-accent-300 font-semibold mb-3">
                                    Tema {index + 1}
                                </p>
                                <p className="text-foreground/80 leading-relaxed">{topic}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div id="evidencias-bd2" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText size={28} className="text-primary-400" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Evidencias</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {evidenceCategories.map((item) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35 }}
                                className="rounded-xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-6"
                            >
                                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                                <p className="text-sm text-foreground/65 leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="mt-5 rounded-lg border border-primary-500/15 bg-background/60 px-4 py-3 text-sm text-foreground/45">
                                    Sin evidencias cargadas por ahora.
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
