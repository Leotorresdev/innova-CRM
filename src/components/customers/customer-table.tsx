"use client";

import { useState } from "react";
import { useCustomersStore } from "@/store/customers.store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Instagram,
  Phone,
  Users,
  Search,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Tipos ─────────────────────────────────────────────────────────────────────
type SortField = "name"| "createdAt";
type SortDir = "asc" | "desc";

// ── Constantes ────────────────────────────────────────────────────────────────
const STATE_COLORS: Record<string, string> = {
  activo: "bg-emerald-100 text-emerald-700",
  inactivo: "bg-zinc-100 text-zinc-500",
  pendiente: "bg-amber-100 text-amber-700",
};

const SORT_COLS: { key: SortField; label: string }[] = [
  { key: "name", label: "Nombre" },
  { key: "createdAt", label: "Fecha" },
];

// ── Sub-componentes ───────────────────────────────────────────────────────────
function StateBadge({ state }: { state: string }) {
  return (
    <span
      className={cn(
        "text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
        STATE_COLORS[state?.toLowerCase()] ?? "bg-slate-100 text-slate-500"
      )}
    >
      {state || "—"}
    </span>
  );
}

function DeleteCell({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id: string) => void;
}) {
  const [confirm, setConfirm] = useState(false);

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onDelete(id);
            setConfirm(false);
          }}
          className="text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 px-2.5 py-1 rounded-lg transition-colors"
        >
          Confirmar
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="text-xs text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3"
    >
      <Users className="w-12 h-12 opacity-30" />
      <p className="text-sm font-medium">No hay clientes registrados aún</p>
    </motion.div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export function CustomerTable() {
  const { customers, deleteCustomer } = useCustomersStore();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  if (customers.length === 0) return <EmptyState />;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = customers
    .filter((c) =>
      [c.name, c.phone].some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const valA = a[sortField] ?? "";
      const valB = b[sortField] ?? "";
      return sortDir === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    const active = sortField === field;
    const Icon = !active || sortDir === "asc" ? ChevronUp : ChevronDown;
    return (
      <Icon className={cn("w-3 h-3", active ? "text-blue-500" : "opacity-20")} />
    );
  };

  return (
    <div className="space-y-4">

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email o teléfono..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
        />
      </div>

      <p className="text-xs text-slate-400 font-medium px-1">
        {filtered.length} cliente{filtered.length !== 1 ? "s" : ""} encontrado
        {filtered.length !== 1 ? "s" : ""}
      </p>

      {/* ── Tabla desktop ── */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              {SORT_COLS.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-5 py-3.5 text-left cursor-pointer hover:text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {label}
                    <SortIcon field={key} />
                  </div>
                </th>
              ))}
              <th className="px-5 py-3.5 text-left">Teléfono</th>
              <th className="px-5 py-3.5 text-left">Instagram</th>
              <th className="px-5 py-3.5 text-left">Estado</th>
              <th className="px-5 py-3.5 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filtered.map((customer, i) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="border-b border-slate-100 last:border-none hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="px-5 py-4 font-semibold text-slate-800 text-sm">
                    {customer.name}
                  </td>

                  <td className="px-5 py-4 text-slate-400 text-sm">
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString("es-DO", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    <a
                      href={`tel:${customer.phone}`}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      {customer.phone}
                    </a>
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {customer.instagram ? (
                      <a
                        href={`https://instagram.com/${customer.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-slate-500 hover:text-pink-500 transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5 shrink-0" />
                        {customer.instagram}
                      </a>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <StateBadge state={customer.state} />
                  </td>

                  <td className="px-5 py-4">
                    <DeleteCell id={customer.id} onDelete={deleteCustomer} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* ── Cards mobile ── */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
          {filtered.map((customer, i) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">{customer.name}</p>
                  <StateBadge state={customer.state} />
                </div>
                <DeleteCell id={customer.id} onDelete={deleteCustomer} />
              </div>

              <div className="space-y-1.5 text-sm">
                <a
                  href={`tel:${customer.phone}`}
                  className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {customer.phone}
                </a>
                {customer.instagram && (
                  <a
                    href={`https://instagram.com/${customer.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 shrink-0" />
                    {customer.instagram}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && search && (
        <div className="text-center py-10 text-slate-400 text-sm">
          Sin resultados para &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}
