'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Save } from 'lucide-react'

export default function Table() {
  const [products, setProducts] = useState<any[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ nama: '', stok: '', harga: '', status: '' })
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const router = useRouter()

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const startTime = Date.now()

      const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store', next: { revalidate: 0 } })
      if (!res.ok) throw new Error(`Fetch gagal dengan status: ${res.status}`)

      const data = await res.json()
      setProducts(data)

      const elapsed = Date.now() - startTime
      if (elapsed < 3000) await delay(3000 - elapsed)
    } catch (error: any) {
      console.error('FETCH ERROR:', error)
      setError('Gagal memuat produk. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Saat search berubah, reset halaman ke 1
  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const handleEdit = (product: any) => {
    if (!window.confirm(`Anda yakin ingin mengedit produk "${product.nama_produk}"?`)) {
      return
    }
    setEditId(product.id_produk)
    setEditForm({
      nama: product.nama_produk,
      stok: product.stok.toString(),
      harga: product.harga.toString(),
      status: product.status
    })
  }

  const handleSave = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama_produk: editForm.nama,
          stok: parseInt(editForm.stok),
          harga: parseInt(editForm.harga),
          status: editForm.status
        })
      })
      if (!res.ok) throw new Error(`Update gagal dengan status ${res.status}`)

      setEditId(null)
      fetchProducts()
      setMessage('Produk berhasil diperbarui.')
      setError(null)
    } catch (error: any) {
      console.error('SAVE ERROR:', error)
      setError('Gagal menyimpan perubahan.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Anda yakin ingin menghapus produk ini?')) {
      return
    }
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Hapus gagal dengan status ${res.status}`)

      fetchProducts()
      setMessage('Produk berhasil dihapus.')
      setError(null)
    } catch (error: any) {
      console.error('DELETE ERROR:', error)
      setError('Gagal menghapus produk.')
    }
  }

  // Filter produk sesuai search
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.nama_produk.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, products])

  // Pagination: hitung total halaman
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  // Ambil data produk untuk halaman sekarang
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, filteredProducts])

  // Render tombol nomor halaman (misal maksimal 5 tombol)
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
          className={`px-3 py-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {i}
        </button>
      )
    }
    return pageButtons
  }

  return (
    <>
      <style>
        {`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer {
          display: inline-block;
          height: 16px;
          border-radius: 4px;
          background: linear-gradient(90deg, #f6f7f8 25%, #edeef1 37%, #f6f7f8 63%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}
      </style>

      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daftar Produk</h2>
          <button
            onClick={() => router.push('/admin/formulirProduk')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Tambah Produk
          </button>
        </div>

        {/* Pesan sukses */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded">
            {message}
          </div>
        )}

        {/* Pesan error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Stok</th>
              <th className="px-4 py-2 text-left">Harga</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-4 py-2">
                      <span className="shimmer" style={{ width: `${30 + j * 10}%` }}></span>
                    </td>
                  ))}
                </tr>
              ))
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ditemukan produk yang cocok.
                </td>
              </tr>
            ) : (
              currentProducts.map((product, index) => (
                <tr key={product.id_produk} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 border-t'}>
                  <td className="px-4 py-2">
                    {editId === product.id_produk ? (
                      <input
                        type="text"
                        value={editForm.nama}
                        onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      product.nama_produk
                    )}
                  </td>
                  <td className="px-4 py-2">{product.id_produk}</td>
                  <td className="px-4 py-2">
                    {editId === product.id_produk ? (
                      <input
                        type="number"
                        value={editForm.stok}
                        onChange={(e) => setEditForm({ ...editForm, stok: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      product.stok
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editId === product.id_produk ? (
                      <input
                        type="number"
                        value={editForm.harga}
                        onChange={(e) => setEditForm({ ...editForm, harga: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      `Rp${product.harga.toLocaleString()}`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editId === product.id_produk ? (
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="border px-2 py-1 rounded w-full"
                      >
                        <option value="Tersedia">Tersedia</option>
                        <option value="Habis">Habis</option>
                      </select>
                    ) : (
                      product.status
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2 flex items-center">
                    {editId === product.id_produk ? (
                      <button
                        onClick={() => handleSave(product.id_produk)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <Save size={14} />
                        Simpan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(product.id_produk)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </td>
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
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Prev
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  )
}
