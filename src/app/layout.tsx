import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Data Engineer Portfolio | Tu Nombre",
    description: "Portafolio profesional de Data Engineer especializado en pipelines de datos, Big Data y arquitecturas cloud",
    keywords: ["Data Engineer", "Big Data", "Apache Spark", "Kafka", "ETL", "Data Pipeline", "Cloud"],
    authors: [{ name: "Tu Nombre" }],
    openGraph: {
        title: "Data Engineer Portfolio",
        description: "Portafolio profesional de Data Engineer",
        type: "website",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
        <body className="antialiased">
        {children}
        </body>
        </html>
    );
}