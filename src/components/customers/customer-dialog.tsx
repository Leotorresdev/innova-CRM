"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomerForm } from "./customer-form";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export function CustomerDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 rounded-xl shadow-md shadow-blue-500/20 transition-all">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Cliente</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl border-slate-200 shadow-xl">
        <DialogHeader className="pb-2 border-b border-slate-100">
          <DialogTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-blue-500" />
            </div>
            Agregar Cliente
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para registrar un nuevo cliente en el sistema.
          </DialogDescription>
        </DialogHeader>

        <CustomerForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}