'use client'

import { useEffect, useState, useMemo } from 'react'

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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
          setCurrentPage(1) // reset ke halaman 1 kalau data baru masuk
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

  // Hitung total halaman
  const totalPages = Math.ceil(transaksi.length / itemsPerPage)

  // Ambil transaksi untuk halaman sekarang
  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return transaksi.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, transaksi])

  // Render tombol halaman (maks 5 tombol)
  const renderPageNumbers = () => {
    const maxPageButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
    let endPage = startPage + maxPageButtons - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    const pageButtons = []
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      )
    }
    return pageButtons
  }

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
            Array.from({ length: itemsPerPage }).map((_, i) => (
              <tr key={i} className="border-t border-gray-300">
                {['w-3/4', 'w-2/3', 'w-1/2', 'w-2/3', 'w-1/2', 'w-3/4'].map((width, idx) => (
                  <td key={idx} className="px-4 py-2">
                    <div className="shimmer-wrapper h-4 rounded w-full relative overflow-hidden bg-gray-200">
                      <div className="shimmer"></div>
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : currentTransactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Belum ada transaksi.
              </td>
            </tr>
          ) : (
            currentTransactions.map((item) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Prev
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      )}

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
