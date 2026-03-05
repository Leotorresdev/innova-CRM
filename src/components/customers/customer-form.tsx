"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, CustomerFormValues } from "@/lib/validations/customer.schema";
import { useCustomersStore } from "@/store/customers.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSuccess?: () => void;
}

const STATE_OPTIONS = ["Activo", "Inactivo", "Pendiente"] as const;

export function CustomerForm({ onSuccess }: Props) {
  const { addCustomer } = useCustomersStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      instagram: "",
      state: "Activo",
    },
  });

  // useWatch es la forma correcta de observar un campo de forma reactiva
  const selectedState = useWatch({ control, name: "state" });

  const onSubmit = (data: CustomerFormValues) => {
    addCustomer(data);
    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Fila 1: Nombre y Email */}
      <div className="grid gap-4 sm:grid-cols-2">

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Nombre
          </Label>
          <Input
            {...register("name")}
            placeholder="Juan Pérez"
            className={cn(
              "rounded-xl border-slate-200",
              errors.name && "border-rose-300"
            )}
          />
          {errors.name && (
            <p className="text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>

      </div>

      {/* Fila 2: Teléfono e Instagram */}
      <div className="grid gap-4 sm:grid-cols-2">

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Teléfono
          </Label>
          <Input
            {...register("phone")}
            placeholder="809-000-0000"
            className={cn(
              "rounded-xl border-slate-200",
              errors.phone && "border-rose-300"
            )}
          />
          {errors.phone && (
            <p className="text-xs text-rose-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Instagram
          </Label>
          <Input
            {...register("instagram")}
            placeholder="@usuario"
            className="rounded-xl border-slate-200"
          />
          {errors.instagram && (
            <p className="text-xs text-rose-500">{errors.instagram.message}</p>
          )}
        </div>

      </div>

      {/* Estado */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Estado
        </Label>
        <div className="flex gap-2">
          {STATE_OPTIONS.map((state) => (
            <button
              key={state}
              type="button"
              onClick={() => setValue("state", state)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold border transition-all",
                selectedState === state
                  ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500"
              )}
            >
              {state}
            </button>
          ))}
        </div>
        {errors.state && (
          <p className="text-xs text-rose-500">{errors.state.message}</p>
        )}
      </div>

      {/* Acciones */}
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
            "Guardar Cliente"
          )}
        </Button>
      </div>

    </form>
  );
}
