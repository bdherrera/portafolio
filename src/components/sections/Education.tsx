'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap, Languages } from 'lucide-react';
import { certifications, education, languages } from '@/data/portfolio';

export default function Education() {
    return (
        <section id="education" className="py-20 relative overflow-hidden">
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
                        <span className="text-gradient">Educacion y Certificaciones</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary-500/20 rounded-lg">
                                <GraduationCap className="text-primary-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Formacion</h3>
                        </div>
                        <div className="space-y-4">
                            {education.map((item) => (
                                <div key={`${item.institution}-${item.degree}`}>
                                    <p className="text-foreground font-semibold">{item.degree}</p>
                                    <p className="text-foreground/70">{item.institution}</p>
                                    <p className="text-sm text-foreground/50">{item.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary-500/20 rounded-lg">
                                <Award className="text-primary-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Certificaciones</h3>
                        </div>
                        <div className="space-y-3">
                            {certifications.map((cert) => (
                                <div key={`${cert.name}-${cert.issuer}`} className="flex items-start gap-3">
                                    {cert.icon && (
                                        <cert.icon className="text-accent-400 mt-1" size={18} />
                                    )}
                                    <div>
                                        <p className="text-foreground font-medium">{cert.name}</p>
                                        <p className="text-foreground/70 text-sm">{cert.issuer}</p>
                                        <p className="text-foreground/50 text-xs">{cert.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Languages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 p-6 rounded-xl bg-gradient-to-br from-accent-500/10 to-primary-500/10 border border-accent-500/20"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-accent-500/20 rounded-lg">
                            <Languages className="text-accent-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Idiomas</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {languages.map((language) => (
                            <span
                                key={language.name}
                                className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-sm text-foreground/80"
                            >
                                {language.name} - {language.level}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
