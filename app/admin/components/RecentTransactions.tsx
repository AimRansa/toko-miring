// app/admin/components/RecentTransactions.tsx
"use server";

import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import type { Transaction, Customer, Product } from "@prisma/client";

type TransaksiWithCustomerProduct = Transaction & {
  customer: Customer;
  product: Product;
};

function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

export default async function RecentTransactions() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulasi delay

  const transaksiTerbaru = await prisma.transaction.findMany({
    orderBy: { tanggal: "desc" },
    take: 5,
    include: {
      customer: true,
      product: true,
    },
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(transaksiTerbaru as TransaksiWithCustomerProduct[]).map((trx) => (
              <tr key={trx.id_transaksi} className="border-b">
                <td className="py-3">{trx.id_transaksi}</td>
                <td className="py-3">{trx.customer.nama_customer}</td>
                <td className="py-3">{trx.product.nama_produk}</td>
                <td className="py-3">{format(new Date(trx.tanggal), "dd MMM yyyy")}</td>
                <td className="py-3">{formatRupiah(trx.total_harga)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
