import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "../components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trabajos Alcaldía - Encuentra tu próximo trabajo",
  description: "Portal de búsqueda de empleo con miles de oportunidades laborales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
