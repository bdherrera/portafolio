import type { IconType } from "react-icons";
import {
    FaCertificate,
    FaChartBar,
    FaCloud,
    FaCode,
    FaCodeBranch,
    FaHashtag,
    FaJava,
} from "react-icons/fa";
import {
    SiPython,
    SiSpring,
    SiHibernate,
    SiApachemaven,
    SiDotnet,
    SiMysql,
    SiPostgresql,
    SiOracle,
    SiMongodb,
    SiAmazon,
    SiGooglecloud,
    SiDocker,
    SiJenkins,
    SiGit,
    SiSonarqube,
    SiSwagger,
    SiPostman,
    SiApachespark,
    SiLooker,
} from "react-icons/si";

export interface Experience {
    
    company: string;
    role: string;
    period: string;
    description: string[];
    technologies: string[];
}

export interface Project {
    title: string;
    description: string;
    metrics: {
        label: string;
        value: string;
    }[];
    technologies: string[];
    architecture?: string;
    github?: string;
    demo?: string;
    featured?: boolean;
}

export interface RelationalDbProject {
    title: string;
    description: string;
    image?: string;
    course?: string;
    tags?: string[];
}

export interface Skill {
    category: string;
    items: {
        name: string;
        icon: IconType;
        level?: number;
    }[];
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
    icon?: IconType;
}

export interface Language {
    name: string;
    level: string;
}

export const personalInfo = {
    name: "Brayan David Herrera Acero",
    title: "Backend Java/Python",
    subtitle: "Backend Developer | Data Governance & Data Quality",
    bio: "Desarrollador backend junior con cerca de  3 años de experiencia en Java y C#. Formado en Analisis y Desarrollo de Sistemas (SENA) y estudiante de Ingenieria de Sistemas. He trabajado en data governance y data quality usando AWS para analisis, procesamiento y monitoreo, integrando procesos ETL y buenas practicas de calidad.",
    email: "davidhb944@gmail.com",
    phone: "+57 3222310146",
    github: "",
    linkedin: "https://linkedin.com/in/brayan-david-herrera-acero",
    location: "Colombia",
    resumeUrl: "",
};

export const experiences: Experience[] = [
    {
        company: "SII Group - Cliente: BBVA",
        role: "Consultor Data Governance / Data Quality",
        period: "May 2025 - Actualidad",
        description: [
            "Soporte y gestion operativa de gobierno y calidad de datos.",
            "Uso de ADA y servicios AWS (Athena, SageMaker, CloudWatch) para analisis, monitoreo y soporte.",
            "Consultas en Athena para validacion, analisis de incidencias y controles de calidad.",
            "Observabilidad con CloudWatch para deteccion temprana de anomalias.",
            "Automatizacion de controles y apoyo en calidad en el origen (mapeo de fuentes y reglas).",
        ],
        technologies: ["AWS", "Athena", "SageMaker", "CloudWatch", "ADA", "Data Quality", "SQL"],
    },
    {
        company: "Optecom S.A.S",
        role: "Desarrollador Junior",
        period: "Oct 2023 - Dic 2024",
        description: [
            "Desarrollo de aplicaciones para Telefonica con C#, Java y Python usando Git, NuGet, Entity Framework y Azure DevOps.",
            "Pruebas y documentacion con Swagger; aseguramiento de calidad con SonarQube y Kiuwan.",
            "Contenerizacion de aplicaciones con Docker y automatizacion de despliegues.",
            "Analisis de requerimientos, desarrollo, QA y coordinacion de equipo.",
            "Despliegue en produccion de aplicaciones de certificacion de usuarios, controles SOX/NO SOX y gestion de usuarios.",
        ],
        technologies: ["C#", "Java", "Python", "Azure DevOps", "Entity Framework", "Swagger", "SonarQube", "Docker", "SQL"],
    },
    {
        company: "CGI",
        role: "Desarrollador Java",
        period: "Aug 2022 - Oct 2023",
        description: [
            "Desarrollo de APIs RESTful para BBVA con Java, Spring Framework y Maven.",
            "Pruebas de calidad y documentacion con Postman; apoyo al equipo de desarrollo.",
            "Participacion en proyectos NEMO y CIRI (Flujo Local, Salto Pais, Biocatch PSE, Dynamic Currency Pricing).",
            "Uso de Jenkins, SonarQube, Bitbucket y Jira en el flujo de trabajo.",
        ],
        technologies: ["Java", "Spring", "Maven", "Postman", "Jenkins", "SonarQube", "Bitbucket", "Jira", "SQL"],
    },
];

