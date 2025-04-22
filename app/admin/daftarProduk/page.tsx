'use client'

import { useProductContext } from '../context/ProductContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DaftarProdukPage() {
  const { products, setProducts } = useProductContext()
  const router = useRouter()
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    nama: '',
    stok: '',
    status: ''
  })

  const handleEdit = (product: any) => {
    setEditId(product.id)
    setEditForm({
      nama: product.nama,
      stok: product.stok.toString(),
      status: product.status
    })
  }

  const handleSave = (id: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? {
              ...product,
              nama: editForm.nama,
              stok: parseInt(editForm.stok),
              status: editForm.status
            }
          : product
      )
    )
    setEditId(null)
  }

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)
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
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 border-t'}
              >
                <td className="px-4 py-2">
                  {editId === product.id ? (
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      value={editForm.nama}
                      onChange={(e) =>
                        setEditForm({ ...editForm, nama: e.target.value })
                      }
                    />
                  ) : (
                    product.nama
                  )}
                </td>
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">
                  {editId === product.id ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                      value={editForm.stok}
                      onChange={(e) =>
                        setEditForm({ ...editForm, stok: e.target.value })
                      }
                    />
                  ) : (
                    product.stok
                  )}
                </td>
                <td className="px-4 py-2">
                  {editId === product.id ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                    >
                      <option value="Tersedia">Tersedia</option>
                      <option value="Habis">Habis</option>
                    </select>
                  ) : (
                    product.status
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {editId === product.id ? (
                    <button
                      onClick={() => handleSave(product.id)}
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
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
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
