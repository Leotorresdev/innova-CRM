# 🚀 Innova — Sistema de Gestión

Sistema de gestión empresarial moderno construido con Next.js 16, TypeScript y Tailwind CSS. Permite administrar clientes y notas de forma eficiente con una interfaz limpia y responsiva.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16.1.6 | Framework principal |
| React | 19.2.3 | UI Library |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | ^4 | Estilos |
| Zustand | ^5 | Estado global |
| Framer Motion | ^12 | Animaciones |
| React Hook Form | ^7 | Manejo de formularios |
| Zod | ^4 | Validación de schemas |
| Lucide React | ^0.575 | Iconografía |
| shadcn/ui | ^3 | Componentes UI |

---

## 📁 Estructura del Proyecto
```
src/
├── app/
│   ├── layout.tsx          # Layout raíz con metadata y favicon
│   ├── page.tsx            # Dashboard principal
│   ├── customers/
│   │   └── page.tsx        # Gestión de clientes
│   └── notes/
│       └── page.tsx        # Gestión de notas
│
├── components/
│   ├── layouts/
│   │   ├── dashboard-layout.tsx
│   │   ├── navbar.tsx
│   │   └── sidebar.tsx
│   ├── dashboard/
│   │   ├── dashboard-header.tsx
│   │   ├── dashboard-stats.tsx
│   │   └── stats-card.tsx
│   ├── customers/
│   │   ├── customer-table.tsx
│   │   ├── customer-form.tsx
│   │   └── customer-dialog.tsx
│   └── notes/
│       ├── notes-list.tsx
│       ├── note-card.tsx
│       ├── note-form.tsx
│       └── note-dialog.tsx
│
├── store/
│   ├── store.ts            # UI store (sidebar, mobile)
│   ├── customers.store.ts  # Store de clientes con persist
│   └── notes.store.ts      # Store de notas con persist
│
└── lib/
    ├── utils.ts
    ├── types/
    │   └── customer.ts
    └── validations/
        ├── customer.schema.ts
        └── note.schema.ts
```

---

## ✨ Funcionalidades

### 📊 Dashboard
- Resumen general del sistema en tiempo real
- Cards de estadísticas: clientes registrados, clientes activos, notas creadas
- Fecha dinámica y badge de estado del sistema
- Animaciones escalonadas en la carga

### 👥 Clientes
- Listado con búsqueda en tiempo real por nombre, email o teléfono
- Ordenamiento por columnas (nombre, email, fecha)
- Campos: nombre, email, teléfono, instagram, estado
- Estados visuales: Activo, Inactivo, Pendiente
- Links directos a email, teléfono e Instagram
- Confirmación antes de eliminar
- Vista tabla en desktop / cards en mobile

### 📝 Notas
- Creación con título y contenido
- Cards con colores rotativos
- Confirmación antes de eliminar
- Grid responsivo: 1 columna mobile / 2 tablet / 3 desktop

### 🎨 UI/UX
- Diseño completamente responsivo (mobile, tablet, desktop)
- Sidebar colapsable en desktop y drawer en mobile
- Animaciones con Framer Motion
- Paleta de colores cohesiva en azul y slate
- Persistencia de datos en localStorage via Zustand persist

---

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/innova.git

# Entrar al directorio
cd innova

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Iniciar en producción
npm run lint     # Verificar errores de ESLint
```

---

## 💾 Persistencia de Datos

Los datos se almacenan en `localStorage` del navegador mediante el middleware `persist` de Zustand:

| Store | Clave localStorage |
|---|---|
| Clientes | `innova-customers` |
| Notas | `innova-notes` |

> Los datos persisten entre sesiones pero son locales al navegador. Para producción se recomienda integrar una base de datos como Supabase o PlanetScale.

---

## 🗂️ Modelos de Datos
```typescript
// Cliente
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  state: string;        // "Activo" | "Inactivo" | "Pendiente"
  createdAt: string;    // ISO string
}

// Nota
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;    // ISO string
}
```

---

## 🔮 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Integración con base de datos (Supabase)
- [ ] Edición de clientes y notas
- [ ] Exportar clientes a CSV
- [ ] Módulo de productos
- [ ] Modo oscuro
- [ ] Notificaciones en tiempo real

---

## 👨‍💻 Desarrollado con

Next.js + TypeScript + Tailwind CSS + Zustand + Framer Motion

---

> Innova — Sistema de gestión moderno y eficiente.
