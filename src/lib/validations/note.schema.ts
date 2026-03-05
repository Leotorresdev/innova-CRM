import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  content: z.string().min(5, "El contenido es obligatorio"),
});

export type NoteFormValues = z.infer<typeof noteSchema>;