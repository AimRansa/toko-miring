'use client'

import { useTransaksiContext } from '../context/TransaksiContext'
import { useEffect, useState } from 'react'

export default function TransaksiPage() {
  const { transaksi, setTransaksi } = useTransaksiContext()
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    pelanggan: '',
    tanggal: '',
    total: '',
    status: '',
  })

  // Tambahkan data dummy saat pertama kali komponen dimount
  useEffect(() => {
    if (transaksi.length === 0) {
      setTransaksi([
        {
          id: '001',
          pelanggan: 'Andi Wijaya',
          tanggal: '2025-04-20',
          total: '150000',
          status: 'Sukses',
        },
        {
          id: '002',
          pelanggan: 'Siti Lestari',
          tanggal: '2025-04-21',
          total: '200000',
          status: 'Pending',
        },
        {
          id: '003',
          pelanggan: 'Budi Santoso',
          tanggal: '2025-04-22',
          total: '175000',
          status: 'Gagal',
        },
      ])
    }
  }, [setTransaksi, transaksi])

  const handleEdit = (item: any) => {
    setEditId(item.id)
    setEditForm({
      pelanggan: item.pelanggan,
      tanggal: item.tanggal,
      total: item.total,
      status: item.status,
    })
  }

  const handleSave = (id: string) => {
    setTransaksi((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...editForm } : item))
    )
    setEditId(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      setTransaksi((prev) => prev.filter((item) => item.id !== id))
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

      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID Transaksi</th>
            <th className="px-4 py-2 text-left">Pelanggan</th>
            <th className="px-4 py-2 text-left">Tanggal</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transaksi.map((item) => (
            <tr key={item.id} className="border-t border-gray-300">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">
                {editId === item.id ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.pelanggan}
                    onChange={(e) =>
                      setEditForm({ ...editForm, pelanggan: e.target.value })
                    }
                  />
                ) : (
                  item.pelanggan
                )}
              </td>
              <td className="px-4 py-2">
                {editId === item.id ? (
                  <input
                    type="date"
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.tanggal}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tanggal: e.target.value })
                    }
                  />
                ) : (
                  item.tanggal
                )}
              </td>
              <td className="px-4 py-2">
                {editId === item.id ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.total}
                    onChange={(e) =>
                      setEditForm({ ...editForm, total: e.target.value })
                    }
                  />
                ) : (
                  item.total
                )}
              </td>
              <td className="px-4 py-2">
                {editId === item.id ? (
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                  >
                    <option value="Sukses">Sukses</option>
                    <option value="Pending">Pending</option>
                    <option value="Gagal">Gagal</option>
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td className="px-4 py-2 space-x-2">
                {editId === item.id ? (
                  <>
                    <button
                      onClick={() => handleSave(item.id)}
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
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {transaksi.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Belum ada transaksi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
