'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, TrendingUp } from 'lucide-react';
import { projects } from '@/data/portfolio';

export default function Projects() {
    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <section id="projects" className="py-20 relative overflow-hidden">
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
                        <span className="text-gradient">Proyectos Destacados</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                </motion.div>

                {/* Featured Projects */}
                <div className="space-y-8 mb-16">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-[1.02]">
                                {/* Featured Badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <Star className="text-accent-400" size={20} fill="currentColor" />
                                    <span className="text-accent-400 text-sm font-semibold">PROYECTO DESTACADO</span>
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Metrics */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {project.metrics.map((metric) => (
                                        <div key={metric.label} className="p-4 bg-background/50 rounded-lg border border-primary-500/20">
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp className="text-accent-400" size={16} />
                                                <p className="text-xs text-foreground/60">{metric.label}</p>
                                            </div>
                                            <p className="text-xl font-bold text-gradient">{metric.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Architecture */}
                                {project.architecture && (
                                    <div className="mb-6 p-4 bg-primary-500/5 border-l-4 border-primary-500 rounded">
                                        <p className="text-sm text-foreground/80">
                                            <span className="font-semibold text-primary-400">Arquitectura:</span> {project.architecture}
                                        </p>
                                    </div>
                                )}

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-sm text-foreground/80 hover:bg-primary-500/30 transition-colors"
                                        >
                      {tech}
                    </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
                                        >
                                            <Github size={18} />
                                            <span>Ver Codigo</span>
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-lg transition-all duration-200 hover:scale-105"
                                        >
                                            <ExternalLink size={18} />
                                            <span>Ver Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Other Projects Grid */}
                {otherProjects.length > 0 && (
                    <>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-center mb-8 text-foreground"
                        >
                            Otros Proyectos
                        </motion.h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            {otherProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-105"
                                >
                                    <h4 className="text-xl font-bold text-foreground mb-3 hover:text-primary-400 transition-colors">
                                        {project.title}
                                    </h4>
                                    <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Metrics */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {project.metrics.map((metric) => (
                                            <div key={metric.label} className="text-center">
                                                <p className="text-xs text-foreground/60 mb-1">{metric.label}</p>
                                                <p className="text-sm font-bold text-primary-400">{metric.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-primary-500/20 border border-primary-500/30 rounded text-xs text-foreground/80"
                                            >
                        {tech}
                      </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-sm"
                                        >
                                            <Github size={16} />
                                            <span>Ver en GitHub</span>
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 flex flex-col items-center gap-4 text-center"
                >
                    <p className="text-foreground/70 max-w-2xl">
                        Proyectos academicos de bases de datos relacionales con modelos e imagenes del diseno.
                    </p>
                    <a
                        href="/relational-db"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                    >
                        Ver bases de datos relacionales
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