export const projects: Project[] = [
    {
        title: "Sistema de Gestion de Inventarios",
        description: "Aplicacion web para gestion de inventarios con autenticacion y autorizacion mediante Spring Security.",
        metrics: [
            { label: "Stack", value: "Java / Spring Boot / Angular" },
            { label: "Seguridad", value: "Spring Security" },
            { label: "DB", value: "MySQL" },
        ],
        technologies: ["Java", "Spring Boot", "Angular", "MySQL", "Spring Security", "Docker"],
        architecture: "Aplicacion web con backend REST y capas de servicio",
        featured: true,
    },
    {
        title: "BosqueHealth Clinic Management System",
        description: "Sistema de gestion de citas y turnos con notificaciones automaticas y persistencia con archivos binarios.",
        metrics: [
            { label: "Patron", value: "MVC + DTO/DAO" },
            { label: "Notificaciones", value: "Automaticas" },
            { label: "Persistencia", value: "Archivos binarios" },
        ],
        technologies: ["Java", "MVC", "DTO/DAO", "Notificaciones", "Archivos binarios"],
        architecture: "MVC con DTO/DAO y separacion de capas",
        featured: true,
    },
    {
        title: "Chatbot para WhatsApp Business",
        description: "Chatbot para una empresa de belleza, optimizando la comunicacion con clientes e integrando bases de datos.",
        metrics: [
            { label: "Canal", value: "WhatsApp Business" },
            { label: "DB", value: "MongoDB / MySQL" },
            { label: "Objetivo", value: "Atencion a clientes" },
        ],
        technologies: ["WhatsApp Business", "MongoDB", "MySQL"],
        featured: false,
    },
    {
        title: "Fuzzy Logic-Based Risk Assessment Tool",
        description: "Herramienta para evaluar riesgo de sangrado gastrointestinal mediante logica difusa y simulacion.",
        metrics: [
            { label: "Tecnica", value: "Logica difusa" },
            { label: "Enfoque", value: "Riesgo GI" },
            { label: "Interfaz", value: "Simulacion" },
        ],
        technologies: ["Logica difusa", "Simulacion", "Analisis clinico"],
        featured: false,
    },
];

export const relationalDbProjects: RelationalDbProject[] = [
    {
        title: "Modelo Entidad-Relacion - Inventarios",
        description: "Modelo relacional para la gestion de inventarios con entidades, relaciones y cardinalidades.",
        image: "",
        course: "Bases de Datos 1",
        tags: ["ER", "Relacional", "Normalizacion"],
    },
    {
        title: "Modelo Relacional - Clinica",
        description: "Diseno de base de datos para gestion de pacientes, citas y especialidades.",
        image: "",
        course: "Bases de Datos 1",
        tags: ["ER", "SQL", "Normalizacion"],
    },
];

