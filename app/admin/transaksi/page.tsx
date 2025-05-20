'use client'

import { useEffect, useState } from 'react'
import SkeletonTransaksi from '../components/SkeletonTransaksi'

type Transaksi = {
  id_transaksi: number
  customer: {
    nama_customer: string
  }
  product: {
    id_produk: number
    nama_produk: string
  }
  tanggal: string
  total_harga: number
}

export default function TransaksiPage() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    nama_customer: '',
    nama_produk: '',
    id_produk: '',
    tanggal: '',
    total_harga: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      // Simulasi delay 2 detik
      await new Promise(resolve => setTimeout(resolve, 2000))

      const res = await fetch('/api/transaksi')
      const data = await res.json()
      setTransaksi(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleEdit = (item: Transaksi) => {
    setEditId(item.id_transaksi)
    setEditForm({
      nama_customer: item.customer.nama_customer,
      nama_produk: item.product.nama_produk,
      id_produk: item.product.id_produk.toString(),
      tanggal: item.tanggal.slice(0, 10),
      total_harga: item.total_harga.toString(),
    })
  }

  const handleSave = async (id: number) => {
    const res = await fetch(`/api/transaksi/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tanggal: editForm.tanggal,
        total_harga: parseInt(editForm.total_harga),
        id_produk: parseInt(editForm.id_produk),
      }),
    })

    if (res.ok) {
      const updated = await res.json()
      setTransaksi((prev) =>
        prev.map((item) =>
          item.id_transaksi === id
            ? {
                ...item,
                tanggal: updated.tanggal,
                total_harga: updated.total_harga,
                product: {
                  ...item.product,
                  id_produk: updated.id_produk,
                }
              }
            : item
        )
      )
      setEditId(null)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus transaksi ini?')) return
    const res = await fetch(`/api/transaksi/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setTransaksi((prev) => prev.filter((item) => item.id_transaksi !== id))
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Transaksi</h2>
        <button
          onClick={() => alert('Fitur Tambah Transaksi belum dibuat')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah Transaksi
        </button>
      </div>

      {loading ? (
        <SkeletonTransaksi />
      ) : (
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID Transaksi</th>
              <th className="px-4 py-2 text-left">Pelanggan</th>
              <th className="px-4 py-2 text-left">ID Produk</th>
              <th className="px-4 py-2 text-left">Produk</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item) => (
              <tr key={item.id_transaksi} className="border-t border-gray-300">
                <td className="px-4 py-2">{item.id_transaksi}</td>
                <td className="px-4 py-2">{item.customer.nama_customer}</td>
                <td className="px-4 py-2">
                  {editId === item.id_transaksi ? (
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={editForm.id_produk}
                      onChange={(e) =>
                        setEditForm({ ...editForm, id_produk: e.target.value })
                      }
                    />
                  ) : (
                    item.product.id_produk
                  )}
                </td>
                <td className="px-4 py-2">{item.product.nama_produk}</td>
                <td className="px-4 py-2">
                  {editId === item.id_transaksi ? (
                    <input
                      type="date"
                      className="border rounded px-2 py-1 w-full"
                      value={editForm.tanggal}
                      onChange={(e) =>
                        setEditForm({ ...editForm, tanggal: e.target.value })
                      }
                    />
                  ) : (
                    item.tanggal.slice(0, 10)
                  )}
                </td>
                <td className="px-4 py-2">
                  {editId === item.id_transaksi ? (
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={editForm.total_harga}
                      onChange={(e) =>
                        setEditForm({ ...editForm, total_harga: e.target.value })
                      }
                    />
                  ) : (
                    `Rp${item.total_harga.toLocaleString()}`
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {editId === item.id_transaksi ? (
                    <>
                      <button
                        onClick={() => handleSave(item.id_transaksi)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id_transaksi)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {transaksi.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Belum ada transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
