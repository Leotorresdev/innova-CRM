"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, StickyNote } from "lucide-react";
import { useNotesStore, Note } from "@/store/notes.store";
import { cn } from "@/lib/utils";

const CARD_COLORS = [
  "border-blue-100   bg-blue-50/50",
  "border-violet-100 bg-violet-50/50",
  "border-emerald-100 bg-emerald-50/50",
  "border-amber-100  bg-amber-50/50",
  "border-rose-100   bg-rose-50/50",
];

interface Props {
  note: Note;
  index: number;
}

export function NoteCard({ note, index }: Props) {
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const [confirm, setConfirm] = useState(false);
  const color = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={cn(
        "group flex flex-col gap-3 p-5 rounded-2xl border shadow-sm",
        "hover:shadow-md transition-shadow duration-200",
        color
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <StickyNote className="w-4 h-4 shrink-0 text-slate-400" />
          <h3 className="font-bold text-slate-800 text-sm truncate">
            {note.title}
          </h3>
        </div>

        {confirm ? (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => deleteNote(note.id)}
              className="text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 px-2 py-0.5 rounded-lg transition-colors"
            >
              Eliminar
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-0.5 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirm(true)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Contenido */}
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 flex-1">
        {note.content}
      </p>

      {/* Fecha */}
      <p className="text-[11px] text-slate-400 font-medium">
        {new Date(note.createdAt).toLocaleDateString("es-DO", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
    </motion.div>
  );
}