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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
