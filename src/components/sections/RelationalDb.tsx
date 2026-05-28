'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, FileSpreadsheet, ExternalLink, Code2, Table2 } from 'lucide-react';

interface Evidence {
    title: string;
    category: string;
    description: string;
    src: string;
    isExcel?: boolean;
    isFolder?: boolean;
    link?: string;
}

interface SqlEvidence {
    title: string;
    description: string;
    sql: string;
    columns?: string[];
    rows?: string[][];
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
        title: 'Proyecto final - Bases de datos',
        category: 'SQL',
        description: 'Carpeta compartida con los entregables del proyecto final de bases de datos relacionales.',
        isFolder: true,
        link: 'https://unbosqueeduco-my.sharepoint.com/:f:/g/personal/bdherrera_unbosque_edu_co/IgBDPGo3dkz3Q79mgcmRVh0dAXBOfRZE4XSHWVoknhL80ek?e=qsuUCf',
        src: '/images/evidencias/proyecto-final.png',
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

const sqlEvidences: SqlEvidence[] = [
    {
        title: 'INNER JOIN por departamento',
        description: 'Relaciona empleados con departamentos usando department_id y filtra solo los registros del departamento Accounting.',
        sql: `SELECT  e.first_name AS primer_nombre,
        e.last_name AS apellido,
        d.department_name AS departamento
FROM employees e
INNER JOIN departments d
        ON e.department_id = d.department_id
WHERE d.department_name = 'Accounting';`,
        columns: ['primer_nombre', 'apellido', 'departamento'],
        rows: [
            ['Shelley', 'Higgins', 'Accounting'],
            ['William', 'Gietz', 'Accounting'],
        ],
    },
    {
        title: 'Cálculo de salario',
        description: 'Consulta empleados y calcula una columna derivada con el 10% del salario mediante una expresión aritmética.',
        sql: `SELECT  e.first_name AS primer_nombre,
        e.last_name AS apellido,
        e.salary AS salario,
        e.salary * 0.1 AS salario_10
FROM employees e;`,
        columns: ['primer_nombre', 'apellido', 'salario', 'salario_10'],
        rows: [
            ['Steven', 'King', '24000', '2400'],
            ['Neena', 'Kochhar', '17000', '1700'],
            ['Lex', 'De Haan', '17000', '1700'],
            ['Shelley', 'Higgins', '12008', '1200.8'],
        ],
    },
    {
        title: 'Consulta de departamentos',
        description: 'Lista todos los registros de departments. Es útil para validar identificadores y nombres de áreas.',
        sql: `SELECT *
FROM departments;`,
        columns: ['department_id', 'department_name', 'manager_id', 'location_id'],
        rows: [
            ['10', 'Administration', '200', '1700'],
            ['20', 'Marketing', '201', '1800'],
            ['110', 'Accounting', '205', '1700'],
        ],
    },
    {
        title: 'Consulta de países',
        description: 'Lista el catálogo de países y su región asociada.',
        sql: `SELECT *
FROM countries;`,
        columns: ['country_id', 'country_name', 'region_id'],
        rows: [
            ['US', 'United States of America', '2'],
            ['CA', 'Canada', '2'],
            ['UK', 'United Kingdom', '1'],
        ],
    },
    {
        title: 'Historial laboral',
        description: 'Muestra cambios históricos de cargo o departamento por empleado.',
        sql: `SELECT *
FROM job_history;`,
        columns: ['employee_id', 'start_date', 'end_date', 'job_id', 'department_id'],
        rows: [
            ['102', '2001-01-13', '2006-07-24', 'IT_PROG', '60'],
            ['101', '1997-09-21', '2001-10-27', 'AC_ACCOUNT', '110'],
            ['201', '2004-02-17', '2007-12-19', 'MK_REP', '20'],
        ],
    },
    {
        title: 'Catálogo de cargos',
        description: 'Consulta los cargos disponibles con sus rangos salariales.',
        sql: `SELECT *
FROM jobs;`,
        columns: ['job_id', 'job_title', 'min_salary', 'max_salary'],
        rows: [
            ['AD_PRES', 'President', '20080', '40000'],
            ['IT_PROG', 'Programmer', '4000', '10000'],
            ['AC_ACCOUNT', 'Public Accountant', '4200', '9000'],
        ],
    },
    {
        title: 'Catálogo de regiones',
        description: 'Lista las regiones usadas para agrupar países.',
        sql: `SELECT *
FROM regions;`,
        columns: ['region_id', 'region_name'],
        rows: [
            ['1', 'Europe'],
            ['2', 'Americas'],
            ['3', 'Asia'],
        ],
    },
    {
        title: 'Consulta de ubicaciones',
        description: 'Muestra direcciones, ciudades y países asociados a sedes o departamentos.',
        sql: `SELECT *
FROM locations;`,
        columns: ['location_id', 'city', 'country_id', 'postal_code'],
        rows: [
            ['1700', 'Seattle', 'US', '98199'],
            ['1800', 'Toronto', 'CA', 'M5V 2L7'],
            ['2400', 'London', 'UK', 'OX9 9ZB'],
        ],
    },
];

const sqlFunctionNotes: SqlEvidence[] = [
    {
        title: 'BETWEEN / NOT BETWEEN',
        description: 'BETWEEN permite filtrar valores dentro de un rango inclusivo. NOT BETWEEN hace lo contrario: excluye los valores que estén dentro del rango.',
        sql: `SELECT *
FROM employees
WHERE hire_date BETWEEN DATE '2024-01-01' AND DATE '2024-12-31';`,
        columns: ['first_name', 'last_name', 'hire_date'],
        rows: [
            ['Diana', 'Lorentz', '2024-02-15'],
            ['Kevin', 'Mourgos', '2024-08-21'],
        ],
    },
    {
        title: 'Comparación exacta y sensibilidad a mayúsculas',
        description: 'En Oracle, una comparación de texto como last_name = valor suele ser sensible a mayúsculas y minúsculas según la colación/configuración. Para comparar de forma uniforme se puede normalizar con UPPER o LOWER.',
        sql: `SELECT *
FROM employees e
WHERE UPPER(e.last_name) = UPPER('&String');`,
    },
    {
        title: 'Variables de sustitución',
        description: 'El símbolo & en herramientas Oracle como SQL*Plus o SQL Developer solicita un valor antes de ejecutar la sentencia. No es exactamente un bind variable; es sustitución textual previa a la ejecución.',
        sql: `SELECT *
FROM employees e
WHERE last_name = '&String';`,
    },
    {
        title: 'Condición dinámica',
        description: 'Permite ingresar una condición completa desde la herramienta cliente. Debe usarse con cuidado porque puede producir SQL inválido o abrir riesgos de inyección si se arma desde entradas no controladas.',
        sql: `SELECT *
FROM employees e
WHERE &condicion;`,
    },
    {
        title: 'LOWER, UPPER y CONCAT',
        description: 'LOWER convierte texto a minúsculas, UPPER a mayúsculas y CONCAT une cadenas. En Oracle también se usa el operador || para concatenar.',
        sql: `SELECT e.first_name,
       LOWER(e.first_name) AS nombre_minuscula,
       e.last_name,
       UPPER(e.last_name) AS apellido_mayuscula,
       CONCAT(e.first_name, UPPER(e.last_name)) AS nombre_compuesto
FROM employees e;`,
        columns: ['first_name', 'nombre_minuscula', 'last_name', 'apellido_mayuscula', 'nombre_compuesto'],
        rows: [
            ['Steven', 'steven', 'King', 'KING', 'StevenKING'],
            ['Shelley', 'shelley', 'Higgins', 'HIGGINS', 'ShelleyHIGGINS'],
        ],
    },
    {
        title: 'SUBSTR, LENGTH, INSTR, TRIM y REPLACE',
        description: 'Estas funciones manipulan caracteres: SUBSTR extrae texto, LENGTH mide longitud, INSTR encuentra posiciones, TRIM elimina espacios y REPLACE reemplaza fragmentos.',
        sql: `SELECT first_name,
       SUBSTR(first_name, 1, 3) AS iniciales,
       LENGTH(first_name) AS longitud,
       INSTR(first_name, 'a') AS posicion_a,
       TRIM(first_name) AS nombre_limpio,
       REPLACE(first_name, 'a', '@') AS nombre_reemplazado
FROM employees;`,
        columns: ['first_name', 'iniciales', 'longitud', 'posicion_a', 'nombre_reemplazado'],
        rows: [
            ['David', 'Dav', '5', '2', 'D@vid'],
            ['Laura', 'Lau', '5', '2', 'L@ur@'],
        ],
    },
    {
        title: 'TRUNC numérico',
        description: 'TRUNC corta decimales sin redondear. Es útil cuando se necesita conservar solo la parte entera o cierta cantidad fija de decimales.',
        sql: `SELECT TRUNC(45.923) AS valor_truncado
FROM dual;`,
        columns: ['valor_truncado'],
        rows: [['45']],
    },
    {
        title: 'Operaciones con fechas',
        description: 'En Oracle se pueden sumar días directamente a una fecha. Esta consulta muestra la fecha de contratación y la fecha modificada un día después.',
        sql: `SELECT e.first_name,
       e.last_name,
       e.hire_date,
       e.hire_date + 1 AS "fecha modificada"
FROM employees e;`,
        columns: ['first_name', 'last_name', 'hire_date', 'fecha modificada'],
        rows: [
            ['Steven', 'King', '2003-06-17', '2003-06-18'],
            ['Neena', 'Kochhar', '2005-09-21', '2005-09-22'],
        ],
    },
    {
        title: 'TO_DATE con YY y RR',
        description: 'TO_DATE convierte texto a fecha. El formato YY usa el siglo actual de forma simple; RR aplica reglas especiales para interpretar años de dos dígitos en cambios de siglo.',
        sql: `SELECT '13/09/2003' AS texto,
       TO_DATE('13/03/2003', 'DD/MM/YY') AS fecha_yy,
       TO_DATE('13/03/2003', 'DD/MM/RR') AS fecha_rr
FROM dual;`,
        columns: ['texto', 'fecha_yy', 'fecha_rr'],
        rows: [['13/09/2003', '13/03/2003', '13/03/2003']],
    },
    {
        title: 'SYSDATE',
        description: 'SYSDATE devuelve la fecha y hora actual del servidor de base de datos.',
        sql: `SELECT SYSDATE AS fecha_actual
FROM dual;`,
        columns: ['fecha_actual'],
        rows: [['28/05/2026 14:35:00']],
    },
    {
        title: 'Diferencia entre fechas',
        description: 'Restar dos fechas devuelve la cantidad de días entre ellas. ROUND redondea el resultado numérico.',
        sql: `SELECT ROUND(SYSDATE - TO_DATE('13/03/2003', 'DD/MM/YYYY')) AS dias_transcurridos
FROM dual;`,
        columns: ['dias_transcurridos'],
        rows: [['8477']],
    },
    {
        title: 'ROUND aplicado a fechas',
        description: 'ROUND(date, formato) redondea una fecha según el formato indicado. Con MM redondea al mes más cercano.',
        sql: `SELECT ROUND(TO_DATE('2026-05-16', 'YYYY-MM-DD'), 'MM') AS mes_redondeado
FROM dual;`,
        columns: ['mes_redondeado'],
        rows: [['01/06/2026']],
    },
    {
        title: 'MONTHS_BETWEEN',
        description: 'MONTHS_BETWEEN calcula la diferencia aproximada en meses entre dos fechas.',
        sql: `SELECT MONTHS_BETWEEN(SYSDATE, TO_DATE('13/03/2003', 'DD/MM/YYYY')) AS meses
FROM dual;`,
        columns: ['meses'],
        rows: [['278.48']],
    },
    {
        title: 'ADD_MONTHS',
        description: 'ADD_MONTHS suma o resta meses a una fecha.',
        sql: `SELECT ADD_MONTHS(SYSDATE, 1) AS siguiente_mes
FROM dual;`,
        columns: ['siguiente_mes'],
        rows: [['28/06/2026']],
    },
    {
        title: 'NEXT_DAY y LAST_DAY',
        description: 'NEXT_DAY obtiene la siguiente fecha correspondiente a un día de la semana. LAST_DAY devuelve el último día del mes de una fecha.',
        sql: `SELECT NEXT_DAY(SYSDATE, 'FRIDAY') AS proximo_viernes,
       LAST_DAY(SYSDATE) AS ultimo_dia_mes,
       LAST_DAY(SYSDATE + 5) AS ultimo_dia_mes_mas_5
FROM dual;`,
        columns: ['proximo_viernes', 'ultimo_dia_mes', 'ultimo_dia_mes_mas_5'],
        rows: [['29/05/2026', '31/05/2026', '30/06/2026']],
    },
    {
        title: 'Último viernes de un mes',
        description: 'Consulta corregida: no se debe aplicar TO_DATE sobre un valor que ya es fecha. Se calcula el último día del mes, se retrocede siete días y NEXT_DAY busca el siguiente viernes dentro de la última semana.',
        sql: `SELECT NEXT_DAY(LAST_DAY(ADD_MONTHS(SYSDATE, &mes)) - 7, 'FRIDAY') AS ultimo_viernes
FROM dual;`,
        columns: ['ultimo_viernes'],
        rows: [['26/06/2026']],
    },
    {
        title: 'LEFT JOIN hasta regiones',
        description: 'Une empleados con departamentos, ubicaciones, países y regiones. LEFT JOIN conserva empleados aunque falte alguna relación posterior.',
        sql: `SELECT e.first_name,
       r.region_name
FROM employees e
LEFT JOIN departments d
       ON e.department_id = d.department_id
LEFT JOIN locations l
       ON d.location_id = l.location_id
LEFT JOIN countries c
       ON l.country_id = c.country_id
LEFT JOIN regions r
       ON c.region_id = r.region_id;`,
        columns: ['first_name', 'region_name'],
        rows: [
            ['Steven', 'Americas'],
            ['Neena', 'Americas'],
            ['Kimberely', ''],
        ],
    },
    {
        title: 'COUNT de empleados',
        description: 'COUNT(first_name) cuenta los registros donde first_name no es nulo. COUNT(*) cuenta todas las filas.',
        sql: `SELECT COUNT(e.first_name) AS total_empleados
FROM employees e;`,
        columns: ['total_empleados'],
        rows: [['107']],
    },
    {
        title: 'LEFT, RIGHT y FULL OUTER JOIN',
        description: 'LEFT JOIN conserva todos los empleados, RIGHT JOIN conserva todos los departamentos y FULL OUTER JOIN conserva ambos lados aunque no exista coincidencia.',
        sql: `SELECT e.first_name, d.department_name
FROM employees e
LEFT JOIN departments d
       ON e.department_id = d.department_id;

SELECT e.first_name, d.department_name
FROM employees e
RIGHT JOIN departments d
       ON e.department_id = d.department_id;

SELECT e.first_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d
       ON e.department_id = d.department_id;`,
        columns: ['first_name', 'department_name', 'tipo_join'],
        rows: [
            ['Steven', 'Executive', 'LEFT/FULL'],
            ['Kimberely', '', 'LEFT/FULL'],
            ['', 'Payroll', 'RIGHT/FULL'],
        ],
    },
    {
        title: 'CROSS JOIN',
        description: 'CROSS JOIN genera el producto cartesiano entre dos tablas. Si hay 107 empleados y 27 departamentos, el resultado tiene 2889 combinaciones.',
        sql: `SELECT COUNT(*) AS combinaciones
FROM employees e
CROSS JOIN departments d;`,
        columns: ['combinaciones'],
        rows: [['2889']],
    },
    {
        title: 'Self join empleado-manager',
        description: 'Une employees consigo misma para obtener el nombre del empleado y el nombre de su manager.',
        sql: `SELECT e.first_name AS empleado,
       m.first_name AS manager
FROM employees e
INNER JOIN employees m
       ON e.manager_id = m.employee_id;`,
        columns: ['empleado', 'manager'],
        rows: [
            ['Neena', 'Steven'],
            ['Lex', 'Steven'],
            ['Alexander', 'Lex'],
        ],
    },
    {
        title: 'MAX por empleado y departamento',
        description: 'Agrupa por empleado y departamento para calcular el salario máximo dentro de cada combinación. En este caso, como el empleado suele ser único, el máximo coincide con su salario.',
        sql: `SELECT e.first_name,
       e.department_id,
       MAX(e.salary) AS salario_maximo
FROM employees e
GROUP BY e.first_name, e.department_id;`,
        columns: ['first_name', 'department_id', 'salario_maximo'],
        rows: [
            ['Steven', '90', '24000'],
            ['Shelley', '110', '12008'],
        ],
    },
    {
        title: 'MAX por departamento',
        description: 'Agrupa por nombre de departamento y obtiene el salario máximo registrado en cada área.',
        sql: `SELECT d.department_name,
       MAX(e.salary) AS "salario maximo"
FROM employees e
INNER JOIN departments d
        ON e.department_id = d.department_id
GROUP BY d.department_name;`,
        columns: ['department_name', 'salario maximo'],
        rows: [
            ['Executive', '24000'],
            ['Accounting', '12008'],
            ['Sales', '14000'],
        ],
    },
    {
        title: 'EXPLAIN PLAN y DBMS_XPLAN',
        description: 'EXPLAIN PLAN registra el plan estimado de ejecución. DBMS_XPLAN.DISPLAY permite visualizar operaciones como joins, agrupaciones, ordenamientos y accesos a tablas o índices.',
        sql: `EXPLAIN PLAN FOR
SELECT d.department_name,
       MAX(e.salary) AS "salario maximo",
       MIN(e.salary) AS "minimo salario",
       COUNT('X') AS "empleados por departamento"
FROM employees e
INNER JOIN departments d
        ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY MAX(e.salary) DESC;

SELECT *
FROM TABLE(DBMS_XPLAN.DISPLAY);`,
        columns: ['operation', 'object_name', 'description'],
        rows: [
            ['HASH JOIN', 'EMPLOYEES/DEPARTMENTS', 'Une tablas por department_id'],
            ['HASH GROUP BY', '', 'Agrupa por department_name'],
            ['SORT ORDER BY', '', 'Ordena por salario máximo descendente'],
        ],
    },
    {
        title: 'LPAD, RPAD y DUAL',
        description: 'LPAD rellena a la izquierda y RPAD a la derecha hasta una longitud definida. DUAL es una tabla especial de Oracle usada para evaluar expresiones sin consultar una tabla de negocio.',
        sql: `SELECT LPAD(1, 4, '*') || RPAD(1, 4, '*') ||
       LPAD(1, 4, '*') || RPAD(1, 4, '*') AS patron
FROM dual;`,
        columns: ['patron'],
        rows: [['***11******11***']],
    },
    {
        title: 'Funciones de grupo: AVG y COUNT',
        description: 'AVG calcula promedios y COUNT cuenta registros. Son funciones de múltiples filas porque reciben un conjunto de filas y devuelven un resultado agregado.',
        sql: `SELECT d.department_name,
       AVG(e.salary) AS salario_promedio,
       COUNT(*) AS total_empleados
FROM employees e
INNER JOIN departments d
        ON e.department_id = d.department_id
GROUP BY d.department_name;`,
        columns: ['department_name', 'salario_promedio', 'total_empleados'],
        rows: [
            ['Accounting', '10154', '2'],
            ['IT', '5760', '5'],
            ['Sales', '8955', '34'],
        ],
    },
    {
        title: 'Cómo trabaja el motor internamente',
        description: 'De forma simplificada, Oracle revisa la sintaxis, valida objetos y permisos, busca si el plan ya existe en memoria compartida, optimiza el plan de ejecución y lee bloques de datos desde buffer cache o disco. El uso de bind variables ayuda a reutilizar sentencias y reducir parseos.',
        sql: `SELECT *
FROM employees
WHERE employee_id = :employee_id;`,
    },
    {
        title: 'SQL dinámico en Oracle',
        description: 'Oracle permite construir sentencias en tiempo de ejecución con EXECUTE IMMEDIATE o DBMS_SQL. Se usa cuando tablas, columnas o filtros cambian dinámicamente, pero debe parametrizarse para evitar inyección SQL.',
        sql: `BEGIN
    EXECUTE IMMEDIATE
        'UPDATE employees SET salary = salary * 1.10 WHERE department_id = :dept'
        USING 110;
END;`,
    },
];

export default function RelationalDb() {
    const [selectedImage, setSelectedImage] = useState<Evidence | null>(null);
    const [activeCategory, setActiveCategory] = useState('Todos');

    const filteredEvidences = activeCategory === 'Todos' 
        ? evidenceImages 
        : evidenceImages.filter(img => img.category === activeCategory);

    const handleCardClick = (evidence: Evidence) => {
        if ((evidence.isExcel || evidence.isFolder) && evidence.link) {
            window.open(evidence.link, '_blank');
        } else {
            setSelectedImage(evidence);
        }
    };

    return (
        <section id="relational-db" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-background opacity-10" />
            <div id="evidencias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24">
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
                                        evidence.isExcel || evidence.isFolder ? 'bg-emerald-500/10 border-2 border-emerald-500/20' : 'bg-white/80'
                                    }`}
                                    onClick={() => handleCardClick(evidence)}
                                >
                                    {evidence.isExcel || evidence.isFolder ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                            <FileSpreadsheet size={48} className="text-emerald-500" />
                                            <div className="text-center">
                                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                                    {evidence.isFolder ? 'Abrir proyecto final' : 'Abrir Taller 1'}
                                                </span>
                                                <p className="text-[10px] text-emerald-600/60 font-mono mt-1">
                                                    {evidence.isFolder ? 'SharePoint' : 'ejercicio 2 taller 1'}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={evidence.src} alt={evidence.title} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        {evidence.isExcel || evidence.isFolder ? <ExternalLink className="text-white" size={24} /> : <Maximize2 className="text-white" size={24} />}
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-foreground mt-4 mb-2">{evidence.title}</h4>
                                <p className="text-sm text-foreground/60 line-clamp-2">{evidence.description}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {(activeCategory === 'Todos' || activeCategory === 'SQL') && (
                    <div className="mt-20 space-y-14">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/10 text-primary-300 text-sm font-semibold mb-4">
                                <Code2 size={18} />
                                Sentencias SQL
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                                Consultas y resultados simulados
                            </h3>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {sqlEvidences.map((item, index) => (
                                <motion.article
                                    key={item.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: index * 0.04 }}
                                    className="rounded-2xl border border-primary-500/15 bg-background/70 shadow-xl overflow-hidden"
                                >
                                    <div className="p-5 border-b border-primary-500/10">
                                        <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                                        <p className="text-sm leading-relaxed text-foreground/65">{item.description}</p>
                                    </div>

                                    <pre className="m-0 overflow-x-auto bg-black/50 p-5 text-sm leading-relaxed text-accent-100">
                                        <code>{item.sql}</code>
                                    </pre>

                                    {item.columns && item.rows && (
                                        <div className="p-5">
                                            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-primary-300">
                                                <Table2 size={16} />
                                                Resultado simulado
                                            </div>
                                            <div className="overflow-x-auto rounded-xl border border-primary-500/10">
                                                <table className="w-full min-w-[520px] text-left text-sm">
                                                    <thead className="bg-primary-500/10 text-primary-200">
                                                        <tr>
                                                            {item.columns.map((column) => (
                                                                <th key={column} className="px-4 py-3 font-semibold">
                                                                    {column}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-primary-500/10">
                                                        {item.rows.map((row) => (
                                                            <tr key={row.join('-')} className="text-foreground/75">
                                                                {row.map((value, valueIndex) => (
                                                                    <td key={`${value}-${valueIndex}`} className="px-4 py-3 whitespace-nowrap">
                                                                        {value}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </motion.article>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                                    Funciones y conceptos SQL
                                </h3>
                                <p className="max-w-3xl text-foreground/65 leading-relaxed">
                                    Resumen de las funciones, operadores y conceptos usados en las sentencias.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {sqlFunctionNotes.map((item) => (
                                    <motion.article
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35 }}
                                        className="rounded-2xl border border-accent-500/15 bg-gradient-to-br from-primary-500/5 to-accent-500/5 overflow-hidden"
                                    >
                                        <div className="p-5">
                                            <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                                            <p className="text-sm leading-relaxed text-foreground/65">{item.description}</p>
                                        </div>

                                        <pre className="m-0 overflow-x-auto bg-black/45 p-5 text-sm leading-relaxed text-accent-100">
                                            <code>{item.sql}</code>
                                        </pre>

                                        {item.columns && item.rows && (
                                            <div className="p-5 pt-0">
                                                <div className="overflow-x-auto rounded-xl border border-accent-500/10">
                                                    <table className="w-full min-w-[360px] text-left text-sm">
                                                        <thead className="bg-accent-500/10 text-accent-200">
                                                            <tr>
                                                                {item.columns.map((column) => (
                                                                    <th key={column} className="px-4 py-3 font-semibold">
                                                                        {column}
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-accent-500/10">
                                                            {item.rows.map((row) => (
                                                                <tr key={row.join('-')} className="text-foreground/75">
                                                                    {row.map((value, valueIndex) => (
                                                                        <td key={`${value}-${valueIndex}`} className="px-4 py-3 whitespace-nowrap">
                                                                            {value}
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
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
