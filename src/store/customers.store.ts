import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Customer } from "@/lib/types/customer";

interface CustomersState {
  customers: Customer[];
  addCustomer: (data: Omit<Customer, "id" | "createdAt">) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

export const useCustomersStore = create<CustomersState>()(
  persist(
    (set) => ({
      customers: [],

      addCustomer: (data) =>
        set((state) => ({
          customers: [
            ...state.customers,
            {
              ...data,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateCustomer: (id, data) =>
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, ...data } : customer
          ),
        })),

      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "innova-customers", // clave en localStorage
    }
  )
);