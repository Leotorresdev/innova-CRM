// stats-card.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  color?: "blue" | "violet" | "emerald" | "rose";
  trend?: string;
  index?: number;
}

const COLOR_MAP = {
  blue:    { bg: "bg-blue-500/10",    icon: "text-blue-500",    border: "border-blue-100"    },
  violet:  { bg: "bg-violet-500/10",  icon: "text-violet-500",  border: "border-violet-100"  },
  emerald: { bg: "bg-emerald-500/10", icon: "text-emerald-500", border: "border-emerald-100" },
  rose:    { bg: "bg-rose-500/10",    icon: "text-rose-500",    border: "border-rose-100"    },
};

export function StatsCard({ title, value, icon, color = "blue", trend, index = 0 }: Props) {
  const colors = COLOR_MAP[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white p-6",
        "border shadow-sm hover:shadow-md transition-shadow duration-200",
        colors.border
      )}
    >
      {/* Círculo decorativo de fondo */}
      <div className={cn(
        "absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20",
        colors.bg
      )} />

      <div className="flex items-start justify-between relative">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-black text-slate-800">
            {value.toLocaleString()}
          </p>
          {trend && (
            <div className="flex items-center gap-1 text-emerald-500">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-semibold">{trend}</span>
            </div>
          )}
        </div>

        <div className={cn("p-3 rounded-xl", colors.bg)}>
          <div className={colors.icon}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );
}