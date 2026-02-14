'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Phone } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Contact() {
    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 grid-background opacity-10" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Contactame</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6" />
                    <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                        Tienes un proyecto backend o quieres conversar sobre data governance y calidad?
                        Me encantaria escucharte.
                    </p>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 backdrop-blur-sm"
                >
                    {/* Contact Methods */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Email */}
                        <motion.a
                            href={`mailto:${personalInfo.email}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 group"
                        >
                            <div className="p-3 bg-primary-500/20 rounded-lg group-hover:bg-primary-500 transition-colors">
                                <Mail className="text-primary-400 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-foreground/60 mb-1">Email</p>
                                <p className="text-foreground font-medium break-all">{personalInfo.email}</p>
                            </div>
                        </motion.a>

                        {/* Phone */}
                        {personalInfo.phone && (
                            <motion.a
                                href={`tel:${personalInfo.phone}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 group"
                            >
                                <div className="p-3 bg-primary-500/20 rounded-lg group-hover:bg-primary-500 transition-colors">
                                    <Phone className="text-primary-400 group-hover:text-white transition-colors" size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-foreground/60 mb-1">Telefono</p>
                                    <p className="text-foreground font-medium">{personalInfo.phone}</p>
                                </div>
                            </motion.a>
                        )}

                        {/* Location */}
                        {personalInfo.location && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20"
                            >
                                <div className="p-3 bg-accent-500/20 rounded-lg">
                                    <MapPin className="text-accent-400" size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-foreground/60 mb-1">Ubicacion</p>
                                    <p className="text-foreground font-medium">{personalInfo.location}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {personalInfo.github && (
                            <motion.a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-2 px-6 py-3 bg-primary-500/20 border border-primary-500/30 rounded-lg hover:bg-primary-500 hover:border-primary-500 text-foreground hover:text-white transition-all duration-300"
                            >
                                <Github size={20} />
                                <span className="font-medium">GitHub</span>
                            </motion.a>
                        )}

                        {personalInfo.linkedin && (
                            <motion.a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-2 px-6 py-3 bg-accent-500/20 border border-accent-500/30 rounded-lg hover:bg-accent-500 hover:border-accent-500 text-foreground hover:text-white transition-all duration-300"
                            >
                                <Linkedin size={20} />
                                <span className="font-medium">LinkedIn</span>
                            </motion.a>
                        )}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <a
                            href={`mailto:${personalInfo.email}?subject=Hola! Quisiera contactarte`}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/50"
                        >
                            <Send size={20} />
                            <span>Enviar Mensaje</span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center text-foreground/60 mt-8"
                >
                    Disponible para oportunidades backend, data governance y data quality
                </motion.p>
            </div>
        </section>
    );
}
