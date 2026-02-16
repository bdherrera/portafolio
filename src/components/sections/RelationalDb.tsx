'use client';

import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { relationalDbProjects } from '@/data/portfolio';

const evidenceCategories = [
    {
        title: 'Modelado',
        description: 'Evidencias en construccion.',
    },
    {
        title: 'Normalizacion',
        description: 'Evidencias en construccion.',
    },
    {
        title: 'SQL',
        description: 'Evidencias en construccion.',
    },
    {
        title: 'Proyecto',
        description: 'Evidencias en construccion.',
    },
];

const evidenceImages = [
    {
        title: 'Modelo ER - Hospital',
        description: 'Modelo entidad-relacion de hospital.',
        src: '/images/evidencias/hospital.jpeg',
    },
    {
        title: 'Modelo ER - Biblioteca',
        description: 'Modelo entidad-relacion de biblioteca.',
        src: '/images/evidencias/biblioteca.jpeg',
    },
];

export default function RelationalDb() {
    return (
        <section id="relational-db" className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 grid-background opacity-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Bases de datos relacionales</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                    <p className="text-foreground/60 mt-4 text-lg">
                        Proyectos academicos de modelado relacional en Bases de Datos 1
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {relationalDbProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-primary-500/20 rounded-lg">
                                    <Database className="text-primary-400" size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                                    {project.course && (
                                        <p className="text-sm text-foreground/60">{project.course}</p>
                                    )}
                                </div>
                            </div>

                            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-primary-500/5 border border-primary-500/20 mb-4">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/50 text-sm">
                                        Imagen pendiente
                                    </div>
                                )}
                            </div>

                            <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                                {project.description}
                            </p>

                            {project.tags && project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-xs text-foreground/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Evidencias */}
                <motion.div
                    id="evidencias"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                            Evidencias
                        </h3>
                        <p className="text-foreground/60">
                            Accesos a categorias de evidencias para bases de datos relacionales.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {evidenceCategories.map((category) => (
                            <span
                                key={category.title}
                                className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-sm text-foreground/80"
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        {evidenceImages.map((evidence) => (
                            <div
                                key={evidence.title}
                                className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-semibold text-foreground">
                                        {evidence.title}
                                    </h4>
                                </div>
                                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-white/70 border border-primary-500/20">
                                    <img
                                        src={evidence.src}
                                        alt={evidence.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="text-sm text-foreground/60 mt-3">
                                    {evidence.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {evidenceCategories.map((category) => (
                            <div
                                key={category.title}
                                className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20"
                            >
                                <h4 className="text-lg font-semibold text-foreground mb-2">
                                    {category.title}
                                </h4>
                                <p className="text-sm text-foreground/60">
                                    {category.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
