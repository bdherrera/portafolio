'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Hero() {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 grid-background opacity-20" />
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    {/* Greeting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="text-primary-400 text-lg font-mono">Hola, soy</span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
                    >
                        <span className="text-gradient">{personalInfo.name}</span>
                    </motion.h1>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground/80 mb-6"
                    >
                        {personalInfo.title}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl md:text-2xl text-foreground/60 mb-8 max-w-3xl mx-auto"
                    >
                        {personalInfo.subtitle}
                    </motion.p>

                    {/* Bio */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        {personalInfo.bio}
                    </motion.p>

                    {/* Location */}
                    {personalInfo.location && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center justify-center gap-2 mb-12 text-foreground/60"
                        >
                            <MapPin size={20} className="text-accent-400" />
                            <span>{personalInfo.location}</span>
                        </motion.div>
                    )}

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-16"
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/50"
                        >
                            Ver Proyectos
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                        >
                            Contactar
                        </a>
                        {personalInfo.resumeUrl && (
                            <a
                                href={personalInfo.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 border-2 border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                            >
                                Descargar CV
                            </a>
                        )}
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex items-center justify-center gap-6"
                    >
                        {personalInfo.github && (
                            <a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/60 hover:text-primary-400 transition-colors duration-200 hover:scale-110 transform"
                            >
                                <Github size={28} />
                            </a>
                        )}
                        {personalInfo.linkedin && (
                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/60 hover:text-primary-400 transition-colors duration-200 hover:scale-110 transform"
                            >
                                <Linkedin size={28} />
                            </a>
                        )}
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="text-foreground/60 hover:text-primary-400 transition-colors duration-200 hover:scale-110 transform"
                        >
                            <Mail size={28} />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.a
                    href="#about"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-foreground/60 hover:text-primary-400 transition-colors"
                >
                    <ChevronDown size={32} />
                </motion.a>
            </motion.div>
        </section>
    );
}
