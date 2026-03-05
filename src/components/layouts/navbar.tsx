"use client";

import Image from "next/image";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUIStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { toggleSidebar, toggleMobile } = useUIStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50 shadow-sm">

      {/* LEFT: Toggle + Logo */}
      <div className="flex items-center gap-3">

        {/* Mobile menu */}
        <motion.div whileTap={{ scale: 0.9 }} className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobile}
            className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors rounded-xl"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Desktop collapse */}
        <motion.div whileTap={{ scale: 0.9 }} className="hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors rounded-xl"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center shadow-md">
            <Image
              src="/icon.png"
              alt="Innova Logo"
              width={32}
              height={32}
              priority
              className="object-contain"
            />
          </div>
          <span className="font-black text-base tracking-widest uppercase hidden sm:block text-zinc-900">
            Innova
          </span>
        </motion.div>
      </div>

      {/* CENTER: Search bar - desktop */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar notas..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
          />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">

        {/* Search icon - mobile */}
        <motion.div whileTap={{ scale: 0.9 }} className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <Search className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Notifications */}
        <motion.div whileTap={{ scale: 0.9 }} className="hidden sm:block">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </Button>
        </motion.div>

        {/* Divider */}
        <div className="w-px h-6 bg-zinc-200 mx-1 hidden sm:block" />

        {/* User Avatar con dropdown */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-zinc-100 transition-colors group"
          >
            <Avatar className="w-8 h-8 ring-2 ring-zinc-200 group-hover:ring-zinc-400 transition-all">
              <AvatarFallback className="bg-zinc-900 text-white text-xs font-bold">
                LT
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 hidden sm:block transition-transform duration-200 ${
                showUserMenu ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          {/* Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-52 bg-white border border-zinc-100 rounded-2xl shadow-xl shadow-zinc-200/80 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-zinc-100">
                  <p className="text-sm font-semibold text-zinc-900">Luis Torres</p>
                  <p className="text-xs text-zinc-400 truncate">luis@innova.com</p>
                </div>
                <div className="p-1.5">
                  {["Mi Perfil", "Configuración", "Cerrar Sesión"].map((item, i) => (
                    <button
                      key={item}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-colors ${
                        i === 2
                          ? "text-rose-500 hover:bg-rose-50"
                          : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile search expandible */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 right-0 bg-white border-b border-zinc-100 px-4 py-3 md:hidden z-40"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar notas..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}