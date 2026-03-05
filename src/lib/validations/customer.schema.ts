import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(7, "El teléfono debe tener al menos 7 caracteres"),
  instagram: z.string().optional().or(z.literal("")),
  state: z.string().min(1, "Selecciona un estado"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;