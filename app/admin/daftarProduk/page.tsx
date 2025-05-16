'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DaftarProdukPage() {
  const [products, setProducts] = useState<any[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    nama: '',
    stok: '',
    harga: '',
    status: ''
  })
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

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

  const handleDeleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    })
    fetchProducts()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Daftar Produk</h1>
        <button
          onClick={() => router.push('/admin/formulirProduk')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          + Tambah Produk
        </button>
      </div>
      <div className="overflow-x-auto">
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
            {products.map((product, index) => (
              <tr key={product.id_produk} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 border-t'}>
                <td className="px-4 py-2">
                  {editId === product.id_produk ? (
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      value={editForm.nama}
                      onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
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
                      className="border px-2 py-1 rounded w-full"
                      value={editForm.stok}
                      onChange={(e) => setEditForm({ ...editForm, stok: e.target.value })}
                    />
                  ) : (
                    product.stok
                  )}
                </td>
                <td className="px-4 py-2">
                  {editId === product.id_produk ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                      value={editForm.harga}
                      onChange={(e) => setEditForm({ ...editForm, harga: e.target.value })}
                    />
                  ) : (
                    `Rp${product.harga.toLocaleString()}`
                  )}
                </td>
                <td className="px-4 py-2">
                  {editId === product.id_produk ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
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
                    onClick={() => handleDeleteProduct(product.id_produk)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Belum ada produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}