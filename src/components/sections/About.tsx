'use client';

import { motion } from 'framer-motion';
import { Code2, Database, GitBranch, Zap } from 'lucide-react';
import { architectures } from '@/data/portfolio';

const highlights = [
    {
        icon: Database,
        title: 'Data Governance',
        description: 'Mapeo de fuentes, reglas de calidad y soporte operativo para datos confiables',
    },
    {
        icon: GitBranch,
        title: 'ETL y Analitica',
        description: 'Consultas y validaciones con AWS Athena y apoyo a procesos ETL',
    },
    {
        icon: Zap,
        title: 'DevOps y Calidad',
        description: 'Buenas practicas, automatizacion y calidad con Docker, SonarQube y CI/CD',
    },
    {
        icon: Code2,
        title: 'Backend Development',
        description: 'APIs REST con Java/Spring, documentacion y pruebas de calidad',
    },
];

export default function About() {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
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
                        <span className="text-gradient">Sobre Mi</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Column - Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-8 backdrop-blur-sm border border-primary-500/20">
                            <div className="w-full h-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-xl flex items-center justify-center">
                                <div className="text-center p-8">
                                    <Database size={80} className="text-primary-400 mx-auto mb-4" />
                                    <p className="text-2xl font-bold text-gradient mb-2">3+ años</p>
                                    <p className="text-foreground/60">Experiencia en backend y data quality</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            Soy desarrollador backend junior con cerca de 3 años de experiencia en Java y C#,
                            con formacion en Analisis y Desarrollo de Sistemas (SENA) y estudios actuales de
                            Ingenieria de Sistemas.
                        </p>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            He trabajado en Data Governance y Data Quality, usando servicios de AWS para analisis,
                            monitoreo y soporte operativo. Participo en definicion de reglas de calidad y mapeo de fuentes
                            para asegurar consistencia y trazabilidad de la informacion.
                        </p>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            Me gusta trabajar con equipos multiculturales bajo metodologias agiles, aplicando buenas
                            practicas de ingenieria, pruebas de calidad y un enfoque constante en la mejora continua.
                        </p>
                    </motion.div>
                </div>

                {/* Highlights Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {highlights.map((highlight, index) => (
                        <motion.div
                            key={highlight.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-105"
                        >
                            <highlight.icon className="text-primary-400 mb-4" size={32} />
                            <h3 className="text-xl font-semibold mb-2 text-foreground">{highlight.title}</h3>
                            <p className="text-foreground/60 text-sm">{highlight.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Architectures */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Arquitecturas que Domino</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {architectures.map((arch, index) => (
                            <motion.span
                                key={arch}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-sm text-foreground/80 hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-200"
                            >
                                {arch}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
