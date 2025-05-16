import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import BarChartComponent from "./components/BarChartComponent";
import LineChartComponent from "./components/LineChartComponent";
import { Transaction, Product, Customer } from "@prisma/client"; // ✅ Tambahan

// Format mata uang ke rupiah
function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

// Definisikan tipe transaksi lengkap
type TransaksiWithCustomerProduct = Transaction & {
  customer: Customer;
  product: Product;
};

export default async function DashboardPage() {
  const [
    totalMobil,
    totalPelanggan,
    totalPesanan,
    transaksiTerbaru,
    dataGrafik,
    totalRevenue,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.customer.count(),
    prisma.transaction.count(),
    prisma.transaction.findMany({
      orderBy: { tanggal: "desc" },
      take: 5,
      include: {
        customer: true,
        product: true,
      },
    }),
    prisma.transaction.findMany({
      orderBy: { tanggal: "desc" },
      take: 7,
      include: {
        product: true,
      },
    }),
    prisma.transaction.aggregate({
      _sum: {
        total_harga: true,
      },
    }),
  ]);

  // ✅ Anotasi tipe untuk dataGrafik
  const dataChart = (dataGrafik as (Transaction & { product: Product | null })[])
    .map((trx) => ({
      tanggal: format(new Date(trx.tanggal), "dd MMM"),
      total: trx.total_harga,
      nama:
        trx.product?.nama_produk
          ? trx.product.nama_produk.substring(0, 10) +
            (trx.product.nama_produk.length > 10 ? "..." : "")
          : "Unknown",
    }))
    .reverse();

  const profitData = [
    { month: "Sep", value: 20 },
    { month: "Oct", value: 35 },
    { month: "Nov", value: 45 },
    { month: "Dec", value: 60 },
    { month: "Jan", value: 40 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 70 },
    { month: "Apr", value: 65 },
    { month: "May", value: 80 },
    { month: "Jun", value: 75 },
    { month: "Jul", value: 90 },
    { month: "Aug", value: 85 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Views</h3>
            <div className="flex justify-between items-end">
              <h2 className="text-2xl font-bold">
                {formatRupiah(totalRevenue._sum.total_harga || 0)}
              </h2>
              <span className="text-green-500 text-sm">0.43% ↑</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Profit</h3>
            <div className="flex justify-between items-end">
              <h2 className="text-2xl font-bold">
                {formatRupiah((totalRevenue._sum.total_harga || 0) * 0.3)}
              </h2>
              <span className="text-green-500 text-sm">4.35% ↑</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Product</h3>
            <div className="flex justify-between items-end">
              <h2 className="text-2xl font-bold">{totalMobil}</h2>
              <span className="text-green-500 text-sm">2.59% ↑</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Users</h3>
            <div className="flex justify-between items-end">
              <h2 className="text-2xl font-bold">{totalPelanggan}</h2>
              <span className="text-red-500 text-sm">0.95% ↓</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Total Revenue</h2>
            <p className="text-gray-500 text-sm mb-2">12.04.2022 - 12.05.2022</p>
            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Total Sales</span>
              <span className="text-gray-500">12.04.2022 - 12.05.2022</span>
            </div>
            <div className="flex space-x-4 mb-4">
              <span className="text-gray-500">Day</span>
              <span className="text-gray-500">Week</span>
              <span className="text-gray-500">Month</span>
            </div>
            <BarChartComponent data={dataChart} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Profit this week</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Sales</span>
              <span className="text-gray-500">Revenue</span>
            </div>
            <LineChartComponent data={profitData} />
            <div className="flex justify-between mt-4">
              {profitData.slice(0, 7).map((item) => (
                <span key={item.month} className="text-gray-500 text-xs">
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
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

      </div>
    </div>
  );
}
