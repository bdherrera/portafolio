'use client';

import { motion } from 'framer-motion';
import {
    Database,
    Download,
    ExternalLink,
    FileText,
    Github,
    PlayCircle,
    UserRound,
    Video,
} from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import DatabaseTwoModels, { type DatabaseTwoModel } from './DatabaseTwoModels';

const presentationVideoUrl = 'https://www.youtube.com/embed/l6gSzE8qGOE';

const sectionMenu = [
    { label: 'Presentación', href: '#presentacion-bd2', icon: Video },
    { label: 'Módulo 1', href: '#modulo-1', icon: FileText },
    { label: 'Módulo 2', href: '#modulo-2', icon: FileText },
    { label: 'Módulo 3', href: '#modulo-3', icon: FileText },
    { label: 'Proyecto', href: '#sound-pass', icon: Github },
];

const soundPassRepositories = [
    {
        label: 'Frontend',
        url: 'https://github.com/bdherrera/soundpass-frontend',
        stack: 'React 18, Vite, TypeScript y Tailwind CSS',
        features: [
            'Catálogo de eventos, compra de entradas con cola de reserva, órdenes y entradas con QR.',
            'Reseñas y panel de administración.',
            'Consumo de la API REST con tipos generados a partir del contrato OpenAPI.',
        ],
    },
    {
        label: 'Backend',
        url: 'https://github.com/bdherrera/soundpass-backend',
        stack: 'Java 21, Spring Boot 3.4, PostgreSQL 18 y MongoDB 8.0',
        features: [
            'API REST con autenticación JWT y roles de usuario y administrador.',
            'Funciones y triggers para check-in y auditoría de cambios de estado.',
            'Reseñas, perfiles de artistas y detalles de eventos almacenados en MongoDB.',
        ],
    },
];

type EvidenceActivity = {
    title: string;
    status: string;
    description: string;
    highlights?: string[];
    files?: { name: string; path: string }[];
    model?: DatabaseTwoModel;
};

