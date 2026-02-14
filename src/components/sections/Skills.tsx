'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';

export default function Skills() {
    return (
        <section id="skills" className="py-20 bg-primary-950/20">
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
                        <span className="text-gradient">Stack Tecnologico</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                    <p className="text-foreground/60 mt-4 text-lg">
                        Herramientas y tecnologias que utilizo en proyectos backend y datos
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skillCategory, categoryIndex) => (
                        <motion.div
                            key={skillCategory.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
                        >
                            {/* Category Title */}
                            <h3 className="text-xl font-bold text-foreground mb-6 border-b border-primary-500/30 pb-3">
                                {skillCategory.category}
                            </h3>

                            {/* Skills List */}
                            <div className="space-y-4">
                                {skillCategory.items.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                                        className="group"
                                    >
                                        {/* Skill Name & Icon */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <skill.icon className="text-primary-400 group-hover:text-accent-400 transition-colors" size={24} />
                                            <span className="text-foreground/90 font-medium group-hover:text-primary-400 transition-colors">
                                                {skill.name}
                                            </span>
                                        </div>

                                        {/* Progress Bar (if level is provided) */}
                                        {skill.level && (
                                            <div className="relative h-2 bg-background/50 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-12 text-center p-6 rounded-xl bg-gradient-to-br from-accent-500/10 to-primary-500/10 border border-accent-500/20"
                >
                    <p className="text-foreground/80 text-lg">
                        Certificaciones destacadas: Azure DevOps, Spring Framework, Oracle Cloud
                    </p>
                    <p className="text-foreground/60 mt-2">
                        Enfoque actual: backend robusto, data governance y calidad
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
