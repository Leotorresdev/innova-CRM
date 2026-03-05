"use client";

import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerDialog } from "@/components/customers/customer-dialog";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <CustomerDialog />
      </div>

      <CustomerTable />
    </div>
  );
}