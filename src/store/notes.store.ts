import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesStore {
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],

      addNote: (note) =>
        set((state) => ({
          notes: [
            {
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              ...note,
            },
            ...state.notes,
          ],
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
    }),
    { name: "innova-notes" }
  )
);