const modules: {
    id: string;
    label: string;
    title: string;
    description: string;
    activities: EvidenceActivity[];
}[] = [
    {
        id: 'modulo-1',
        label: 'Módulo 1',
        title: 'SQL y PL/SQL en Oracle',
        description: 'Del repaso de SQL a la implementación de reglas de negocio en Oracle 19c. El módulo incorpora consultas avanzadas, índices, planes de ejecución, transacciones y bloqueos, con Oracle Cloud Infrastructure (OCI) como entorno de práctica.',
        activities: [
            {
                title: 'Taller completo de PL/SQL',
                status: 'Taller realizado',
                description: 'Caso de inventario y ventas con procedimientos, funciones, sentencias de control, cursores, excepciones y triggers. El informe de 74 páginas reúne capturas de compilación y ejecución, casos de prueba y justificaciones.',
                highlights: [
                    'SP_AJUSTAR_STOCK registra entradas, salidas y ajustes, y valida operaciones inválidas.',
                    'Un trigger compuesto recalcula el total del pedido y resuelve el error de tabla mutante ORA-04091.',
                    'PKG_VENTAS integra las reglas de facturación y documenta casos exitosos y errores registrados.',
                ],
                files: [{ name: 'Solución SQL e informe de evidencias (ZIP)', path: 'taller-plsql.zip' }],
            },
            {
                title: 'Quiz 2 · SQL avanzado',
                model: 'quiz',
                status: 'Material de práctica',
                description: 'Consultas con joins, subconsultas, CTE, funciones analíticas, jerarquías y Top-N por grupo.',
                files: [
                    { name: 'Script del quiz (SQL)', path: 'quiz-2.sql' },
                    { name: 'Solución guiada (PDF)', path: 'quiz-2-guia.pdf' },
                ],
            },
            {
                title: 'Práctica de repaso y ranking en SQL',
                status: 'Práctica complementaria',
                description: 'Dos consultas de solo lectura sobre el esquema del Quiz 2: totales de pedidos por sucursal y clasificación de productos por categoría con DENSE_RANK para conservar los empates.',
                files: [{ name: 'Consultas de repaso y ranking (SQL)', path: 'practica-ranking-oracle.sql' }],
            },
            {
                title: 'Taller integrador MercaAndes',
                model: 'mercaandes',
                status: 'Enunciado y scripts',
                description: 'Caso de comercio electrónico con bloqueos en dos sesiones, optimización mediante índices y un reto de confirmación de pedidos con control transaccional.',
                files: [
                    { name: 'Enunciado del taller (DOCX)', path: 'mercaandes-enunciado.docx' },
                    { name: 'Scripts del taller (ZIP)', path: 'mercaandes-scripts.zip' },
                ],
            },
        ],
    },
    {
        id: 'modulo-2',
        label: 'Módulo 2',
        title: 'Bases de datos NoSQL',
        description: 'Del modelo relacional al documental en MongoDB. Las actividades exploran cómo modelar y consultar documentos, y cómo la escalabilidad y los principios BASE y CAP influyen en el diseño.',
        activities: [
            {
                title: 'Laboratorio de consultas, índices y modelado en MongoDB',
                model: 'mongo',
                status: 'Práctica ejecutada con datos sintéticos',
                description: 'Filtrado y actualización de arreglos en alojamientos, comparación de documentos examinados con un índice compuesto y ranking de películas con $lookup. El modelo explica cuándo embeber datos y cuándo usar referencias.',
                highlights: [
                    'La consulta de alojamientos examinó tres documentos sin índice y dos al forzar el índice compuesto.',
                    'La actualización añadió Cocina a la lista de servicios. La agregación contó dos comentarios para Horizonte y uno para La estación.',
                ],
                files: [
                    { name: 'Laboratorio de MongoDB (JavaScript)', path: 'laboratorio-mongodb.cjs' },
                    { name: 'Modelo documental con ejemplos (Markdown)', path: 'modelado-mongodb.md' },
                ],
            },
            {
                title: 'Consultas y CRUD con Airbnb',
                status: 'Solución verificada en MongoDB local',
                description: '30 ejercicios de inserción, validación de claves, consultas, actualizaciones y agregación. El informe documenta las salidas de una ejecución con datos sintéticos de estructura sample_airbnb.',
                files: [
                    { name: 'Informe de solución y evidencia (PDF)', path: 'evidencia-airbnb.pdf' },
                    { name: 'Script reproducible (JavaScript)', path: 'solucion-airbnb.cjs' },
                    { name: 'Salidas de la ejecución (JSON)', path: 'resultados-airbnb.json' },
                    { name: 'Enunciado sample_airbnb (PDF)', path: 'taller-airbnb.pdf' },
                ],
            },
            {
                title: 'Agregaciones e índices con películas',
                status: 'Solución verificada en MongoDB local',
                description: '17 ejercicios con datos sintéticos de estructura sample_mflix. Incluye consultas, agregaciones y tres modelos documentales. El índice compuesto redujo de 6.056 a 2 los documentos examinados en la consulta de dramas.',
                files: [
                    { name: 'Informe de solución, evidencia y modelos (PDF)', path: 'evidencia-mflix.pdf' },
                    { name: 'Script principal (JavaScript)', path: 'solucion-mflix.cjs' },
                    { name: 'Módulo de modelos requerido por el script (JavaScript)', path: 'modelos-taller-mflix.cjs' },
                    { name: 'Salidas, planes ganadores y documentos de ejemplo (JSON)', path: 'resultados-mflix.json' },
                    { name: 'Enunciado sample_mflix (PDF)', path: 'taller-mflix.pdf' },
                ],
            },
            {
                title: 'Patrones de modelado documental',
                status: 'Enunciado del taller',
                description: 'Actividad de exposición con ejemplos JSON para explicar cuándo aplicar distintos patrones de MongoDB.',
                files: [{ name: 'Taller de patrones (PDF)', path: 'taller-patrones.pdf' }],
            },
            {
                title: 'Lecturas sobre MQL y sistemas distribuidos',
                status: 'Material de referencia',
                description: 'Manual de MongoDB Query Language y guía sobre escalabilidad, Big Data y principios BASE y CAP.',
                files: [
                    { name: 'Manual MQL (PDF)', path: 'manual-mql.pdf' },
                    { name: 'Escalabilidad, BASE y CAP (PDF)', path: 'base-cap.pdf' },
                ],
            },
        ],
    },
    {
        id: 'modulo-3',
        label: 'Módulo 3',
        title: 'Integración, disponibilidad y recuperación de datos',
        description: 'Del diseño de bases de datos a su operación. El módulo aborda el intercambio de información entre sistemas, la continuidad del servicio y la recuperación ante fallos.',
        activities: [
            {
                title: 'Laboratorio de integración, concurrencia y recuperación',
                status: 'Práctica ejecutada con datos sintéticos',
                description: 'Caso local de pedidos en Python y SQLite. La prueba usa dos conexiones para observar la continuidad de lectura durante una escritura y un respaldo para recuperar un pedido borrado.',
                highlights: [
                    'Integración: el CSV traía cinco filas. Se cargaron tres pedidos válidos y únicos con diez unidades en total.',
                    'Disponibilidad de lectura: con WAL, una segunda conexión leyó el valor anterior durante la escritura y vio el nuevo valor tras el COMMIT.',
                    'Recuperación: la restauración devolvió los tres pedidos y la comprobación de integridad dio ok.',
                ],
                files: [{ name: 'Laboratorio reproducible (Python)', path: 'laboratorio-integracion-recuperacion.py' }],
            },
        ],
    },
];