export const skills: Skill[] = [
    {
        category: "Lenguajes",
        items: [
            { name: "Java", icon: FaJava, level: 70 },
            { name: "C#", icon: FaHashtag, level: 65 },
            { name: "Python", icon: SiPython, level: 50 },
        ],
    },
    {
        category: "Frameworks y herramientas",
        items: [
            { name: "Spring Framework", icon: SiSpring, level: 70 },
            { name: "Hibernate", icon: SiHibernate, level: 60 },
            { name: "Entity Framework", icon: SiDotnet, level: 60 },
            { name: "Maven", icon: SiApachemaven, level: 65 },
            { name: "Apache Spark", icon: SiApachespark, level: 55 },
        ],
    },
    {
        category: "Bases de datos",
        items: [
            { name: "MySQL", icon: SiMysql, level: 65 },
            { name: "PostgreSQL", icon: SiPostgresql, level: 65 },
            { name: "Oracle", icon: SiOracle, level: 60 },
            { name: "MongoDB", icon: SiMongodb, level: 60 },
        ],
    },
    {
        category: "Cloud",
        items: [
            { name: "Azure", icon: FaCloud, level: 65 },
            { name: "AWS", icon: SiAmazon, level: 50 },
            { name: "Google Cloud", icon: SiGooglecloud, level: 40 },
        ],
    },
    {
        category: "DevOps y calidad",
        items: [
            { name: "Git", icon: SiGit, level: 80 },
            { name: "Docker", icon: SiDocker, level: 65 },
            { name: "Jenkins", icon: SiJenkins, level: 55 },
            { name: "Azure DevOps", icon: FaCodeBranch, level: 70 },
            { name: "SonarQube", icon: SiSonarqube, level: 60 },
            { name: "Swagger", icon: SiSwagger, level: 60 },
            { name: "Postman", icon: SiPostman, level: 60 },
        ],
    },
    {
        category: "Data y analitica",
        items: [
            { name: "AWS Athena", icon: SiAmazon, level: 45 },
            { name: "AWS SageMaker", icon: SiAmazon, level: 40 },
            { name: "AWS CloudWatch", icon: SiAmazon, level: 45 },
        ],
    },
    {
        category: "Visualizacion de datos",
        items: [
            { name: "Looker Studio", icon: SiLooker, level: 50 },
            { name: "Power BI", icon: FaChartBar, level: 50 },
        ],
    },
];

export const architectures = [
    "ETL/ELT Pipelines",
    "Data Governance & Quality",
    "REST APIs",
    "Microservices",
    "MVC + DTO/DAO",
    "CI/CD with DevOps",
    "Observability & Monitoring",
];

export const education: Education[] = [
    {
        institution: "Universidad El Bosque",
        degree: "Ingenieria de Sistemas",
        period: "2024 - Actualidad",
    },
    {
        institution: "Servicio Nacional de Aprendizaje (SENA)",
        degree: "Tecnologo en Analisis y Desarrollo de Sistemas de Informacion",
        period: "2021 - 2023",
    },
];

export const certifications: Certification[] = [
    { name: "Azure DevOps", issuer: "Udemy", date: "Jun 2024", icon: FaCodeBranch },
    { name: "Spring Framework", issuer: "Oracle Next Education", date: "Jun 2023", icon: SiSpring },
    { name: "Oracle Cloud Infrastructure", issuer: "Oracle Next Education", date: "Jul 2023", icon: SiOracle },
    { name: "Desarrollador Back-End", issuer: "Oracle Next Education", date: "Ene 2023 - Jun 2023", icon: FaCode },
    { name: "Fundamentos en Analitica de Datos", issuer: "DS4A/Colombia", date: "Dic 2022", icon: FaChartBar },
    { name: "Java Orientado a Objetos", issuer: "G4 ONE", date: "2023", icon: FaJava },
    { name: "Java Web", issuer: "Alura", date: "2023", icon: FaJava },
    { name: "APX-CMC", issuer: "CMC", date: "2023", icon: FaCertificate },
    { name: "ASO-CMC", issuer: "CMC", date: "2023", icon: FaCertificate },
    { name: "LBRA", issuer: "SII Group", date: "2026", icon: FaCertificate },
    { name: "PySpark", issuer: "Platzi", date: "2026", icon: SiApachespark },
];

export const languages: Language[] = [
    { name: "Espanol", level: "Nativo" },
    { name: "Ingles", level: "Intermedio (A2)" },
];
