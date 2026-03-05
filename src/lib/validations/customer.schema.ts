import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(7, "El teléfono debe tener al menos 7 caracteres"),
  instagram: z.string().default(""),
  state: z.string().min(1, "Selecciona un estado"),
});

// Usamos el tipo de INPUT no de output
export type CustomerFormValues = z.input<typeof customerSchema>;