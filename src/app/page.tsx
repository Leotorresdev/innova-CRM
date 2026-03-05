import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen p-6 lg:p-10 overflow-hidden">
      
      {/* Marca de agua con logo INNOVA */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
        <Image
          src="/icon.png"
          alt="Innova"
          width={700}
          height={700}
          className="w-350 h-auto"
        />
      </div>

      <div className="relative z-10">
        <DashboardHeader />
        <DashboardStats />
      </div>
    </div>
  );
}
//mejoras de los errores 
//el scroll solo se active en movile en desktop no se active el scroll y se vea todo el contenido sin necesidad de hacer scroll