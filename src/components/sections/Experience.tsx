'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { experiences } from '@/data/portfolio';

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-primary-950/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Experiencia Profesional</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                </motion.div>

                {/* Timeline */}
                <div className="relative md:pr-16">
                    {/* Vertical Line */}
                    <div className="hidden md:block absolute right-6 top-0 w-1 h-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={`${exp.company}-${exp.role}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative mb-12 md:pr-12"
                        >
                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute top-1/2 right-6 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-background shadow-lg shadow-primary-500/50" />

                            {/* Content Card */}
                            <div className="relative p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-105">
                                {/* Company & Role */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary-500/20 rounded-lg">
                                        <Briefcase className="text-primary-400" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                                        <p className="text-xl text-primary-400 font-semibold mb-2">{exp.company}</p>
                                        <div className="flex items-center gap-2 text-foreground/60">
                                            <Calendar size={16} />
                                            <span className="text-sm">{exp.period}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <ul className="space-y-2 mb-4">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-foreground/80 flex items-start gap-2">
                                            <span className="text-accent-400 mt-1">&gt;</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-xs text-foreground/80"
                                        >
                      {tech}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
