"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  LayoutDashboard,
  Package,
  StickyNote,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/customers", icon: User, label: "Clientes" },
  { href: "/products", icon: Package, label: "Productos" },
  { href: "/notes", icon: StickyNote, label: "Notas" },
];

const bottomItems = [
  { href: "/settings", icon: Settings, label: "Configuración" },
];

export function Sidebar() {
  const { sidebarOpen, mobileOpen, closeMobile } = useUIStore();

  return (
    <>
      {/* Overlay mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed md:static z-50 h-screen flex flex-col",
          "bg-slate-950 text-slate-100",
          "border-r border-slate-800/60",
          "transition-all duration-300 ease-in-out",
          "shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.04)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          "w-64",
          sidebarOpen ? "md:w-64" : "md:w-18"
        )}
      >
        {/* Header del sidebar */}
        <div
          className={cn(
            "h-16 flex items-center border-b border-slate-800/60 shrink-0 overflow-hidden",
            sidebarOpen ? "px-5 gap-3" : "md:justify-center md:px-0 px-5 gap-3"
          )}
        >
          {/* Badge logo azul */}
          <div className="w-7 h-7 rounded-lg bg-zinc-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
            <span className="text-white font-black text-xs">📦</span>
          </div>

          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.span
                key="label"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="font-black tracking-[0.2em] uppercase text-sm text-slate-100 hidden md:block"
              >
                Innova
              </motion.span>
            )}
          </AnimatePresence>

          {/* Siempre visible en mobile */}
          <span className="font-black tracking-[0.2em] uppercase text-sm text-slate-100 md:hidden">
            Innova
          </span>
        </div>

        {/* Nav principal */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-slate-500 px-3 pb-2 hidden md:block"
              >
                Menú
              </motion.p>
            )}
          </AnimatePresence>

          {navItems.map((item, i) => (
            <motion.div
              key={item.href + item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
            >
              <SidebarItem
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            </motion.div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 border-t border-slate-800/60 px-3 py-3 space-y-1">
          {bottomItems.map((item) => (
            <SidebarItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}

          {/* Logout */}
          <button
            onClick={() => {}}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl",
              "text-slate-500 hover:text-rose-400 hover:bg-rose-400/10",
              "transition-all duration-200 group",
              !sidebarOpen && "md:justify-center"
            )}
          >
            <LogOut
              size={18}
              className="shrink-0 group-hover:scale-110 transition-transform"
            />

            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium overflow-hidden whitespace-nowrap hidden md:block"
                >
                  Cerrar Sesión
                </motion.span>
              )}
            </AnimatePresence>

            <span className="text-sm font-medium md:hidden">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── SidebarItem ────────────────────────────────────────────────────────────

function SidebarItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  const { sidebarOpen, closeMobile } = useUIStore();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={closeMobile}
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-xl group",
        "transition-all duration-200",
        !sidebarOpen && "md:justify-center",
        isActive
          ? "bg-blue-500/15 text-blue-400"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-400 rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}

      <Icon
        size={18}
        className={cn(
          "shrink-0 transition-transform duration-200 group-hover:scale-110",
          isActive ? "text-blue-400" : ""
        )}
      />

      {/* Label desktop con animación */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium overflow-hidden whitespace-nowrap hidden md:block"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Label siempre visible en mobile */}
      <span className="text-sm font-medium md:hidden">{label}</span>

      {/* Arrow hint en hover */}
      {sidebarOpen && !isActive && (
        <ChevronRight
          size={14}
          className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity hidden md:block text-slate-400"
        />
      )}
    </Link>
  );
}