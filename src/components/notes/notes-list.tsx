"use client";

import { AnimatePresence } from "framer-motion";
import { StickyNote } from "lucide-react";
import { useNotesStore } from "@/store/notes.store";
import { NoteCard } from "./note-card";

export function NotesList() {
  const notes = useNotesStore((state) => state.notes);

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
        <StickyNote className="w-12 h-12 opacity-30" />
        <p className="text-sm font-medium">No hay notas creadas aún</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {notes.map((note, i) => (
          <NoteCard key={note.id} note={note} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}