import { NoteDialog } from "@/components/notes/note-dialog";
import { NotesList } from "@/components/notes/notes-list";

export default function NotesPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Notas
        </h1>

        <NoteDialog />
      </div>

      <NotesList />
    </div>
  );
}