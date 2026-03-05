import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  email: z
    .string()
    .email("Ingresa un email válido"),

  phone: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 caracteres"),

  instagram: z
    .string()
    .default(""),

  state: z
    .string()
    .min(1, "Selecciona un estado"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;