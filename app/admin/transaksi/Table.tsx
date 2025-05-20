// ❌ JANGAN tambahkan 'use client' di sini

type Transaksi = {
  id_transaksi: number
  customer: { nama_customer: string }
  product: { id_produk: number; nama_produk: string }
  tanggal: string
  total_harga: number
}

export default async function Table() {
    await new Promise((resolve) => setTimeout(resolve, 3000))
  const res = await fetch('http://localhost:3000/api/transaksi', {
    cache: 'no-store',
  })
  const transaksi: Transaksi[] = await res.json()

  return (
    <table className="w-full table-auto border border-gray-300 text-sm">
      <thead className="bg-slate-800 text-white">
        <tr>
          <th className="px-4 py-2 text-left">ID Transaksi</th>
          <th className="px-4 py-2 text-left">Pelanggan</th>
          <th className="px-4 py-2 text-left">ID Produk</th>
          <th className="px-4 py-2 text-left">Produk</th>
          <th className="px-4 py-2 text-left">Tanggal</th>
          <th className="px-4 py-2 text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        {transaksi.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-4 text-gray-500">
              Belum ada transaksi.
            </td>
          </tr>
        ) : (
          transaksi.map((item) => (
            <tr key={item.id_transaksi} className="border-t border-gray-300">
              <td className="px-4 py-2">{item.id_transaksi}</td>
              <td className="px-4 py-2">{item.customer.nama_customer}</td>
              <td className="px-4 py-2">{item.product.id_produk}</td>
              <td className="px-4 py-2">{item.product.nama_produk}</td>
              <td className="px-4 py-2">{item.tanggal.slice(0, 10)}</td>
              <td className="px-4 py-2">
                Rp{item.total_harga.toLocaleString()}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
