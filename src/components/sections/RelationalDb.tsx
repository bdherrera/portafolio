'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, FileSpreadsheet, ExternalLink } from 'lucide-react';

interface Evidence {
    title: string;
    category: string;
    description: string;
    src: string;
    isExcel?: boolean;
    link?: string;
}

const evidenceCategories = ['Todos', 'Modelado', 'Normalización', 'SQL'];

const evidenceImages: Evidence[] = [
    {
        title: 'Normalización - Taller 1',
        category: 'Normalización',
        description: 'Resolución detallada del ejercicio 2 (ejercicio 2 taller 1) aplicando 1FN, 2FN y 3FN.',
        isExcel: true,
        link: 'https://unbosqueeduco-my.sharepoint.com/:x:/g/personal/bdherrera_unbosque_edu_co/IQDfA4_wJD5dS4tNGfg22XyXAWVPJSvMSCHKO1hPgpgUitM?e=fdFlPp',
        src: '/images/evidencias/preview-excel.png',
    },
    {
        title: 'Modelo ER - Hospital',
        category: 'Modelado',
        description: 'Sistema de gestión hospitalaria, pacientes y citas médicas.',
        src: '/images/evidencias/hospital.jpeg',
    },
    {
        title: 'Modelo ER - Biblioteca',
        category: 'Modelado',
        description: 'Gestión de préstamos, libros y autores.',
        src: '/images/evidencias/Biblioteca.png',
    },
    {
        title: 'Modelo ER - Aerolínea',
        category: 'Modelado',
        description: 'Control de vuelos, pasajeros y tripulación.',
        src: '/images/evidencias/Areolina.png',
    },
    {
        title: 'Modelo ER - Nómina',
        category: 'Modelado',
        description: 'Cálculo de salarios y gestión de empleados.',
        src: '/images/evidencias/nomina.jpg',
    },
    {
        title: 'Modelo ER - Cadena de Supermercados',
        category: 'Modelado',
        description: 'Control de inventarios y sucursales.',
        src: '/images/evidencias/Taller MER - ER - Cadena de supermercados.jpeg',
    },
    {
        title: 'Modelo ER - Empresa de Repartos',
        category: 'Modelado',
        description: 'Logística de envíos y mensajeros.',
        src: '/images/evidencias/Taller MER - ER - Empresa de Repartos.jpeg',
    },
    {
        title: 'Modelo ER - Finca Raíz',
        category: 'Modelado',
        description: 'Gestión de propiedades y arrendamientos.',
        src: '/images/evidencias/Taller MER - ER - empresa Finca raiz.jpeg',
    },
];

export default function RelationalDb() {
    const [selectedImage, setSelectedImage] = useState<Evidence | null>(null);
    const [activeCategory, setActiveCategory] = useState('Todos');

    const filteredEvidences = activeCategory === 'Todos' 
        ? evidenceImages 
        : evidenceImages.filter(img => img.category === activeCategory);

    const handleCardClick = (evidence: Evidence) => {
        if (evidence.isExcel && evidence.link) {
            window.open(evidence.link, '_blank');
        } else {
            setSelectedImage(evidence);
        }
    };

    return (
        <section id="relational-db" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Bases de datos relacionales</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {evidenceCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                                activeCategory === category
                                    ? 'bg-primary-500 border-primary-500 text-white shadow-lg'
                                    : 'bg-primary-500/5 border-primary-500/20 text-foreground/60 hover:border-primary-500/50'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredEvidences.map((evidence) => (
                            <motion.div
                                layout
                                key={evidence.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative p-4 rounded-2xl bg-gradient-to-br from-primary-500/5 to-accent-500/5 border border-primary-500/10 hover:border-primary-500/30 transition-all shadow-xl"
                            >
                                <div 
                                    className={`relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer ${
                                        evidence.isExcel ? 'bg-emerald-500/10 border-2 border-emerald-500/20' : 'bg-white/80'
                                    }`}
                                    onClick={() => handleCardClick(evidence)}
                                >
                                    {evidence.isExcel ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                            <FileSpreadsheet size={48} className="text-emerald-500" />
                                            <div className="text-center">
                                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Abrir Taller 1</span>
                                                <p className="text-[10px] text-emerald-600/60 font-mono mt-1">ejercicio 2 taller 1</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={evidence.src} alt={evidence.title} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        {evidence.isExcel ? <ExternalLink className="text-white" size={24} /> : <Maximize2 className="text-white" size={24} />}
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-foreground mt-4 mb-2">{evidence.title}</h4>
                                <p className="text-sm text-foreground/60 line-clamp-2">{evidence.description}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 p-3 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={28} /></button>
                        <motion.div 
                            initial={{ scale: 0.9 }} 
                            animate={{ scale: 1 }} 
                            className="max-w-5xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[85vh] mx-auto object-contain rounded-lg shadow-2xl" />
                            <h3 className="mt-6 text-2xl font-bold text-white text-center uppercase tracking-wider">{selectedImage.title}</h3>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
