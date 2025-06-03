'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Table() {
  const [products, setProducts] = useState<any[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    nama: '',
    stok: '',
    harga: '',
    status: ''
  })
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // delay function untuk menunggu minimal 3 detik
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

      // mulai waktu loading
      const startTime = Date.now()

      const res = await fetch(`${baseUrl}/api/products`, {
        cache: 'no-store',
        next: { revalidate: 0 }
      })

      if (!res.ok) {
        throw new Error(`Fetch gagal dengan status: ${res.status}`)
      }

      const data = await res.json()
      setProducts(data)

      // hitung waktu yg sudah berlalu
      const elapsed = Date.now() - startTime
      if (elapsed < 3000) {
        await delay(3000 - elapsed) // tunggu agar minimal 3 detik
      }
    } catch (error) {
      console.error('FETCH ERROR:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleEdit = (product: any) => {
    setEditId(product.id_produk)
    setEditForm({
      nama: product.nama_produk,
      stok: product.stok.toString(),
      harga: product.harga.toString(),
      status: product.status
    })
  }

  const handleSave = async (id: number) => {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama_produk: editForm.nama,
        stok: parseInt(editForm.stok),
        harga: parseInt(editForm.harga),
        status: editForm.status
      })
    })
    setEditId(null)
    fetchProducts()
  }

  const handleDelete = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    fetchProducts()
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.nama_produk.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, products])

  return (
    <>
      {/* CSS shimmer effect */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          .shimmer {
            display: inline-block;
            height: 16px;
            border-radius: 4px;
            background: linear-gradient(
              90deg,
              #f6f7f8 25%,
              #edeef1 37%,
              #f6f7f8 63%
            );
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
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {/* Shimmer skeleton untuk setiap kolom dengan lebar berbeda agar natural */}
                  <td className="px-4 py-2">
                    <span className="shimmer" style={{ width: '70%' }}></span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="shimmer" style={{ width: '30%' }}></span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="shimmer" style={{ width: '40%' }}></span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="shimmer" style={{ width: '50%' }}></span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="shimmer" style={{ width: '50%' }}></span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="shimmer" style={{ width: '60%' }}></span>
                  </td>
                </tr>
              ))
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ditemukan produk yang cocok.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.id_produk}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 border-t'}
                >
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
                  <td className="px-4 py-2 space-x-2">
                    {editId === product.id_produk ? (
                      <button
                        onClick={() => handleSave(product.id_produk)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Simpan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(product.id_produk)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
