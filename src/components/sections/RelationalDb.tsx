'use client';

import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { relationalDbProjects } from '@/data/portfolio';

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
            </div>
        </section>
    );
}
