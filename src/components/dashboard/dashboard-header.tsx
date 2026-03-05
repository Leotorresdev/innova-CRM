// dashboard-header.tsx
"use client";

import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

export function DashboardHeader() {
  const now = new Date().toLocaleDateString("es-DO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-xs text-slate-400 capitalize">{now}</p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-semibold text-emerald-600">Sistema activo</span>
      </div>
    </motion.div>
  );
}