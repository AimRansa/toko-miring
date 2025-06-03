'use client'

import { useEffect, useState } from 'react'

type Transaksi = {
  id_transaksi: number
  customer: { nama_customer: string }
  product: { id_produk: number; nama_produk: string }
  tanggal: string
  total_harga: number
}

export default function Table() {
  const [search, setSearch] = useState('')
  const [transaksi, setTransaksi] = useState<Transaksi[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          await new Promise((resolve) => setTimeout(resolve, 3000))

          const res = await fetch(`/api/transaksi?search=${encodeURIComponent(search)}`, {
            cache: 'no-store',
          })
          const data = await res.json()
          setTransaksi(data)
        } catch (error) {
          console.error('Gagal fetch data transaksi:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [search])

  return (
    <>
      <input
        type="text"
        placeholder="Cari nama pelanggan atau produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full"
      />

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
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <tr key={i} className="border-t border-gray-300">
                {[ 'w-3/4', 'w-2/3', 'w-1/2', 'w-2/3', 'w-1/2', 'w-3/4' ].map((width, idx) => (
                  <td key={idx} className="px-4 py-2">
                    <div className="shimmer-wrapper h-4 rounded w-full relative overflow-hidden bg-gray-200">
                      <div className="shimmer"></div>
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : transaksi.length === 0 ? (
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
                <td className="px-4 py-2">Rp{item.total_harga.toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <style jsx>{`
        .shimmer-wrapper {
          position: relative;
          overflow: hidden;
          background-color: #f6f7f8;
        }
        .shimmer {
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            left: -150%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </>
  )
}
