import type { Metadata } from "next";
import "./globals.css";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export const metadata: Metadata = {
  title: "Innova - CRM",
  description: "Sistema de gestión Innova",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}