"use client";

import { Users, StickyNote, TrendingUp, Activity } from "lucide-react";
import { StatsCard } from "./stats-card";
import { useCustomersStore } from "@/store/customers.store";
import { useNotesStore } from "@/store/notes.store";

export function DashboardStats() {
  const customers = useCustomersStore((state) => state.customers);
  const notes = useNotesStore((state) => state.notes);

  const activeCustomers = customers.filter(
    (c) => c.state?.toLowerCase() === "activo"
  ).length;

  const stats = [
    {
      title: "Clientes Registrados",
      value: customers.length,
      icon: <Users className="w-5 h-5" />,
      color: "blue" as const,
      index: 0,
    },
    {
      title: "Clientes Activos",
      value: activeCustomers,
      icon: <Activity className="w-5 h-5" />,
      color: "emerald" as const,
      index: 1,
    },
    {
      title: "Notas Creadas",
      value: notes.length,
      icon: <StickyNote className="w-5 h-5" />,
      color: "violet" as const,
      index: 2,
    },
    {
      title: "Crecimiento",
      value: customers.length,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "rose" as const,
      trend: "Este mes",
      index: 3,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}