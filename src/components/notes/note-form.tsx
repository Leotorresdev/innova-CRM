"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, NoteFormValues } from "@/lib/validations/note.schema";
import { useNotesStore } from "@/store/notes.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSuccess?: () => void;
}

export function NoteForm({ onSuccess }: Props) {
  const addNote = useNotesStore((state) => state.addNote);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = (data: NoteFormValues) => {
    addNote(data);
    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Título
        </Label>
        <Input
          {...register("title")}
          placeholder="Título de la nota"
          className={cn(
            "rounded-xl border-slate-200",
            errors.title && "border-rose-300"
          )}
        />
        {errors.title && (
          <p className="text-xs text-rose-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Contenido
        </Label>
        <Textarea
          {...register("content")}
          placeholder="Escribe el contenido..."
          rows={5}
          className={cn(
            "rounded-xl border-slate-200 resize-none",
            errors.content && "border-rose-300"
          )}
        />
        {errors.content && (
          <p className="text-xs text-rose-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => reset()}
          className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors"
        >
          Limpiar
        </button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 rounded-xl shadow-md shadow-blue-500/20"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </span>
          ) : (
            "Guardar Nota"
          )}
        </Button>
      </div>

    </form>
  );
}