export default function DatabaseTwo() {
    return (
        <section id="bases-datos-2" className="pt-24 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/10 text-primary-300 text-sm font-semibold mb-5">
                        <Database size={18} />
                        Portafolio académico
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-5">
                        <span className="text-gradient">Bases de Datos 2</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-foreground/70 leading-relaxed">
                        Recorrido del semestre desde SQL y PL/SQL en Oracle hasta el modelado con
                        MongoDB y las estrategias de integración, disponibilidad y recuperación de datos.
                    </p>
                </motion.div>

                <motion.nav
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-14"
                    aria-label="Menú de Bases de Datos 2"
                >
                    {sectionMenu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary-500/20 bg-background/70 text-foreground/80 hover:border-primary-500/50 hover:text-primary-300 transition-colors"
                            >
                                <Icon size={18} />
                                <span className="font-medium">{item.label}</span>
                            </a>
                        );
                    })}
                </motion.nav>

                <motion.div
                    id="presentacion-bd2"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="scroll-mt-24 grid lg:grid-cols-[0.75fr_1.25fr] gap-8 mb-16"
                >
                    <div className="rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-8">
                        <div className="aspect-square max-w-[260px] mx-auto rounded-2xl border border-primary-500/20 bg-background/70 flex items-center justify-center mb-6">
                            <div className="text-center">
                                <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                    <UserRound size={58} className="text-white" />
                                </div>
                                <p className="text-3xl font-bold text-gradient">BH</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                            {personalInfo.name}
                        </h2>
                        <p className="text-center text-foreground/65 leading-relaxed">
                            {personalInfo.subtitle}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-primary-500/20 bg-background/70 overflow-hidden">
                        <div className="p-6 border-b border-primary-500/10">
                            <div className="flex items-center gap-3 mb-2">
                                <PlayCircle size={24} className="text-primary-400" />
                                <h2 className="text-2xl font-bold text-foreground">Presentación</h2>
                            </div>
                            <p className="text-foreground/65 leading-relaxed">
                                Video de presentación correspondiente a Bases de Datos 2.
                            </p>
                        </div>

                        <div className="aspect-video bg-black">
                            <iframe
                                src={presentationVideoUrl}
                                title="Video de presentación Bases de Datos 2"
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </motion.div>

                <div id="evidencias-bd2" className="scroll-mt-24">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10">Evidencias del semestre</h2>

                    {modules.map((module) => (
                        <section
                            key={module.id}
                            id={module.id}
                            aria-labelledby={module.id + '-titulo'}
                            className="scroll-mt-24 mb-12 rounded-2xl border border-primary-500/20 bg-background/70 p-5 sm:p-8"
                        >
                            <p className="text-sm font-semibold text-primary-300 mb-2">{module.label}</p>
                            <h3 id={module.id + '-titulo'} className="text-2xl md:text-3xl font-bold mb-3">
                                {module.title}
                            </h3>
                            <p className="max-w-3xl text-foreground/75 leading-relaxed mb-7">
                                {module.description}
                            </p>

                            <div className="grid gap-5 md:grid-cols-2">
                                {module.activities.map((activity) => (
                                    <article
                                        key={activity.title}
                                        className={'rounded-xl border border-primary-500/20 bg-primary-500/5 p-5' +
                                            (activity.highlights ? ' md:col-span-2' : '')}
                                    >
                                        <p className="text-sm font-medium text-accent-300 mb-2">{activity.status}</p>
                                        <h4 className="text-lg font-bold mb-2">{activity.title}</h4>
                                        <p className="text-sm text-foreground/75 leading-relaxed">{activity.description}</p>

                                        {activity.highlights && (
                                            <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-foreground/80">
                                                {activity.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                                            </ul>
                                        )}

                                        {activity.model && <DatabaseTwoModels model={activity.model} />}

                                        {activity.files && (
                                            <ul className="mt-4 space-y-2">
                                                {activity.files.map((file) => (
                                                    <li key={file.path}>
                                                        <a
                                                            href={'/evidencias/bases-datos-2/' + file.path}
                                                            download
                                                            className="inline-flex items-center gap-2 py-1 text-sm font-medium text-primary-300 underline underline-offset-4 hover:text-foreground"
                                                        >
                                                            <Download size={16} className="shrink-0" aria-hidden="true" />
                                                            {file.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <section
                    id="sound-pass"
                    aria-labelledby="sound-pass-titulo"
                    className="scroll-mt-24 rounded-2xl border border-primary-500/20 bg-background/70 p-5 sm:p-8"
                >
                    <p className="mb-2 text-sm font-semibold text-primary-300">Proyecto de la asignatura</p>
                    <h2 id="sound-pass-titulo" className="mb-4 text-2xl font-bold md:text-3xl">Sound Pass</h2>
                    <p className="mb-5 max-w-3xl text-foreground/75">
                        Plataforma de venta de entradas para eventos. El proyecto combina una interfaz web con una API
                        y usa bases de datos relacionales y documentales para distintos tipos de información.
                    </p>
                    <h3 className="mb-3 text-lg font-bold">Cómo aplica lo aprendido en la materia</h3>
                    <dl className="mb-6 grid gap-3 md:grid-cols-3">
                        <div className="rounded-lg border border-primary-500/20 p-4">
                            <dt className="font-semibold text-primary-300">Módulo 1 · Modelo relacional</dt>
                            <dd className="mt-2 text-sm leading-relaxed text-foreground/75">
                                PostgreSQL registra órdenes y entradas. La función de compra controla que las compras
                                simultáneas respeten el cupo disponible.
                            </dd>
                        </div>
                        <div className="rounded-lg border border-primary-500/20 p-4">
                            <dt className="font-semibold text-primary-300">Módulo 2 · Patrones NoSQL</dt>
                            <dd className="mt-2 text-sm leading-relaxed text-foreground/75">
                                En MongoDB, <strong>Computed</strong> mantiene contadores de la cola de reserva para calcular
                                la posición de cada turno. <strong>Bucket</strong> agrupa los registros de actividad por hora.
                            </dd>
                        </div>
                        <div className="rounded-lg border border-primary-500/20 p-4">
                            <dt className="font-semibold text-primary-300">Módulo 3 · Disponibilidad</dt>
                            <dd className="mt-2 text-sm leading-relaxed text-foreground/75">
                                Si MongoDB deja de responder, el catálogo y la compra siguen disponibles.
                                La interfaz indica que la compra se realiza sin cola de reserva.
                            </dd>
                        </div>
                    </dl>
                    <ul className="grid gap-5 md:grid-cols-2">
                        {soundPassRepositories.map((repository) => (
                            <li key={repository.url} className="rounded-xl border border-primary-500/20 bg-primary-500/5 p-5">
                                <h3 className="mb-2 text-lg font-bold">{repository.label}</h3>
                                <p className="mb-3 text-sm font-medium text-accent-300">{repository.stack}</p>
                                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/75">
                                    {repository.features.map((feature) => <li key={feature}>{feature}</li>)}
                                </ul>
                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-primary-300">
                                    <a href={repository.url} className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-foreground">
                                        <Github size={16} aria-hidden="true" />
                                        {repository.label} en GitHub
                                    </a>
                                    <a
                                        href={repository.url + '/blob/main/README.md'}
                                        aria-label={'README del ' + repository.label.toLowerCase()}
                                        className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-foreground"
                                    >
                                        README <ExternalLink size={14} aria-hidden="true" />
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </section>
    );
}
