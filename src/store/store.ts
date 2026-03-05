import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  mobileOpen: boolean;
  toggleSidebar: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileOpen: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobile: () =>
    set((state) => ({ mobileOpen: !state.mobileOpen })),
  closeMobile: () => set({ mobileOpen: false }),
})); // explicame este codigo
// Este código define un estado global para la interfaz de usuario utilizando la biblioteca Zustand. El estado incluye una propiedad `sidebarOpen` que indica si la barra lateral está abierta o cerrada, y dos funciones: `toggleSidebar` para alternar el estado de la barra lateral y `setSidebar` para establecer el estado de la barra lateral a un valor específico.
// La función `create` de Zustand se utiliza para crear el estado global, y el objeto pasado a `create` define el estado inicial y las funciones para modificarlo. En este caso, `sidebarOpen` se inicializa como `true`, lo que significa que la barra lateral está abierta por defecto. La función `toggleSidebar` cambia el valor de `sidebarOpen` al contrario de su valor actual, mientras que `setSidebar` permite establecer el valor de `sidebarOpen` directamente.